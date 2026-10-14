/* Sequenciador do logo da L06: toca cada animação de logo-anim.css uma vez, em ordem aleatória (saco
   embaralhado; ao esvaziar, reembaralha sem repetir a última). O fim do ciclo vem do ls-clock no próprio <svg>. */
(function () {
  var logo = document.querySelector('.logo-seq');
  if (!logo || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var all = logo.getAttribute('data-anims').split(' '), bag = [], cur = null;

  function draw() {
    if (!bag.length) {
      bag = all.slice();
      for (var i = bag.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)), t = bag[i];
        bag[i] = bag[j];
        bag[j] = t;
      }
      var last = bag.length - 1;
      if (bag[last] === cur) {
        var k = Math.floor(Math.random() * last);
        bag[last] = bag[k];
        bag[k] = cur;
      }
    }
    return bag.pop();
  }

  function play() {
    cur = draw();
    logo.removeAttribute('data-anim');
    void logo.getBoundingClientRect();
    logo.setAttribute('data-anim', cur);
  }

  logo.addEventListener('animationend', function (e) {
    if (e.target === logo && e.animationName === 'ls-clock') play();
  });
  play();
})();
