/* ============ DADOS DOS VEÍCULOS (compartilhado) ============ */
/* Para marcar um carro como destaque na home, mude destaque:true */
const CARS = [
  {name:"Caoa Chery Tiggo 5X TXS",        brand:"caoachery",  year:2022, yearLabel:"2021/2022", km:"76.231",  price:97900,  body:"SUV",    destaque:false},

  {name:"Chevrolet Camaro 50th",          brand:"chevrolet",  year:2017, yearLabel:"2016/2017", km:"56.620",  price:379900, body:"Cupê",   destaque:true},
  {name:"Chevrolet Tracker 1.2T Premier", brand:"chevrolet",  year:2021, yearLabel:"2020/2021", km:"89.890",  price:99900,  body:"SUV",    destaque:false},
  {name:"Chevrolet Onix Plus 1.0 Turbo LTZ", brand:"chevrolet", year:2025, yearLabel:"2024/2025", km:"43.307", price:91900, body:"Sedan", destaque:false},
  {name:"Chevrolet Onix 1.0 MT LT",       brand:"chevrolet",  year:2019, yearLabel:"2019",      km:"115.903", price:58900,  body:"Hatch",  destaque:false},
  {name:"Chevrolet Onix Joy",             brand:"chevrolet",  year:2020, yearLabel:"2020",      km:"90.472",  price:59900,  body:"Hatch",  destaque:false},
  {name:"Chevrolet Onix 1.0 MT LT2",      brand:"chevrolet",  year:2025, yearLabel:"2024/2025", km:"45.623",  price:73900,  body:"Hatch",  destaque:false},
  {name:"Chevrolet Onix 1.0 MT LT2",      brand:"chevrolet",  year:2025, yearLabel:"2024/2025", km:"45.623",  price:73900,  body:"Hatch",  destaque:false},
  {name:"Chevrolet Spin 1.8 LT Advantage",brand:"chevrolet",  year:2015, yearLabel:"2014/2015", km:"169.449", price:55900,  body:"Minivan",destaque:false},

  {name:"Fiat Mobi Like",                 brand:"fiat",       year:2023, yearLabel:"2022/2023", km:"58.710",  price:58900,  body:"Hatch",  destaque:false},
  {name:"Fiat Bravo Essence Dualogic",    brand:"fiat",       year:2013, yearLabel:"2012/2013", km:"92.427",  price:38900,  body:"Hatch",  destaque:false},
  {name:"Fiat Argo Drive 1.0",            brand:"fiat",       year:2025, yearLabel:"2024/2025", km:"45.588",  price:75900,  body:"Hatch",  destaque:false},
  {name:"Fiat Strada Freedom 1.3 CS",     brand:"fiat",       year:2021, yearLabel:"2021",      km:"66.231",  price:76900,  body:"Picape", destaque:false},

  {name:"Ford F-250 XLT L",               brand:"ford",       year:2000, yearLabel:"1999/2000", km:"120.334", price:219900, body:"Picape", destaque:false},
  {name:"Ford Ka SE 1.0",                 brand:"ford",       year:2019, yearLabel:"2019",      km:"80.030",  price:51900,  body:"Hatch",  destaque:false},
  {name:"Ford EcoSport FSL 1.5",          brand:"ford",       year:2020, yearLabel:"2019/2020", km:"39.667",  price:75900,  body:"SUV",    destaque:false},

  {name:"Hyundai Tucson Turbo GLS",       brand:"hyundai",    year:2022, yearLabel:"2021/2022", km:"50.900",  price:132900, body:"SUV",    destaque:false},
  {name:"Hyundai Creta 1.0 Turbo N Line", brand:"hyundai",    year:2024, yearLabel:"2023/2024", km:"37.966",  price:144900, body:"SUV",    destaque:true},
  {name:"Hyundai HB20S 1.0 Comfort",      brand:"hyundai",    year:2025, yearLabel:"2024/2025", km:"39.667",  price:80900,  body:"Sedan",  destaque:false},

  {name:"Honda CR-V LX Flex",             brand:"honda",      year:2014, yearLabel:"2014",      km:"125.711", price:83900,  body:"SUV",    destaque:false},

  {name:"Jeep Compass Série S",           brand:"jeep",       year:2023, yearLabel:"2023",      km:"30.690",  price:159900, body:"SUV",    destaque:true},

  {name:"Mitsubishi Outlander 2.2 Diesel",brand:"mitsubishi", year:2016, yearLabel:"2015/2016", km:"114.467", price:119900, body:"SUV",    destaque:false},
  {name:"Mitsubishi ASX 2.0 CVT",         brand:"mitsubishi", year:2014, yearLabel:"2013/2014", km:"81.781",  price:71900,  body:"SUV",    destaque:false},

  {name:"Renault Sandero 1.0 16V Aut.",   brand:"renault",    year:2013, yearLabel:"2012/2013", km:"122.334", price:35900,  body:"Hatch",  destaque:false},

  {name:"Volkswagen Saveiro Robust CD",   brand:"volkswagen", year:2021, yearLabel:"2020/2021", km:"85.363",  price:66900,  body:"Picape", destaque:false},
  {name:"Volkswagen Saveiro Robust CD",   brand:"volkswagen", year:2022, yearLabel:"2021/2022", km:"70.798",  price:66900,  body:"Picape", destaque:false},
  {name:"Volkswagen Gol 1.6 MSI",         brand:"volkswagen", year:2021, yearLabel:"2020/2021", km:"59.105",  price:59900,  body:"Hatch",  destaque:false},
  {name:"Volkswagen SpaceFox Sport",      brand:"volkswagen", year:2011, yearLabel:"2010/2011", km:"113.886", price:44900,  body:"Minivan",destaque:false},
  {name:"Volkswagen T-Cross 1.0 TSI",     brand:"volkswagen", year:2025, yearLabel:"2024/2025", km:"44.313",  price:120900, body:"SUV",    destaque:false}
];
/* Atribui um ID estável e prepara campos de fotos/descrição.
   Para adicionar fotos de um carro, preencha c.fotos (ver abaixo).
   Para uma descrição própria, preencha c.descricao. */
CARS.forEach((c,i)=>{ c.id=i; if(!c.fotos) c.fotos=[]; });

/* Outlander 2.2 Diesel */
const _outIdx = CARS.findIndex(c=>c.name==="Mitsubishi Outlander 2.2 Diesel" && c.year===2016);
if(_outIdx>=0){
  CARS[_outIdx].fotos = [
    'assets/fotos/outlander/outlander-1.jpg',
    'assets/fotos/outlander/outlander-2.jpg',
    'assets/fotos/outlander/outlander-3.jpg',
    'assets/fotos/outlander/outlander-4.jpg',
    'assets/fotos/outlander/outlander-5.jpg',
    'assets/fotos/outlander/outlander-6.jpg',
    'assets/fotos/outlander/outlander-7.jpg',
    'assets/fotos/outlander/outlander-8.jpg',
    'assets/fotos/outlander/outlander-9.jpg',
    'assets/fotos/outlander/outlander-10.jpg',
    'assets/fotos/outlander/outlander-11.jpg'
  ];
  CARS[_outIdx].descricao = `O Mitsubishi Outlander 2.2 Diesel AWD 2015/2016 é um SUV completo e sofisticado, com motor 2.2 turbo diesel de alto rendimento e tração 4×4 inteligente. Conta com 7 lugares, bancos em couro, teto solar, multimídia com tela touch, ar-condicionado automático dual-zone, rodas de liga leve aro 18 e luzes DRL. Câmbio automático e apenas 114.467 km rodados. Revisado, com procedência garantida e pronto para transferência. Aceitamos seu usado na troca e temos ótimas condições de financiamento. Agende seu test drive com a equipe da JR Veículos, em Santos — SP.`;
}

function artigo(body){ return /picape|minivan|perua/i.test(body) ? 'uma' : 'um'; }
function buildDescricao(c){
  if(c.descricao) return c.descricao;
  return `O ${c.name} ${c.yearLabel} é ${artigo(c.body)} ${c.body.toLowerCase()} `+
    `${BRAND_LABEL[c.brand]} com ${c.km} km rodados. Veículo revisado, com procedência garantida e pronto para transferência. `+
    `Aceitamos seu usado na troca e temos ótimas condições de financiamento. `+
    `Agende seu test drive ou fale agora com a equipe da JR Veículos, em Santos.`;
}

const BRAND_LABEL = {
  caoachery:"Caoa Chery", chevrolet:"Chevrolet", fiat:"Fiat", ford:"Ford",
  honda:"Honda", hyundai:"Hyundai", jeep:"Jeep", mitsubishi:"Mitsubishi",
  renault:"Renault", volkswagen:"Volkswagen"
};
const fmtBRL = n => n.toLocaleString('pt-BR');

const ICON_KM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 12l4-2"/><path d="M12 7v1M7 12h1M17 12h-1"/></svg>';
const ICON_YEAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
const ICON_BODY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13"/><path d="M3 17h18v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>';
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';
const WA_PHONE = '551335136718';

/* Link de WhatsApp com mensagem sobre um carro específico. */
function waCarLink(c){
  const msg = encodeURIComponent(`Olá! Tenho interesse no ${c.name} ${c.yearLabel} (R$ ${fmtBRL(c.price)}). Ainda está disponível?`);
  return `https://wa.me/${WA_PHONE}?text=${msg}`;
}

/* Monta o HTML de um card. opts.badge = mostra selo "Destaque do mês". */
function carCardHTML(c, i, opts){
  opts = opts || {};
  const delay = i%3===1 ? 'd1' : i%3===2 ? 'd2' : '';
  const badge = opts.badge && c.destaque
    ? '<span class="destaque-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.7 6.1 21l1.2-6.6L2.5 9l6.6-.9z"/></svg> Destaque</span>'
    : '';
  const href = `carro.html?id=${c.id}`;
  return `
    <article class="card reveal ${delay}" data-brand="${c.brand}" data-year="${c.year}" data-price="${c.price}" data-name="${c.name.toLowerCase()}">
      <a class="card-media" href="${href}" aria-label="Ver ${c.name}">
        <div class="card-img">
          ${c.fotos && c.fotos.length ? `<img src="${c.fotos[0]}" alt="${c.name}" loading="lazy">` : '<div class="ph"><span>📷 Foto do veículo</span></div>'}
          ${badge}
          <span class="tag">${BRAND_LABEL[c.brand]}</span>
          <span class="year">${c.yearLabel}</span>
        </div>
      </a>
      <div class="card-body">
        <a class="card-title" href="${href}"><h3>${c.name}</h3></a>
        <div class="card-specs">
          <span class="s">${ICON_YEAR}${c.yearLabel}</span>
          <span class="s">${ICON_KM}${c.km} km</span>
          <span class="s">${ICON_BODY}${c.body}</span>
        </div>
        <div class="card-foot">
          <div class="price"><small>À vista a partir de</small><b>R$ ${fmtBRL(c.price)}</b></div>
          <div class="card-actions">
            <a class="card-wa" href="${waCarLink(c)}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp sobre ${c.name}">${WA_ICON}<span>Interesse</span></a>
            <a class="card-go" href="${href}" aria-label="Ver detalhes de ${c.name}">${ARROW}</a>
          </div>
        </div>
      </div>
    </article>`;
}

/* ============ CALCULADORA DE FINANCIAMENTO ============ */
/* Taxa de juros média mensal usada na simulação (ajuste conforme o mercado). */
const FIN_TAXA_MES = 0.019; // 1,90% a.m. — média oficial do Banco Central (aproximado)

/* Markup da calculadora. opts.price = valor pré-preenchido do veículo. */
function financeCalcHTML(opts){
  opts = opts || {};
  const price = opts.price || 80000;
  const entrada = Math.round(price * 0.2);
  return `
  <div class="calc" data-calc>
    <div class="calc-head">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h3M8 18h3"/><circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none"/></svg>
      <h3>Simule seu financiamento</h3>
    </div>
    <div class="calc-field">
      <label>Valor do veículo</label>
      <div class="calc-input"><span>R$</span><input type="text" inputmode="numeric" data-calc-price value="${fmtBRL(price)}"></div>
    </div>
    <div class="calc-field">
      <label>Entrada <em data-calc-entrada-pct></em></label>
      <div class="calc-input"><span>R$</span><input type="text" inputmode="numeric" data-calc-entrada value="${fmtBRL(entrada)}"></div>
      <input type="range" min="0" max="90" value="20" step="5" data-calc-range class="calc-range">
    </div>
    <div class="calc-field">
      <label>Prazo</label>
      <div class="calc-sel"><select data-calc-prazo>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
        <option value="36" selected>36 meses</option>
        <option value="48">48 meses</option>
        <option value="60">60 meses</option>
      </select></div>
    </div>
    <div class="calc-result">
      <span class="calc-result-lab">Parcela estimada</span>
      <div class="calc-result-val">R$ <b data-calc-parcela>—</b><small>/mês</small></div>
      <span class="calc-result-sub" data-calc-sub></span>
    </div>
    <a class="btn btn-wa calc-cta" data-calc-cta href="#" target="_blank" rel="noopener">${WA_ICON} Quero essa simulação</a>
    <p class="calc-note">Simulação meramente ilustrativa — <strong>não constitui proposta de crédito</strong>. A parcela usa taxa média de mercado; os valores, a taxa e o CET finais dependem de análise e aprovação da instituição financeira.</p>
  </div>`;
}

/* Ativa a calculadora dentro de um elemento raiz. */
function initFinanceCalc(scope){
  const el = (scope || document).querySelector('[data-calc]');
  if(!el) return;
  const parseNum = s => parseInt(String(s).replace(/\D/g,''),10) || 0;
  const priceIn  = el.querySelector('[data-calc-price]');
  const entradaIn= el.querySelector('[data-calc-entrada]');
  const range    = el.querySelector('[data-calc-range]');
  const prazoSel = el.querySelector('[data-calc-prazo]');
  const pctEl    = el.querySelector('[data-calc-entrada-pct]');
  const parcelaEl= el.querySelector('[data-calc-parcela]');
  const subEl    = el.querySelector('[data-calc-sub]');
  const cta      = el.querySelector('[data-calc-cta]');

  function calc(){
    const price = parseNum(priceIn.value);
    let entrada = parseNum(entradaIn.value);
    if(entrada > price) entrada = price;
    const n = parseInt(prazoSel.value,10);
    const pv = Math.max(price - entrada, 0);
    const i = FIN_TAXA_MES;
    const pmt = pv <= 0 ? 0 : pv * i / (1 - Math.pow(1+i, -n));
    const pct = price > 0 ? Math.round(entrada/price*100) : 0;

    pctEl.textContent = price>0 ? `(${pct}%)` : '';
    if(document.activeElement !== range) range.value = Math.min(90, Math.max(0, pct));
    parcelaEl.textContent = pmt>0 ? fmtBRL(Math.round(pmt)) : '—';
    subEl.textContent = pv>0 ? `${n}x · entrada de R$ ${fmtBRL(entrada)}` : 'Informe os valores acima';

    const msg = encodeURIComponent(
      `Olá! Fiz uma simulação no site:\n`+
      `• Veículo: R$ ${fmtBRL(price)}\n`+
      `• Entrada: R$ ${fmtBRL(entrada)}\n`+
      `• Prazo: ${n}x\n`+
      `• Parcela estimada: R$ ${fmtBRL(Math.round(pmt))}\n`+
      `Podem me passar as condições reais?`
    );
    cta.href = `https://wa.me/${WA_PHONE}?text=${msg}`;
  }
  function fmtField(input){
    const v = parseNum(input.value);
    input.value = v ? fmtBRL(v) : '';
  }
  priceIn.addEventListener('input', calc);
  entradaIn.addEventListener('input', calc);
  priceIn.addEventListener('blur', ()=>{fmtField(priceIn);calc();});
  entradaIn.addEventListener('blur', ()=>{fmtField(entradaIn);calc();});
  prazoSel.addEventListener('change', calc);
  range.addEventListener('input', ()=>{
    const price = parseNum(priceIn.value);
    entradaIn.value = fmtBRL(Math.round(price * range.value/100));
    calc();
  });
  calc();
}
