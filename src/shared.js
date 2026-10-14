// Tema (mesmo interruptor do site) e idioma. O script inline do <head> já
// definiu data-theme e lang antes da pintura; aqui só aplicamos e salvamos.
(function () {
  var root = document.documentElement;

  function applyLang(lang, save) {
    var dict = window.I18N[lang];
    root.lang = lang;
    if (save) localStorage.setItem('lang', lang);
    document.title = dict.title;
    document.querySelector('meta[name="description"]').content = dict.description;
    document.querySelector('meta[property="og:description"]').content = dict.ogDescription;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = dict[el.dataset.i18n]; });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = dict[el.dataset.i18nHtml]; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) { el.placeholder = dict[el.dataset.i18nPlaceholder]; });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) { el.alt = dict[el.dataset.i18nAlt]; });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', dict[el.dataset.i18nAria]); });
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
      if (b.getAttribute('role') === 'option') b.setAttribute('aria-selected', String(b.dataset.lang === lang));
    });
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }
  applyLang(root.lang, false);
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.dataset.lang, true); });
  });


  var shareBtn = document.querySelector('.share-btn');
  if (shareBtn) {
    var pop = document.getElementById('share-pop');
    var setShare = function (open) {
      pop.hidden = !open;
      shareBtn.setAttribute('aria-expanded', String(open));
    };
    var fill = function () {
      var url = location.origin + location.pathname;
      var text = document.querySelector('.meet-name').textContent.trim() + ' · ' + document.querySelector('.meet-when').textContent.replace(/\s*\|\s*/g, ' | ').trim();
      var u = encodeURIComponent(url), t = encodeURIComponent(text);
      var href = {
        whatsapp: 'https://wa.me/?text=' + encodeURIComponent(text + ' ' + url),
        telegram: 'https://t.me/share/url?url=' + u + '&text=' + t,
        x: 'https://twitter.com/intent/tweet?text=' + t + '&url=' + u,
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + u,
        linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + u
      };
      pop.querySelectorAll('[data-net]').forEach(function (a) { a.href = href[a.dataset.net]; });
    };
    shareBtn.addEventListener('click', function () { if (pop.hidden) fill(); setShare(pop.hidden); });
    document.addEventListener('click', function (e) { if (!shareBtn.parentNode.contains(e.target)) setShare(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !pop.hidden) { setShare(false); shareBtn.focus(); }
    });
  }

  var trigger = document.querySelector('.lang-trigger');
  if (trigger) {
    var list = trigger.parentNode.querySelector('.lang-list');
    var setOpen = function (open) {
      list.hidden = !open;
      trigger.setAttribute('aria-expanded', String(open));
    };
    trigger.addEventListener('click', function () { setOpen(list.hidden); });
    list.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('click', function (e) { if (!trigger.parentNode.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !list.hidden) { setOpen(false); trigger.focus(); }
    });
  }

  var btn = document.getElementById('theme-toggle');
  function applyTheme(t) {
    root.dataset.theme = t;
    localStorage.setItem('theme', t);
    btn.setAttribute('aria-checked', String(t === 'dark'));
  }
  btn.setAttribute('aria-checked', String(root.dataset.theme === 'dark'));
  btn.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduce) {
      applyTheme(next);
      return;
    }
    var r = btn.getBoundingClientRect();
    var x = r.left + r.width / 2;
    var y = r.top + r.height / 2;
    var rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var vt = document.startViewTransition(function () { applyTheme(next); });
    vt.ready.then(function () {
      root.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + rad + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 650, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      );
    });
  });
})();
