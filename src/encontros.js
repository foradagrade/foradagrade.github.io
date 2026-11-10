// Encontros, do mais antigo ao mais novo. Para marcar outro, some um item aqui e ponha as imagens de compartilhar
// em src/assets/encontros/<id>/ (saídas digitais do convite: <fundo>-<formato>[-<idioma>].png sem o link do site e
// <fundo>-<formato>[-<idioma>]-with-url.png com ele; o menu de compartilhar oferece as com link).
// end: primeiro dia em que o encontro já passou (00:00 local). O primeiro ainda não passado vira o cartão do
// próximo encontro; os passados entram na lista de concluídos, com o link da gravação quando houver.
// Texto igual nos três idiomas pode ser string; senão { 'pt-BR', en, es }. name/when aceitam marcação.
// ask: respostas do terminal (quando, onde, assunto, palestrantes) enquanto ele é o próximo encontro.
window.ENCONTROS = [
  {
    id: 'e01',
    end: '2026-10-17',
    date: '16/10',
    recording: 'https://www.youtube.com/watch?v=eAKb1C4rzG4',
    name: {
      'pt-BR': 'Quem <span class="a">controla</span> os <span class="b">pesos</span>?',
      en: 'Who <span class="a">controls</span> the <span class="b">weights</span>?',
      es: '¿Quién <span class="a">controla</span> los <span class="b">pesos</span>?'
    },
    when: {
      'pt-BR': '<span class="a">Sexta</span> <span class="sep">|</span> <span class="a">16/10</span> <span class="sep">|</span> <span class="a">19h30</span> <span class="sep">|</span> <span class="b">UDESC Joinville · Auditório Bloco F</span>',
      en: '<span class="a">Friday</span> <span class="sep">|</span> <span class="a">16/10</span> <span class="sep">|</span> <span class="a">7:30 pm</span> <span class="sep">|</span> <span class="b">UDESC Joinville · Block F Auditorium</span>',
      es: '<span class="a">Viernes</span> <span class="sep">|</span> <span class="a">16/10</span> <span class="sep">|</span> <span class="a">19:30</span> <span class="sep">|</span> <span class="b">UDESC Joinville · Auditorio Bloque F</span>'
    },
    ask: {
      when: { 'pt-BR': 'Sexta, 16/10, às 19h30.', en: 'Friday, 16/10, 7:30 pm.', es: 'Viernes, 16/10, 19:30.' },
      where: { 'pt-BR': 'UDESC Joinville · Auditório Bloco F.', en: 'UDESC Joinville · Block F Auditorium.', es: 'UDESC Joinville · Auditorio Bloque F.' },
      topics: {
        'pt-BR': 'Autosoberania em IA: modelos locais, motores de inferência, alternativas locais ao Jev, harness, fine-tuning.',
        en: 'Self-sovereignty in AI: local models, inference engines, local alternatives to Jev, harness, fine-tuning.',
        es: 'Autosoberanía en IA: modelos locales, motores de inferencia, alternativas locales a Jev, harness, fine-tuning.'
      }
    }
  },
  {
    id: 'e02',
    end: '2026-11-13',
    date: '12/11',
    name: 'Evaluating <span class="a">Open-Weight LLMs</span> for Hyperledger Fabric <span class="b">Chaincode Security</span>',
    sub: 'Complementarity, Coverage, and Limitations',
    speakers: 'Glauco V. Scheffel · Gustavo M. Camargo',
    when: {
      'pt-BR': '<span class="a">Quinta</span> <span class="sep">|</span> <span class="a">12/11</span> <span class="sep">|</span> <span class="a">19h–20h30</span> <span class="sep">|</span> <span class="b">Auditório Becomex · Prédio Neogrid</span>',
      en: '<span class="a">Thursday</span> <span class="sep">|</span> <span class="a">12/11</span> <span class="sep">|</span> <span class="a">7–8:30 pm</span> <span class="sep">|</span> <span class="b">Becomex Auditorium · Neogrid Building</span>',
      es: '<span class="a">Jueves</span> <span class="sep">|</span> <span class="a">12/11</span> <span class="sep">|</span> <span class="a">19–20:30</span> <span class="sep">|</span> <span class="b">Auditorio Becomex · Edificio Neogrid</span>'
    },
    address: 'Av. Santos Dumont, 935 · Santo Antônio · Joinville/SC',
    ask: {
      when: { 'pt-BR': 'Quinta, 12/11, das 19h às 20h30.', en: 'Thursday, 12/11, 7 to 8:30 pm.', es: 'Jueves, 12/11, de 19 a 20:30.' },
      where: {
        'pt-BR': 'Auditório Becomex, no Prédio Neogrid: Av. Santos Dumont, 935, Santo Antônio, Joinville/SC.',
        en: 'Becomex Auditorium, Neogrid Building: Av. Santos Dumont, 935, Santo Antônio, Joinville/SC.',
        es: 'Auditorio Becomex, en el Edificio Neogrid: Av. Santos Dumont, 935, Santo Antônio, Joinville/SC.'
      },
      topics: {
        'pt-BR': 'LLMs de pesos abertos na segurança de chaincode do Hyperledger Fabric: complementaridade, cobertura e limitações.',
        en: 'Open-weight LLMs for Hyperledger Fabric chaincode security: complementarity, coverage and limitations.',
        es: 'LLMs de pesos abiertos para la seguridad de chaincode en Hyperledger Fabric: complementariedad, cobertura y limitaciones.'
      },
      speakers: {
        'pt-BR': 'Glauco V. Scheffel e Gustavo M. Camargo.',
        en: 'Glauco V. Scheffel and Gustavo M. Camargo.',
        es: 'Glauco V. Scheffel y Gustavo M. Camargo.'
      }
    }
  }
];

window.encontroText = function (v, lang) { return typeof v === 'string' ? v : v[lang]; };

// O próximo encontro (o primeiro ainda não passado) ou undefined.
window.proximoEncontro = function () {
  var now = new Date();
  return window.ENCONTROS.find(function (e) { return now < new Date(e.end + 'T00:00:00'); });
};
