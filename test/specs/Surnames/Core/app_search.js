/*
 * Title: App Search
 *
 * Purpouse:
 *    Quick test for the surname experience,
 *    check on the most simple changes. Further
 *    component testing shall be done on the
 *    functionality folder
 *
 * Author: Rodrigo Rodriguez
 */

import SurnamesPage from '../../../pageobjects/surnames.page.js';

describe('Test SURNAMES SEARCH for Martinez and Gomez', () => {
  it('Should open the begin page', async () => {
    await SurnamesPage.OpenBeginPage();
    await SurnamesPage.CheckBeginPageHeader('name connection');
    await SurnamesPage.CheckBeginPageButton('FIND');
  });
  it('Should add 1st and 2nd lastname, then make a search', async () => {
    await SurnamesPage.SearchLastNames('Martinez', 'Gomez');
    // await browser.pause(5000);
  });
  it('Should navigate to results page', async () => {
    await SurnamesPage.CheckUrlContains('surname1=Martinez&surname2=Gomez');
  });
  it('Should update the 3 first h2 elements', async () => {
    await SurnamesPage.CheckResultskHeadersFast('Martinez', 'Gomez');
  });
});
