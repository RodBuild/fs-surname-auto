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

import SurnamePage from '../../../pageobjects/new-surname.page.js';

describe('Test SURNAME SEARCH for Castillo', () => {
  it('Should open the begin page', async () => {
    await SurnamePage.OpenBeginPage();
    await SurnamePage.CheckPageHeader('find its meaning');
    await SurnamePage.CheckPageSearchButton('FIND');
  });
  it('Should add a last name, then make a search', async () => {
    await SurnamePage.SearchLastName('Castillo');
  });
  it('Should navigate to the results page', async () => {
    await SurnamePage.CheckUrlContains('surname=Castillo');
  });
  it('Should update the 5 of the h2 elements', async () => {
    await SurnamePage.CheckResultskHeadersFast('Castillo');
  });
});
