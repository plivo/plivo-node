var Plivo =  require('../dist/rest/client.js');
var response = new Plivo.Response();

const speak = response.addSpeak('hello', {
  voice: "Polly.Aditi",
  language: 'en-IN',
});

speak.addLang('आप लोग कैसे हो', {
  'xml:lang': 'hi-IN',
});

const emphasis = speak.addEmphasis('emphasis', {
  'level': 'x-strong',
})
emphasis.addBreak();
emphasis.addLang('language!!!');

// Mixed-content without tag
speak.addText('extra text');

speak.addLang('how are you people?', {
  'xml:lang': 'en-IN',
});

speak.addSayAs('30101996', {
    'interpret-as': 'date',
    'format': 'dmy'
});

speak.addLang('well well well').addBreak();

speak.addLang('no no no');

speak.addProsody('कैसे हो');

speak.addSayAs('S A Y A S', {
  'interpret-as': 'characters',
});

speak.addP('this is p tag');

speak.addPhoneme('this is Phoneme', {
  'alphabet': 'ipa',
});

speak.addS('this is s tag');

speak.addSub('Hg', {
  alias: 'Mercury',
});

speak.addText('Past of read is')

speak.addW('read', {
  'role': 'amazon:VBD',
});

console.log(response.toXML());