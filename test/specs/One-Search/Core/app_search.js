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

import OneSearchPage from '../../../pageobjects/one-search.page.js';

describe('Test SURNAME SEARCH in begin page for Castillo', () => {
  it('Should open the begin page', async () => {
    await OneSearchPage.OpenBeginPage();
    await OneSearchPage.CheckBeginPageHeader('Start discovering');
    await OneSearchPage.CheckSearchButton('SEARCH');
  });
  it('Should add a last name, then make a search', async () => {
    await OneSearchPage.SearchLastName('Castillo');
  });
  it('Should navigate to the results page', async () => {
    await OneSearchPage.CheckUrlContains('q.surname=Castillo');
    await OneSearchPage.CheckTitleContains('Discovery Search Results');
  });
});

describe('Test SURNAME SEARCH in results page for Brown', () => {
  it('Should add a last name and then make a search', async () => {
    await OneSearchPage.SearchLastName('Brown');
  });
  it('Should navigate to the results page', async () => {
    await OneSearchPage.CheckUrlContains('q.surname=Brown');
    await OneSearchPage.CheckTitleContains('Discovery Search Results');
  });
});
