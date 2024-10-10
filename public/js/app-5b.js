function lookupWord() {
  const form = document.getElementById("lookup-form");
  form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(event.target);
      const word = data.get("word");

      const options = {
          method: 'GET',
      };

      document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;

      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
          .then(response => response.json())
          .then(data => {
            console.log(data);
              data = {
                  word: data[0].word,
                  phonetic: data[0].phonetic,
                  partOfSpeech: data[0].meanings[0].partOfSpeech + " and " + data[0].meanings[1].partOfSpeech,
                  definitions: data[0].meanings[0].definitions
              };
              renderTemplate("#results-template", data);
              // const template = document.getElementById('results-template').innerText;
              // const compiledFunction = Handlebars.compile(template);
              // document.getElementById('results').innerHTML = compiledFunction(data);
          });
  });;
}

function renderTemplate(templateId, context) {
  const templateSource = $(templateId).html();
  const template = Handlebars.compile(templateSource);
  $('#app').html(template(context));
  }

// tag::router[]
window.addEventListener('load', () => {
const app = $('#app');

const defaultTemplate = Handlebars.compile($('#default-template').html());
const dictionaryTemplate = Handlebars.compile($('#dictionary-template').html());
const thesaurusTemplate = Handlebars.compile($('#thesaurus-template').html());
const formTemplate = Handlebars.compile($('#form-template').html());

const router = new Router({
  mode:'hash',
  root:'app-5b.html',
  page404: (path) => {
    const html = defaultTemplate();
    app.html(html);
  }
});

router.add('/dictionary', async () => {
  // html = dictionaryTemplate();
  // app.html(html);
  renderTemplate('#form-template', {title: "Dictionary"});
});

router.add('/thesaurus', async () => {
  html = thesaurusTemplate();
  app.html(html);
});

router.addUriListener();

$('a').on('click', (event) => {
  event.preventDefault();
  const target = $(event.target);
  const href = target.attr('href');
  const path = href.substring(href.lastIndexOf('/'));
  router.navigateTo(path);
});

router.navigateTo('/');
});

// end::router[]