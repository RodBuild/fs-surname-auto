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

import SurnamePage from '../../../pageobjects/new-surname.page.js';

describe('Test URL routing for specific routes', () => {
  it('Should route from /surname to /en/surname', async () => {
    await SurnamePage.OpenBeginPage();
    await SurnamePage.CheckUrlContains('/en/surname');
    await SurnamePage.CheckPageHeader('find its meaning');
    await SurnamePage.CheckPageSearchButton('FIND');
  });
  it('Should route from /home/surname to /en/surname', async () => {
    await SurnamePage.OpenPage('https://beta.familysearch.org/home/surname');
    await SurnamePage.CheckUrlContains('/en/surname');
    await SurnamePage.CheckPageHeader('find its meaning');
    await SurnamePage.CheckPageSearchButton('FIND');
  });
  it('Should route from /en/home/surname to /en/surname', async () => {
    await SurnamePage.OpenPage('https://beta.familysearch.org/en/home/surname');
    await SurnamePage.CheckUrlContains('/en/surname');
    await SurnamePage.CheckPageHeader('find its meaning');
    await SurnamePage.CheckPageSearchButton('FIND');
  });
  it('Should route from /apellido to /es/surname', async () => {
    await SurnamePage.OpenPage('https://beta.familysearch.org/apellido');
    await SurnamePage.CheckUrlContains('/es/surname');
    await SurnamePage.CheckPageHeader('encontrar su significado');
    await SurnamePage.CheckPageSearchButton('BUSCAR');
  });
  it('Should route from /sobrenome to /pt/surname', async () => {
    await SurnamePage.OpenPage('https://beta.familysearch.org/sobrenome');
    await SurnamePage.CheckUrlContains('/pt/surname');
    await SurnamePage.CheckPageHeader('encontrar o significado');
    await SurnamePage.CheckPageSearchButton('PROCURAR');
  });
});
