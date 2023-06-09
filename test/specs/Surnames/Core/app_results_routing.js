/*
 * Title: App Result Routing
 *
 * Purpouse:
 *    Make sure the surname experience re-routes
 *    to the correct URL. Some URLs changed from
 *    results? to surname?
 *
 * Author: Rodrigo Rodriguez
 */

import SurnamesPage from '../../../pageobjects/surnames.page.js';

describe('Test RESULTS PAGE URL routing with Ramirez and Ruiz last names', () => {
  it('Should route from /en/surnames/results?surname1=...&surname2=... to /en/surnames?surname1=...&surname2=...', async () => {
    await SurnamesPage.OpenResultsPage();
    await SurnamesPage.CheckUrlContains('/en/surnames?surname1=Ramirez&surname2=Ruiz');
    await SurnamesPage.CheckResultsPageHeader('Want to try different names?');
    await SurnamesPage.CheckResultsPageButton('SEARCH');
  });
});
