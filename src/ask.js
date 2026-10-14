// Terminal "./ask-us-anything": casa a pergunta com respostas fixas de ask-kb.js.
// Nunca gera texto. Pergunta com palavra desconhecida, ambígua ou sem acerto = resposta padrão.
(function () {
  var kb = window.ASK_KB;
  var root = document.documentElement;
  var box = document.querySelector('.ask');
  var log = box.querySelector('.ask-log');
  var form = box.querySelector('.ask-form');
  var input = box.querySelector('.ask-form input');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mirror = box.querySelector('.ask-mirror');
  var timer = null;

  function norm(w) {
    w = w.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
    return w.length > 3 && w.charAt(w.length - 1) === 's' ? w.slice(0, -1) : w;
  }
  function words(text) {
    return text.split(/[^A-Za-zÀ-ÿ0-9]+/).map(norm).filter(Boolean);
  }

  var stop = {};
  kb.stop.forEach(function (w) { stop[norm(w)] = 1; });
  var index = {};
  kb.entries.forEach(function (e) {
    e.kwSet = {};
    e.kw.forEach(function (w) { e.kwSet[norm(w)] = 1; index[norm(w)] = 1; });
  });

  var WHO = {};
  ['quem', 'who', 'whom', 'quien', 'quienes'].forEach(function (w) { WHO[norm(w)] = 1; });

  // Devolve [] (fallback) ou 1-2 entradas. Palavra fora do vocabulário => [].
  function match(text) {
    var ws = words(text);
    var seen = {};
    var hits = kb.entries.map(function () { return 0; });
    if (!ws.length) return [];
    for (var i = 0; i < ws.length; i++) {
      var w = ws[i];
      if (seen[w]) continue;
      seen[w] = 1;
      var known = false;
      kb.entries.forEach(function (e, k) {
        if (e.kwSet[w]) { hits[k]++; known = true; }
      });
      if (!known && !stop[w]) return [];
    }
    // "quem fundou o Fab Lab?": mostra fundadores + descrição, nunca só a descrição.
    var fi = kb.entries.findIndex(function (e) { return e.id === 'founders'; });
    var fl = kb.entries.findIndex(function (e) { return e.id === 'fablab'; });
    if (hits[fi] > 0 && hits[fl] > 0) return [kb.entries[fi], kb.entries[fl]];
    var best = Math.max.apply(null, hits);
    // "quem?", "who are you?", "¿quiénes son?": pergunta por pessoa = fundadores.
    if (ws.some(function (w) { return WHO[w]; }) && (best < 1 || hits[fi] > 0)) return [kb.entries[fi]];
    if (best < 1) return [];
    var top = kb.entries.filter(function (e, k) { return hits[k] === best; });
    return top.length <= 2 ? top : [];
  }

  function lang() { return kb.fallback[root.lang] ? root.lang : 'en'; }

  function line(cls) {
    var p = document.createElement('p');
    p.className = cls;
    log.appendChild(p);
    return p;
  }

  function say(text) {
    var p = line('ask-a');
    clearInterval(timer);
    if (reduce) { p.textContent = text; return; }
    var i = 0;
    timer = setInterval(function () {
      i += 2;
      p.textContent = text.slice(0, i);
      if (i >= text.length) { clearInterval(timer); timer = null; }
    }, 14);
  }

  // Texto minúsculo, sem acento, espaços colapsados (para comandos de terminal).
  function cmd(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
  }

  // Pergunta idêntica ao rótulo de um chip (ex.: "o que é?") responde essa entrada.
  function matchChip(text) {
    var c = cmd(text).replace(/[^a-z0-9 ]/g, '').trim();
    var chips = window.ASK_CHIPS;
    for (var i = 0; i < chips.length; i++) {
      for (var k in chips[i].q) {
        if (cmd(chips[i].q[k]).replace(/[^a-z0-9 ]/g, '').trim() === c) {
          return kb.entries.filter(function (e) { return e.id === chips[i].id; });
        }
      }
    }
    return null;
  }

  function hasUpcoming() {
    var now = new Date();
    return window.ASK_EVENTS.some(function (e) { return now < new Date(e.end + 'T00:00:00'); });
  }

  // Quando/onde/assunto só valem enquanto houver encontro futuro.
  function answerOf(e, l) {
    if (window.ASK_EVENT_IDS.indexOf(e.id) !== -1 && !hasUpcoming()) return window.ASK_NO_EVENT[l];
    return e.a[l];
  }

  // Devolve {t, chips} para um comando/egg, ou null.
  function egg(question, l) {
    var c = cmd(question);
    if (/^echo(?: |$)/.test(c)) return { t: question.trim().slice(4).trim(), chips: false };
    var eggs = window.ASK_EGGS;
    for (var i = 0; i < eggs.length; i++) {
      if (new RegExp(eggs[i].re).test(c)) return { t: eggs[i].a[l], chips: !!eggs[i].chips };
    }
    return null;
  }

  function showChips(l) {
    var row = document.createElement('div');
    row.className = 'ask-chips';
    window.ASK_CHIPS.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = c.q[l];
      b.addEventListener('mousedown', function (ev) { ev.preventDefault(); });
      b.addEventListener('click', function () {
        ask(c.q[l], c.id);
        input.focus({ preventScroll: true });
      });
      row.appendChild(b);
    });
    log.appendChild(row);
  }

  // id: entrada escolhida por um chip; sem id, a pergunta passa pelo casador.
  function ask(question, id) {
    if (/^(clear|cls|limpar|limpiar)$/.test(cmd(question))) {
      clearInterval(timer);
      log.textContent = '';
      return;
    }
    var q = line('ask-q');
    q.textContent = question;
    var l = lang();
    var hit = egg(question, l);
    var out, chips = false;
    if (hit) {
      out = hit.t;
      chips = hit.chips;
    } else {
      var found = id ? kb.entries.filter(function (e) { return e.id === id; }) : matchChip(question) || match(question);
      chips = !found.length;
      out = found.length ? found.map(function (e) { return answerOf(e, l); }).join(' ') : kb.fallback[l];
    }
    say(out);
    if (chips) showChips(l);
    log.scrollTop = log.scrollHeight;
  }

  function sync() { mirror.textContent = input.value; }
  input.addEventListener('input', sync);
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var v = input.value.trim();
    if (!v) return;
    input.value = '';
    sync();
    ask(v);
  });

  // O terminal é o foco padrão: volta para ele após cliques, ao reabrir a aba
  // e ao digitar com o foco em outro lugar. Menus abertos e seleção de texto ficam em paz.
  function busy() {
    var a = document.activeElement;
    return document.querySelector('#share-pop:not([hidden]), .lang-list:not([hidden])') ||
      String(window.getSelection()).length > 0 ||
      (a && a !== input && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName));
  }
  function refocus() {
    if (document.activeElement !== input && !busy()) input.focus({ preventScroll: true });
  }
  refocus();
  document.addEventListener('click', function () { setTimeout(refocus, 0); });
  window.addEventListener('focus', refocus);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) refocus(); });

  var konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var pos = 0;
  document.addEventListener('keydown', function (ev) {
    // Depois das setas, "b" e "a" já caem no input: a sequência continua valendo lá.
    if (ev.target === input && pos < 8) return;
    pos = ev.key === konami[pos] ? pos + 1 : (ev.key === konami[0] ? 1 : 0);
    if (pos === konami.length) {
      pos = 0;
      ev.preventDefault();
      input.value = '';
      sync();
      say(window.ASK_KONAMI[lang()]);
      return;
    }
    if (ev.target !== input && ev.key.length === 1 && !ev.ctrlKey && !ev.metaKey && !ev.altKey && !busy()) {
      input.focus({ preventScroll: true });
    }
  });

  document.addEventListener('langchange', function () {
    clearInterval(timer);
    timer = null;
    log.textContent = '';
  });
})();
