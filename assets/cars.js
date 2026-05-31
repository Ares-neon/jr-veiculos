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

/* Monta o HTML de um card. opts.badge = mostra selo "Destaque do mês". */
function carCardHTML(c, i, opts){
  opts = opts || {};
  const delay = i%3===1 ? 'd1' : i%3===2 ? 'd2' : '';
  const badge = opts.badge && c.destaque
    ? '<span class="destaque-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.7 6.1 21l1.2-6.6L2.5 9l6.6-.9z"/></svg> Destaque</span>'
    : '';
  return `
    <a class="card reveal ${delay}" href="carro.html?id=${c.id}" data-brand="${c.brand}" data-year="${c.year}" data-price="${c.price}" data-name="${c.name.toLowerCase()}">
      <div class="card-img">
        ${c.fotos && c.fotos.length ? `<img src="${c.fotos[0]}" alt="${c.name}" loading="lazy">` : '<div class="ph"><span>📷 Foto do veículo</span></div>'}
        ${badge}
        <span class="tag">${BRAND_LABEL[c.brand]}</span>
        <span class="year">${c.yearLabel}</span>
      </div>
      <div class="card-body">
        <h3>${c.name}</h3>
        <div class="card-specs">
          <span class="s">${ICON_YEAR}${c.yearLabel}</span>
          <span class="s">${ICON_KM}${c.km} km</span>
          <span class="s">${ICON_BODY}${c.body}</span>
        </div>
        <div class="card-foot">
          <div class="price"><small>À vista a partir de</small><b>R$ ${fmtBRL(c.price)}</b></div>
          <span class="go" aria-hidden="true">${ARROW}</span>
        </div>
      </div>
    </a>`;
}
