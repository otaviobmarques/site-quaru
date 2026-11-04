// Site do Quaru: animações leves, sem bibliotecas. Tudo respeita "reduzir movimento".
(() => {
  const doc = document.documentElement;
  doc.classList.add('js');
  const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Ano no rodapé
  $$('[data-ano]').forEach((e) => { e.textContent = String(new Date().getFullYear()); });

  // Logo da REDBOX: se o arquivo estiver no site, troca o texto pela imagem.
  const rb = $('.redbox');
  if (rb) { const im = new Image(); im.onload = () => { im.className = 'redbox-img'; im.alt = 'REDBOX'; rb.replaceWith(im); }; im.src = 'img/marca/redbox-branco.png'; }

  // Topo que encolhe e barra de progresso
  const topo = $('#topo'); const barra = $('.progresso span');
  const aoRolar = () => {
    topo.classList.toggle('rolou', scrollY > 10);
    const max = doc.scrollHeight - innerHeight;
    barra.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener('scroll', aoRolar, { passive: true }); aoRolar();

  // Revelar ao rolar (com atraso em cascata dentro do mesmo grupo)
  const grupos = new Map();
  $$('.revelar').forEach((e) => { const pai = e.parentElement; const i = grupos.get(pai) ?? 0; grupos.set(pai, i + 1); e.style.setProperty('--atraso', `${Math.min(i, 5) * 0.09}s`); });
  const obs = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('visto'); obs.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('.revelar').forEach((e) => obs.observe(e));

  // Carrossel do celular do topo
  $$('[data-carrossel]').forEach((c) => {
    const ims = $$('img', c); let i = 0;
    if (calmo || ims.length < 2) return;
    setInterval(() => { ims[i].classList.remove('ativa'); i = (i + 1) % ims.length; ims[i].classList.add('ativa'); }, 3200);
  });

  // Módulos: o celular fixo troca de tela conforme o texto que está no meio da tela
  const palco = $('[data-palco]');
  if (palco) {
    const telas = new Map($$('img', palco).map((im) => [im.dataset.tela, im]));
    const mods = $$('.modulo');
    const mostrar = (m) => {
      mods.forEach((x) => x.classList.toggle('atual', x === m));
      telas.forEach((im, k) => im.classList.toggle('ativa', k === m.dataset.mostra));
    };
    const om = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) mostrar(x.target); }), { rootMargin: '-45% 0px -45% 0px' });
    mods.forEach((m) => om.observe(m));
    if (mods[0]) mostrar(mods[0]);
  }

  // Área do treinador: abas (troca sozinha até a pessoa tocar)
  const abas = $$('.abas [role=tab]');
  let auto = !calmo;
  const ativarAba = (b) => {
    abas.forEach((x) => { const sel = x === b; x.setAttribute('aria-selected', String(sel)); x.tabIndex = sel ? 0 : -1; $('#' + x.getAttribute('aria-controls')).classList.toggle('ativa', sel); });
  };
  abas.forEach((b, k) => {
    b.addEventListener('click', () => { auto = false; ativarAba(b); });
    b.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const n = abas[(k + (e.key === 'ArrowRight' ? 1 : abas.length - 1)) % abas.length]; auto = false; ativarAba(n); n.focus(); } });
  });
  if (abas.length) {
    let j = 0;
    const na = new IntersectionObserver((es) => { es.forEach((x) => { x.target.dataset.visivel = x.isIntersecting ? '1' : ''; }); }, { threshold: 0.3 });
    const nb = $('.notebook'); na.observe(nb);
    setInterval(() => { if (auto && nb.dataset.visivel) { j = (j + 1) % abas.length; ativarAba(abas[j]); } }, 4200);
  }

  // Contadores
  const oc = new IntersectionObserver((es) => es.forEach((x) => {
    if (!x.isIntersecting) return; oc.unobserve(x.target);
    const e = x.target; const alvo = +e.dataset.contar; const suf = e.dataset.sufixo ?? ''; const pre = e.dataset.prefixo ?? '';
    if (calmo || !alvo) return;
    const t0 = performance.now(); const dur = 1400;
    const passo = (t) => { const p = Math.min(1, (t - t0) / dur); const v = Math.round(alvo * (1 - Math.pow(1 - p, 3))); e.textContent = `${pre}${v.toLocaleString('pt-BR')}${suf}`; if (p < 1) requestAnimationFrame(passo); };
    requestAnimationFrame(passo);
  }), { threshold: 0.6 });
  $$('[data-contar]').forEach((e) => oc.observe(e));

  // Mascote: toque para comemorar (confete e chapéu de festa)
  const mb = $('.mascote-botao'); const conf = $('.confete');
  if (mb) mb.addEventListener('click', () => {
    const svg = $('svg', mb); const use = $('use', svg);
    use.setAttribute('href', '#mascote-festa');
    setTimeout(() => use.setAttribute('href', '#mascote-oi'), 2600);
    if (calmo) return;
    const cores = ['#E0263F', '#FBBF24', '#7C5CFF', '#14141A', '#FFFFFF'];
    for (let k = 0; k < 40; k++) {
      const i = document.createElement('i'); const a = Math.random() * Math.PI * 2; const d = 120 + Math.random() * 200;
      i.style.background = cores[k % cores.length];
      i.style.setProperty('--x', `${Math.cos(a) * d}px`); i.style.setProperty('--y', `${Math.sin(a) * d - 60}px`); i.style.setProperty('--r', `${Math.random() * 720 - 360}deg`);
      i.style.animationDelay = `${Math.random() * 0.15}s`;
      conf.append(i); setTimeout(() => i.remove(), 1500);
    }
  });

  // Paralaxe suave das bolhas do topo
  if (!calmo) {
    const b1 = $('.bolha.b1'), b2 = $('.bolha.b2');
    addEventListener('scroll', () => { const y = scrollY; if (y < innerHeight * 1.2) { b1.style.transform = `translateY(${y * 0.18}px)`; b2.style.transform = `translateY(${y * -0.12}px)`; } }, { passive: true });
  }
})();
