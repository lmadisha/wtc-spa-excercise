// Define the routes
const routes = {
    '/dictionary': renderDictionary,
    '/synonym': renderSynonym,
    '/antonym': renderAntonym,
    };
// Initialize the router with routes
const router = new Router(routes);
// Function to handle route changes
function handleRouteChange() {
    const hash = location.hash.slice(1);
    router.navigate(hash || '/dictionary'); // Default to '/dictionary' if no hash
    }
// Render the dictionary form and handle submission
function renderDictionary() {
    renderTemplate('form-template', { title: 'Dictionary Lookup' });
    setupFormSubmission('dictionary');
    }
// Render the synonym form and handle submission
function renderSynonym() {
    renderTemplate('form-template', { title: 'Synonym Lookup' });
    setupFormSubmission('synonym');
    }
// Render the antonym form and handle submission
function renderAntonym() {
    renderTemplate('form-template', { title: 'Antonym Lookup' });
    setupFormSubmission('antonym');
    }
// Common function to setup form submission
function setupFormSubmission(type) {
    $('#lookup-form').off('submit').on('submit', function(event) {
    event.preventDefault();
    const word = $(this).find('input[name="word"]').val();
    fetchWordData(word, type);
    });
    }
// Fetch word data from an API
function fetchWordData(word, type) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    $.get(url, function(data) {
    const result = parseApiResponse(data);
    renderTemplate('results-template', result);
    }).fail(function() {
    $('#results').html('<p>Error retrieving data. Please try again.</p>');
    });
    }
// Parse the API response
function parseApiResponse(data) {
    const wordData = data[0];
    return {
    word: wordData.word,
    phonetic: wordData.phonetic,
    audio: wordData.phonetics[0]?.audio,
    definitions: wordData.meanings.flatMap(meaning => meaning.definitions),
    };
    }
    // Render the Handlebars template
function renderTemplate(templateId, context) {
    const templateSource = $(`#${templateId}`).html();
    const template = Handlebars.compile(templateSource);
    const html = template(context);
    $('#results').html(html);
    }
// Start the router
$(window).on('hashchange', handleRouteChange);
// Trigger the router on page load
$(document).ready(handleRouteChange);