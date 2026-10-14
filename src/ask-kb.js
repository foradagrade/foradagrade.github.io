// Base de conhecimento do terminal "./ask-us-anything".
// Saída = só as respostas fixas abaixo ou a resposta padrão (fallback). Nada é gerado.
// Nada é listado na página: só responde a quem digitar a pergunta.
// kw: palavras-chave (PT, EN, ES juntas). Sem acento, minúsculas, plural com "s" é ignorado.
// Regra de segurança (ask.js): se a pergunta tiver QUALQUER palavra fora de kw + stop, responde o fallback.
window.ASK_KB = {
  stop: [
    // pt
    'o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com',
    'e', 'ou', 'que', 'qual', 'quais', 'quem', 'como', 'onde', 'quando', 'eh', 'ser', 'sera', 'vai', 'vao', 'foi', 'sao',
    'esta', 'estao', 'tem', 'ha', 'me', 'te', 'se', 'ao', 'aos', 'sobre', 'mais', 'isso', 'isto', 'esse', 'essa', 'este',
    'voce', 'voces', 'vcs', 'pode', 'posso', 'podem', 'eu', 'meu', 'seu', 'oi', 'ola',
    // en
    'the', 'an', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'and', 'or', 'what', 'which', 'who', 'how', 'where', 'when',
    'is', 'are', 'was', 'will', 'be', 'been', 'it', 'this', 'that', 'these', 'those', 'about', 'you', 'your', 'we', 'our',
    'us', 'i', 'my', 'do', 'does', 'can', 'could', 'would', 'there', 'here', 'hi', 'hello',
    // es
    'el', 'la', 'los', 'las', 'unos', 'unas', 'del', 'y', 'cual', 'cuales', 'quien', 'quienes', 'como', 'donde', 'cuando', 'es', 'son',
    'va', 'fue', 'estan', 'tiene', 'hay', 'al', 'mas', 'eso', 'esto', 'ese', 'esa', 'usted', 'ustedes', 'tu', 'su', 'puede',
    'puedo', 'pueden', 'yo', 'hola'
  ],
  fallback: {
    'pt-BR': 'Não sei responder isso. Pergunte no grupo do WhatsApp ou selecione uma sugestão.',
    en: "I don't know that. Ask in the WhatsApp group or select a suggestion.",
    es: 'No sé responder eso. Pregunta en el grupo de WhatsApp o selecciona una sugerencia.'
  },
  entries: [
    {
      id: 'when',
      kw: ['quando', 'when', 'cuando', 'data', 'dia', 'horario', 'hora', 'sexta', 'comeca', 'comeco', 'date', 'day', 'time', 'start', 'starts', 'friday',
        'fecha', 'comienza', 'empieza', 'viernes'],
      a: { 'pt-BR': 'Sexta, 16/10, às 19h30.', en: 'Friday, 16/10, 7:30 pm.', es: 'Viernes, 16/10, 19:30.' }
    },
    {
      id: 'where',
      kw: ['onde', 'where', 'donde', 'local', 'lugar', 'auditorio', 'bloco', 'endereco', 'sala', 'acontece', 'ocorre', 'place', 'location', 'venue',
        'auditorium', 'block', 'address', 'room', 'held', 'bloque', 'direccion', 'ocurre', 'udesc', 'joinville', 'campus'],
      a: { 'pt-BR': 'UDESC Joinville · Auditório Bloco F.', en: 'UDESC Joinville · Block F Auditorium.', es: 'UDESC Joinville · Auditorio Bloque F.' }
    },
    {
      id: 'join',
      kw: ['entrar', 'entro', 'participar', 'participo', 'grupo', 'whatsapp', 'zap', 'inscricao', 'inscrever', 'inscrevo',
        'join', 'group', 'participate', 'signup', 'register', 'attend', 'enter', 'unirse', 'unirme', 'inscribirse', 'inscripcion',
        'registrarse', 'asistir'],
      a: {
        'pt-BR': 'Entre no grupo do WhatsApp: escaneie o QR code no fim desta página.',
        en: 'Join the WhatsApp group: scan the QR code at the bottom of this page.',
        es: 'Únete al grupo de WhatsApp: escanea el código QR al final de esta página.'
      }
    },
    {
      id: 'what',
      kw: ['fora', 'grade', 'projeto', 'iniciativa', 'fazem', 'fazemos', 'faz', 'objetivo', 'proposta', 'project', 'initiative',
        'goal', 'purpose', 'proyecto', 'iniciativa', 'hacen', 'hacemos', 'objetivo', 'propuesta'],
      a: {
        'pt-BR': 'Cultura de experimentação dentro da universidade: IA local, código aberto e eletrônica.',
        en: 'A culture of experimentation inside the university: local AI, open source, electronics.',
        es: 'Cultura de experimentación dentro de la universidad: IA local, código abierto y electrónica.'
      }
    },
    {
      id: 'topics',
      kw: ['assunto', 'tema', 'topico', 'conteudo', 'pauta', 'programacao', 'falar', 'falarao', 'abordado', 'autosoberania',
        'soberania', 'motor', 'inferencia', 'harness', 'fine', 'tuning', 'jev', 'palestra', 'apresentacao', 'conversa', 'roda',
        'topic', 'subject', 'theme', 'content', 'agenda', 'talk', 'discuss', 'discussed', 'cover', 'covered', 'sovereignty',
        'self', 'engine', 'inference', 'presentation', 'conversation', 'temas', 'contenido', 'charla', 'hablar', 'abordan',
        'motores', 'presentacion', 'conversacion', 'engines'],
      a: {
        'pt-BR': 'Autosoberania em IA: modelos locais, motores de inferência, alternativas locais ao Jev, harness, fine-tuning.',
        en: 'Self-sovereignty in AI: local models, inference engines, local alternatives to Jev, harness, fine-tuning.',
        es: 'Autosoberanía en IA: modelos locales, motores de inferencia, alternativas locales a Jev, harness, fine-tuning.'
      }
    },
    {
      id: 'localai',
      kw: ['ia', 'ai', 'local', 'locais', 'locales', 'inteligencia', 'artificial', 'intelligence', 'nuvem', 'cloud', 'nube',
        'computador', 'computer', 'computadora', 'rodam', 'rodar', 'run', 'corren', 'mensalidade', 'subscription', 'mensualidad'],
      a: {
        'pt-BR': 'Modelos de IA que rodam no seu computador. Sem nuvem, sem mensalidade.',
        en: 'AI models that run on your own computer. No cloud, no subscription.',
        es: 'Modelos de IA que corren en tu computadora. Sin nube, sin mensualidad.'
      }
    },
    {
      id: 'name',
      kw: ['nome', 'chama', 'chamado', 'significa', 'significado', 'name', 'named', 'called', 'mean', 'means', 'meaning',
        'nombre', 'llama', 'significa', 'why', 'porque'],
      a: {
        'pt-BR': '"Grade" é o currículo obrigatório. Trabalhamos fora dele: nos projetos que a ementa não prevê.',
        en: '"Grade" is the required curriculum. We work outside it: on projects the syllabus doesn\'t cover.',
        es: '"Grade" es la malla curricular. Trabajamos fuera de ella: en proyectos que el programa no prevé.'
      }
    },
    {
      id: 'recorded',
      kw: ['gravado', 'gravada', 'gravacao', 'gravar', 'gravam', 'filmado', 'filmar', 'video', 'transmitido', 'transmissao',
        'vivo', 'recorded', 'record', 'recording', 'recordings', 'stream', 'streamed', 'streaming', 'livestream', 'filmed',
        'replay', 'grabado', 'grabada', 'grabacion', 'grabar', 'graban', 'transmision', 'transmiten'],
      a: {
        'pt-BR': 'Sim, o encontro será gravado.',
        en: 'Yes, the meeting will be recorded.',
        es: 'Sí, el encuentro será grabado.'
      }
    },
    {
      id: 'fablab',
      kw: ['fab', 'lab', 'fablab', 'joinville', 'parceiro', 'parceria', 'parceiros', 'apoio', 'apoia', 'apoiador', 'laboratorio',
        'fabricacao', 'maquinas', 'partner', 'partners', 'partnership', 'sponsor', 'supports', 'laboratory', 'manufacturing',
        'socio', 'aliado', 'alianza', 'apoyo', 'fabricacion'],
      a: {
        'pt-BR': 'Associação sem fins lucrativos, de voluntários, fundada em 2016. Tem corte a laser, CNC, impressão 3D e eletrônica.',
        en: 'A volunteer-run nonprofit founded in 2016. It has laser cutting, CNC, 3D printing and electronics.',
        es: 'Asociación sin fines de lucro, de voluntarios, fundada en 2016. Tiene corte láser, CNC, impresión 3D y electrónica.'
      }
    },
    {
      id: 'founders',
      kw: ['fundador', 'fundadora', 'fundadores', 'fundou', 'fundaram', 'fundado', 'criador', 'criadores', 'criou', 'criaram',
        'criado', 'organizador', 'organizadores', 'organiza', 'organizam', 'idealizador', 'responsavel', 'responsaveis', 'equipe',
        'founder', 'founders', 'founded', 'creator', 'creators', 'created', 'organizer', 'organizers', 'organize', 'organizes',
        'team', 'behind', 'runs', 'run', 'fundo', 'fundaron', 'creo', 'crearon', 'creadores', 'equipo', 'detras'],
      a: {
        'pt-BR': 'Lauro Gripa e Alan Fachini fundaram o Fora da Grade. Alan fundou o Fab Lab Joinville.',
        en: 'Lauro Gripa and Alan Fachini founded Fora da Grade. Alan founded Fab Lab Joinville.',
        es: 'Lauro Gripa y Alan Fachini fundaron Fora da Grade. Alan fundó el Fab Lab Joinville.'
      }
    }
  ]
};

// Easter eggs: comandos de terminal digitados inteiros. Piadas fixas, sem afirmar fatos do projeto.
// re = regex sobre o texto minúsculo, sem acento, espaços colapsados.
window.ASK_EGGS = [
  { re: '^(ls|ls -la?|dir)$', a: {
    'pt-BR': 'ementa.txt (vazio)  projetos/  curiosidade/  grade/ (ignorada)',
    en: 'syllabus.txt (empty)  projects/  curiosity/  grade/ (ignored)',
    es: 'programa.txt (vacío)  proyectos/  curiosidad/  grade/ (ignorada)' } },
  { re: '^pwd$', a: { 'pt-BR': '/fora/da/grade', en: '/outside/the/grade', es: '/fuera/de/la/grade' } },
  { re: '^whoami$', a: { 'pt-BR': 'visitante curioso', en: 'curious visitor', es: 'visitante curioso' } },
  { re: '^sudo\\b', a: {
    'pt-BR': 'visitante não está no arquivo sudoers. Este incidente será reportado.',
    en: 'visitor is not in the sudoers file. This incident will be reported.',
    es: 'visitante no está en el archivo sudoers. Este incidente será reportado.' } },
  { re: '^(exit|quit|logout|sair|salir)$', a: {
    'pt-BR': 'Você já está fora da grade.', en: "You're already outside the grade.", es: 'Ya estás fuera de la malla.' } },
  { re: '^rm\\b', a: {
    'pt-BR': 'Permissão negada. A grade curricular continua intacta.',
    en: 'Permission denied. The curriculum remains intact.',
    es: 'Permiso denegado. La malla curricular sigue intacta.' } },
  { re: '^(cat |less |nano |vi )?(ementa|syllabus|programa)(\\.txt)?$', a: {
    'pt-BR': 'cat: ementa.txt: arquivo não encontrado.', en: 'cat: syllabus.txt: no such file.',
    es: 'cat: programa.txt: no existe el archivo.' } },
  { re: '^42$', a: {
    'pt-BR': 'A resposta. Qual era a pergunta?', en: 'The answer. What was the question?', es: 'La respuesta. ¿Cuál era la pregunta?' } },
  { re: '^(coffee|cafe|make coffee|fazer cafe)$', a: {
    'pt-BR': '418: eu sou um bule de chá.', en: "418: I'm a teapot.", es: '418: soy una tetera.' } },
  { chips: true, re: '^(oi+|ola+|hello|hi|hola|hey|e ai|eae|opa|bom dia|boa tarde|boa noite|buenas|buenos dias|buenas tardes|good (morning|afternoon|evening)|help|ajuda|ayuda|\\?)$', a: {
    'pt-BR': 'Olá! Selecione uma sugestão ou pergunte.', en: 'Hello! Select a suggestion or ask away.',
    es: '¡Hola! Selecciona una sugerencia o pregunta.' } }
];
window.ASK_KONAMI = {
  'pt-BR': '↑↑↓↓←→←→BA: +30 vidas.', en: '↑↑↓↓←→←→BA: +30 lives.', es: '↑↑↓↓←→←→BA: +30 vidas.'
};

// Sugestões clicáveis: só aparecem após uma saudação/ajuda ou quando a pergunta não é entendida.
window.ASK_CHIPS = [
  { id: 'when', q: { 'pt-BR': 'quando?', en: 'when?', es: '¿cuándo?' } },
  { id: 'where', q: { 'pt-BR': 'onde?', en: 'where?', es: '¿dónde?' } },
  { id: 'join', q: { 'pt-BR': 'como entrar?', en: 'how to join?', es: '¿cómo unirme?' } },
  { id: 'what', q: { 'pt-BR': 'o que é?', en: 'what is it?', es: '¿qué es?' } },
  { id: 'topics', q: { 'pt-BR': 'qual o assunto?', en: 'what topics?', es: '¿qué temas?' } }
];

// Encontros marcados. "end" = primeiro dia em que o encontro já passou (00:00 local).
// Sem encontro futuro, quando/onde/assunto respondem noEvent. Ao marcar outro, some um item aqui.
window.ASK_EVENTS = [{ end: '2026-10-17' }];
window.ASK_EVENT_IDS = ['when', 'where', 'topics'];
window.ASK_NO_EVENT = {
  'pt-BR': 'Aguarde o anúncio do próximo encontro. Veja a lista de encontros acima.',
  en: 'Wait for the next meeting to be announced. See the list of meetings above.',
  es: 'Espera el anuncio del próximo encuentro. Mira la lista de encuentros arriba.'
};
