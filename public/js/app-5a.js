const defaultRouteHandler = () => {
    document.getElementById('app').innerHTML = '<p>Click on a menu item.</p>'
  };
  
  const thesaurusRouteHandler = () => {
    document.getElementById('app').innerHTML = `
            <h1>Thesaurus</h1>
            <p>Coming soon!</p>
            <br/>`;
  };
  
  const dictionaryRouteHandler = () => {
    document.getElementById('app').innerHTML =  `
      <h1>Dictionary</h1>
      <br/>
      <form id="lookup-form">
        <input name="word" type="text" required/>
        <input name="submit" type="submit" value="Lookup"/>
      </form>
      <br/>
      <div id="results"></div>`;
    lookupWord();
  };

const routes = [
    { path: "/dictionary", handler: dictionaryRouteHandler },
    { path: "/thesaurus", handler: thesaurusRouteHandler }
  ];
  
  const router = () => {
    const path = location.hash.slice(1).toLowerCase() || '/';
    const { handler = defaultRouteHandler } = routes.find(r => r.path == path) || {};
    handler();
  };


window.addEventListener('load', router);
window.addEventListener('hashchange', router);


