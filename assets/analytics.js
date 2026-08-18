/* ============ ANALYTICS + CONSENTIMENTO (LGPD) ============
   O Google Analytics só carrega depois que a pessoa aceita os cookies.
   A escolha fica salva no navegador dela. */
(function(){
  var ID  = 'G-94SXGNB54W';
  var KEY = 'jrCookies';
  var escolha = null;
  try{ escolha = localStorage.getItem(KEY); }catch(e){}

  function carregarGA(){
    if(window.__jrGA) return; window.__jrGA = 1;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', ID, { anonymize_ip: true });
  }

  /* Dispara um evento (só funciona se houver consentimento). */
  window.jrTrack = function(nome, params){
    if(window.gtag) gtag('event', nome, params || {});
  };

  if(escolha === '1') carregarGA();

  /* ---------- Banner de cookies ---------- */
  if(!escolha){
    document.addEventListener('DOMContentLoaded', function(){
      var b = document.createElement('div');
      b.className = 'cookie-bar';
      b.setAttribute('role','dialog');
      b.setAttribute('aria-label','Aviso de cookies');
      b.innerHTML =
        '<p>Usamos cookies para entender como o site é usado e melhorar sua experiência. ' +
        'Saiba mais na <a href="privacidade.html">Política de Privacidade</a>.</p>' +
        '<div class="cookie-btns">' +
          '<button type="button" class="ck-no">Recusar</button>' +
          '<button type="button" class="ck-yes">Aceitar</button>' +
        '</div>';
      document.body.appendChild(b);
      requestAnimationFrame(function(){ b.classList.add('show'); });

      function fechar(v){
        try{ localStorage.setItem(KEY, v); }catch(e){}
        b.classList.remove('show');
        setTimeout(function(){ b.remove(); }, 350);
        if(v === '1') carregarGA();
      }
      b.querySelector('.ck-yes').addEventListener('click', function(){ fechar('1'); });
      b.querySelector('.ck-no').addEventListener('click',  function(){ fechar('0'); });
    });
  }

  /* ---------- Os 3 eventos que importam ---------- */
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a');
    if(!a) return;
    var href = a.getAttribute('href') || '';

    /* 1. simulou financiamento (checar antes do WhatsApp: o botão da calculadora é um link wa.me) */
    if(a.hasAttribute('data-calc-cta')){
      jrTrack('simular_financiamento', { pagina: location.pathname });
      return;
    }
    /* 2. contato por WhatsApp — a conversão principal */
    if(/wa\.me|api\.whatsapp/i.test(href)){
      jrTrack('clique_whatsapp', {
        origem: a.className || 'link',
        pagina: location.pathname
      });
      return;
    }
    /* 3. interesse em um veículo específico */
    if(/^carro\.html/.test(href)){
      var t = a.querySelector('h3');
      jrTrack('ver_carro', {
        carro: (t && t.textContent) || a.getAttribute('aria-label') || ''
      });
      return;
    }
    if(/^tel:/.test(href)) jrTrack('clique_telefone', { pagina: location.pathname });
  }, true);
})();
