/*
 * Title: App Routing
 *
 * Purpouse:
 *    Make sure the surname experience re-routes
 *    to the correct URL. Some URL were made to change
 *    the language of the page.
 *
 * Author: Rodrigo Rodriguez
 */

import SurnamePage from '../pageobjects/surname.page.js';

describe('Test URL routing for specific routes', () => {
  it('Should route from /surname to /en/surname', async () => {
    await SurnamePage.OpenBeginPage();

    await SurnamePage.OpenURL('https://beta.familysearch.org/surname');
    await SurnamePage.CheckUrlContains('/en/surname');
  });
  it('Should route from /home/surname to /en/surname', async () => {
    await SurnamePage.OpenURL('https://beta.familysearch.org/home/surname');
    await SurnamePage.CheckUrlContains('/en/surname');
    await SurnamePage.CheckMainLanguage('your last name', 'FIND');
  });
  it('Should route from /apellido to /es/surname', async () => {
    await SurnamePage.OpenURL('https://beta.familysearch.org/apellido');
    await SurnamePage.CheckUrlContains('/es/surname');
    await SurnamePage.CheckMainLanguage('tu apellido', 'BUSCAR');
  });
  it('Should route from /sobrenome to /pt/surname', async () => {
    await SurnamePage.OpenURL('https://beta.familysearch.org/sobrenome');
    await SurnamePage.CheckUrlContains('/pt/surname');
    await SurnamePage.CheckMainLanguage('seu sobrenome', 'PROCURAR');
  });
});
