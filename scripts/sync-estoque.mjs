#!/usr/bin/env node
/* ============================================================
   SINCRONIZAÇÃO DE ESTOQUE — Loja Conectada → site
   ------------------------------------------------------------
   Lê o estoque real da loja na API do integrador e regrava
   assets/estoque.js (a lista de veículos usada pelo site).

   Roda sozinho pelo GitHub Actions. Para rodar na mão:
     LC_TOKEN=xxxx node scripts/sync-estoque.mjs
   Para testar sem chamar a API (usando um arquivo salvo):
     node scripts/sync-estoque.mjs --fixture caminho/resposta.json
   ============================================================ */

import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ     = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASE_API = 'https://api-site.lojaconectada.com.br/v2';
const LOJA_ID  = process.env.LC_LOJA_ID || '261';
const TOKEN    = process.env.LC_TOKEN;
const SITE     = 'https://ares-neon.github.io/jr-veiculos/';

/* Campos que NUNCA vão para o site público.
   A API devolve placa e chassi — dado sensível do veículo e do proprietário.
   Só copiamos o que está na lista de permitidos abaixo. */
const NUNCA_PUBLICAR = ['license_plate', 'chassi'];

/* ---------------- utilidades ---------------- */

const semAcento = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');
const slug = s => semAcento(s).toLowerCase().replace(/[^a-z0-9]+/g, '');

/* Siglas técnicas que devem continuar em caixa alta. */
const SIGLAS = /^(tsi|tce|tgdi|gdi|mpi|msi|sce|thp|crdi|gls|glx|lts?|ltz|lt|xlt|xls|xei|xrs|cvt|awd|4wd|4x4|4x2|cd|cs|sv|sl|se|s|ex|exl|lx|rs|gt|abs|srs|dvd|led)$/i;

/** "NISSAN" -> "Nissan" · "JAC" -> "JAC" · "HB20S" -> "HB20S" · "T-CROSS" -> "T-Cross" */
function titulo(txt) {
  return String(txt || '')
    .trim()
    .split(/\s+/)
    .map(palavra =>
      palavra.split('-').map(p => {
        if (!p) return p;
        if (/\d/.test(p)) return p.toUpperCase();            // HB20S, J2, C3, 16V, 1.6
        if (SIGLAS.test(p)) return p.toUpperCase();          // TSI, AWD, LTZ
        if (p.length <= 3 && p === p.toUpperCase()) return p; // JAC, VW, BMW
        return p[0].toUpperCase() + p.slice(1).toLowerCase();
      }).join('-')
    )
    .join(' ');
}

const fmtKm = n => Number(n || 0).toLocaleString('pt-BR');

/** A API mistura "SUV" e "UTILITÁRIO ESPORTIVO" para a mesma coisa. */
const CARROCERIA = {
  'HATCHBACK': 'Hatch',
  'SEDAN': 'Sedan',
  'SUV': 'SUV',
  'UTILITARIO ESPORTIVO': 'SUV',
  'PICAPE': 'Picape',
  'PERUA': 'Perua',
  'MINIVAN': 'Minivan',
  'CUPE': 'Cupê',
  'CONVERSIVEL': 'Conversível',
  'VAN': 'Van',
};
function carroceria(nome) {
  const chave = semAcento(nome).toUpperCase().trim();
  return CARROCERIA[chave] || titulo(nome) || 'Veículo';
}

/* ---------------- busca na API ---------------- */

async function buscarEstoque() {
  if (!TOKEN) throw new Error('Falta a variável LC_TOKEN (o token da API).');
  const veiculos = [];
  let url = `${BASE_API}/dealer/${LOJA_ID}/inventory`;
  let pagina = 1;

  while (url) {
    const resp = await fetch(url, {
      headers: { 'Authorization': `Token ${TOKEN}`, 'Accept': 'application/json' },
    });
    if (!resp.ok) throw new Error(`API respondeu ${resp.status} em ${url}`);
    const dados = await resp.json();
    veiculos.push(...(dados.results || []));
    console.log(`  página ${pagina}: ${dados.results?.length || 0} veículos`);
    // a API devolve o "next" em http:// — forçamos https
    url = dados.next ? dados.next.replace(/^http:/, 'https:') : null;
    pagina++;
    if (pagina > 50) break; // trava de segurança
  }
  return veiculos;
}

/* ---------------- tradução ---------------- */

function traduzir(v) {
  const marcaLabel = titulo(v.manufacturer?.name);
  const modelo     = titulo(v.model?.name);
  const versao     = titulo(v.version?.name);
  const nome       = [marcaLabel, modelo, versao].filter(Boolean).join(' ').replace(/\s+/g, ' ');

  const anoFab = v.make_year || v.model_year;
  const anoMod = v.model_year || v.make_year;

  const opcionais = (v.optionals || [])
    .map(o => titulo(o.name))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));

  const fotos = (v.photos || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(f => f.photo)
    .filter(Boolean);

  return {
    id: v.ad_id,
    name: nome,
    brand: slug(v.manufacturer?.name),
    brandLabel: marcaLabel,
    year: anoMod,
    yearLabel: anoFab === anoMod ? String(anoMod) : `${anoFab}/${anoMod}`,
    km: fmtKm(v.km),
    kmNum: Number(v.km || 0),
    showKm: v.show_km_site !== false,
    price: Number(v.price || 0),
    priceLabel: (v.text_price_site || '').trim(),   // ex.: "CONSULTE"
    showPrice: v.show_price_site !== false,
    body: carroceria(v.bodywork?.name),
    transmission: titulo(v.transmission?.name),
    fuel: titulo(v.fuel?.name),
    color: titulo(v.color?.name),
    doors: v.doors || null,
    optionals: opcionais,
    destaque: !!v.featured,
    aceitaTroca: !!v.accept_exchange,
    fotos,
    descricao: montarDescricao({ nome, anoMod, km: fmtKm(v.km), body: carroceria(v.bodywork?.name),
                                 transmissao: titulo(v.transmission?.name), fuel: titulo(v.fuel?.name),
                                 cor: titulo(v.color?.name), opcionais }),
  };
}

function montarDescricao({ nome, anoMod, km, body, transmissao, fuel, cor, opcionais }) {
  /* "é um SUV automático na cor prata, com motor flex e 7.234 km rodados"
     — a cor entra depois de "na cor" para não brigar com o gênero da carroceria. */
  const ficha = [
    body,
    transmissao ? transmissao.toLowerCase() : '',
    cor ? `na cor ${cor.toLowerCase()}` : '',
  ].filter(Boolean).join(' ');

  const detalhes = [
    fuel ? `motor ${fuel.toLowerCase()}` : '',
    km ? `${km} km rodados` : '',
  ].filter(Boolean).join(' e ');

  const itens = opcionais.length
    ? ` Vem com ${opcionais.slice(0, 6).join(', ').toLowerCase()}${opcionais.length > 6 ? ' e mais' : ''}.`
    : '';

  return `O ${nome} ${anoMod} é um ${ficha}${detalhes ? ', com ' + detalhes : ''}.${itens} ` +
    `Veículo periciado, com procedência garantida e pronto para transferência. ` +
    `Aceitamos seu usado na troca e temos ótimas condições de financiamento. ` +
    `Agende seu test drive com a equipe da JR Veículos, em Santos — SP.`;
}

/* ---------------- geração dos arquivos ---------------- */

function gerarEstoqueJs(carros) {
  const cab = `/* ============================================================
   ARQUIVO GERADO AUTOMATICAMENTE — NÃO EDITE À MÃO
   Fonte: painel Loja Conectada (loja ${LOJA_ID})
   Atualizado em: ${new Date().toISOString()}
   Veículos: ${carros.length}
   ============================================================ */\n`;
  return `${cab}window.CARS_SYNC = ${JSON.stringify(carros, null, 1)};\n`;
}

function gerarSitemap(carros) {
  const hoje = new Date().toISOString().slice(0, 10);
  const fixas = { '': '1.0', 'estoque.html': '0.9', 'sobre.html': '0.6', 'privacidade.html': '0.3' };
  const linhas = Object.entries(fixas).map(([p, pr]) =>
    `  <url><loc>${SITE}${p}</loc><lastmod>${hoje}</lastmod><priority>${pr}</priority></url>`);
  for (const c of carros) {
    linhas.push(`  <url><loc>${SITE}carro.html?id=${c.id}</loc><lastmod>${hoje}</lastmod><priority>0.7</priority></url>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${linhas.join('\n')}\n</urlset>\n`;
}

/* ---------------- execução ---------------- */

async function main() {
  const iFixture = process.argv.indexOf('--fixture');
  let brutos;

  if (iFixture > -1) {
    const caminho = process.argv[iFixture + 1];
    console.log(`Lendo arquivo de teste: ${caminho}`);
    const j = JSON.parse(readFileSync(caminho, 'utf8'));
    brutos = j.results || j;
  } else {
    console.log(`Consultando a API da loja ${LOJA_ID}...`);
    brutos = await buscarEstoque();
  }

  if (!Array.isArray(brutos) || !brutos.length) {
    throw new Error('A API não devolveu nenhum veículo — abortando para não apagar o estoque do site.');
  }

  const carros = brutos.map(traduzir);

  /* conferências */
  const semFoto = carros.filter(c => !c.fotos.length);
  const semPreco = carros.filter(c => !c.price && !c.priceLabel);
  const vazados = brutos.filter(v => NUNCA_PUBLICAR.some(k => v[k]))
                        .filter(v => JSON.stringify(carros).includes(String(v.license_plate || ' ')));

  mkdirSync(resolve(RAIZ, 'assets'), { recursive: true });
  writeFileSync(resolve(RAIZ, 'assets/estoque.js'), gerarEstoqueJs(carros));
  writeFileSync(resolve(RAIZ, 'sitemap.xml'), gerarSitemap(carros));

  console.log(`\n✓ ${carros.length} veículos gravados em assets/estoque.js`);
  console.log(`✓ sitemap.xml regenerado (${carros.length + 4} URLs)`);
  console.log(`  destaques: ${carros.filter(c => c.destaque).length}`);
  console.log(`  marcas: ${[...new Set(carros.map(c => c.brandLabel))].sort().join(', ')}`);
  if (semFoto.length)  console.log(`  ⚠ ${semFoto.length} sem foto: ${semFoto.map(c => c.name).join(' | ')}`);
  if (semPreco.length) console.log(`  ⚠ ${semPreco.length} sem preço: ${semPreco.map(c => c.name).join(' | ')}`);
  if (vazados.length)  throw new Error('ABORTADO: dado sensível (placa/chassi) chegou ao arquivo público.');
}

main().catch(e => { console.error('\n✗ ' + e.message); process.exit(1); });
