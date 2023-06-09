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

describe('Test ONE-SEARCH BEGIN page components', () => {
  it('Should have the advanced search button', async () => {
    await OneSearchPage.OpenBeginPage();
    await OneSearchPage.ExistsAdvSearchButton();
  });
  it('Should have the birth year calculator button', async () => {
    await OneSearchPage.ExistsCalculatorButton();
  });
});

describe('Test ONE-SEARCH RESULTS page components using last name Jones', () => {
  it('Should have a 5-link tab bar (ALL, FAMILY, HISTORICAL, MEMORIES, LAST NAME)', async () => {
    await OneSearchPage.OpenResultsPage('Jones');
    await OneSearchPage.ExistsTabList();
  });
  it('Should have the correct elements in section #1 (Family)', async () => {
    await OneSearchPage.CheckResultsSectionsFast('one');
  });
  it('Should have the correct elements in section #2 (Historical)', async () => {
    await OneSearchPage.CheckResultsSectionsFast('two');
  });
  it('Should have the correct elements in section #3 (Memories)', async () => {
    await OneSearchPage.CheckResultsSectionsFast('three');
  });
  it('Should have the correct elements in section #4 (Last Name)', async () => {
    await OneSearchPage.CheckResultsSectionsFast('four');
  });
});
