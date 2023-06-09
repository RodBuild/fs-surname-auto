/*
 * Title: App Begin Routing
 *
 * Purpouse:
 *    Make sure the surname experience re-routes
 *    to the correct URL. Some URL were made to change
 *    the language of the page.
 *
 * Author: Rodrigo Rodriguez
 */

import SurnamesPage from '../../../pageobjects/surnames.page.js';

describe('Test BEGIN PAGE URL routing for specific routes', () => {
  it('Should route from /surnames to /en/surnames', async () => {
    await SurnamesPage.OpenBeginPage();
    await SurnamesPage.CheckUrlContains('/en/surnames');
    await SurnamesPage.CheckBeginPageHeader('name connection');
    await SurnamesPage.CheckBeginPageButton('FIND');
  });
  it('Should route from /home/surnames to /en/surnames', async () => {
    await SurnamesPage.OpenPage('/home/surnames');
    await SurnamesPage.CheckUrlContains('/en/surnames');
    await SurnamesPage.CheckBeginPageHeader('name connection');
    await SurnamesPage.CheckBeginPageButton('FIND');
  });
  it('Should route from /en/home/surnames to /en/surnames', async () => {
    await SurnamesPage.OpenPage('/en/home/surnames');
    await SurnamesPage.CheckUrlContains('/en/surnames');
    await SurnamesPage.CheckBeginPageHeader('name connection');
    await SurnamesPage.CheckBeginPageButton('FIND');
  });
  it('Should route from /apellidos to /es/surnames', async () => {
    await SurnamesPage.OpenPage('/apellidos');
    await SurnamesPage.CheckUrlContains('/es/surnames');
    await SurnamesPage.CheckBeginPageHeader('una conexión');
    await SurnamesPage.CheckBeginPageButton('BUSCAR');
  });
  it('Should route from /sobrenomes to /pt/surnames', async () => {
    await SurnamesPage.OpenPage('/sobrenomes');
    await SurnamesPage.CheckUrlContains('/pt/surnames');
    await SurnamesPage.CheckBeginPageHeader('conexão com');
    await SurnamesPage.CheckBeginPageButton('PROCURAR');
  });
});
