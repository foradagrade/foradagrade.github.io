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
      b.setAttribute('aria-selected', String(b.dataset.lang === lang));
    });
    renderEncontros(lang, dict);
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  // Cartão do próximo encontro (some se não houver) e lista dos concluídos, do mais novo ao mais velho.
  function renderEncontros(lang, dict) {
    var t = window.encontroText;
    var next = window.proximoEncontro();
    var card = document.querySelector('.meet');
    card.hidden = !next;
    if (next) {
      card.querySelector('.meet-name').innerHTML = t(next.name, lang);
      card.querySelector('.meet-sub').textContent = next.sub ? t(next.sub, lang) : '';
      card.querySelector('.meet-by').textContent = next.speakers ? t(next.speakers, lang) : '';
      card.querySelector('.meet-when').innerHTML = t(next.when, lang);
      card.querySelector('.meet-addr').textContent = next.address ? t(next.address, lang) : '';
      var sfx = lang === 'pt-BR' ? '' : '-' + lang;
      card.querySelectorAll('[data-social]').forEach(function (a) {
        var f = 'src/assets/encontros/' + next.id + '/' + a.dataset.social + sfx + '.png';
        a.href = f;
        a.querySelector('img').src = f;
      });
    }
    var list = document.querySelector('.meet-past');
    list.textContent = '';
    window.ENCONTROS.filter(function (e) { return e !== next && new Date() >= new Date(e.end + 'T00:00:00'); })
      .reverse().forEach(function (e) {
        var li = document.createElement('li');
        li.innerHTML = '<span class="past-date"></span><span class="past-name"></span><span class="past-done"></span>';
        li.querySelector('.past-date').textContent = e.date;
        li.querySelector('.past-name').innerHTML = t(e.name, lang);
        li.querySelector('.past-done').textContent = dict.meetDone;
        if (e.recording) {
          var a = document.createElement('a');
          a.className = 'past-rec';
          a.href = e.recording;
          a.target = '_blank';
          a.rel = 'noopener';
          a.textContent = dict.meetWatch;
          li.appendChild(a);
        }
        list.appendChild(li);
      });
    list.hidden = !list.children.length;
  }
  applyLang(root.lang, false);
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.dataset.lang, true); });
  });

  var shareBtn = document.querySelector('.share-btn');
  var pop = document.getElementById('share-pop');
  function setShare(open) {
    pop.hidden = !open;
    shareBtn.setAttribute('aria-expanded', String(open));
  }
  function fill() {
    var url = location.origin + location.pathname + '?lang=' + document.documentElement.lang;
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
  }
  shareBtn.addEventListener('click', function () { if (pop.hidden) fill(); setShare(pop.hidden); });
  document.addEventListener('click', function (e) { if (!shareBtn.parentNode.contains(e.target)) setShare(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !pop.hidden) { setShare(false); shareBtn.focus(); }
  });

  var trigger = document.querySelector('.lang-trigger');
  var list = trigger.parentNode.querySelector('.lang-list');
  function setOpen(open) {
    list.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
  }
  trigger.addEventListener('click', function () { setOpen(list.hidden); });
  list.addEventListener('click', function () { setOpen(false); });
  document.addEventListener('click', function (e) { if (!trigger.parentNode.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !list.hidden) { setOpen(false); trigger.focus(); }
  });

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
