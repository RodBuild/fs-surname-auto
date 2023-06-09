/*
 * Title: Similar Names
 *
 * Purpouse:
 *    Test that similar names element exists
 *
 * Rules:
 *    1. No more than 5 similar names
 *
 * Author: Rodrigo Rodriguez
 */
import SurnamePage from '../../../pageobjects/surname.page.js';

describe('Similar Names Functionality', () => {
  it('Test for 5+ results', async () => {
    await SurnamePage.OpenURL('https://beta.familysearch.org/surname');
    await SurnamePage.SearchLastName('James');
    const simNames = await $$(
      'main > div > div > div > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div [wrap=true]'
    )[1].$$('div');
    await expect(simNames.length).toBeLessThanOrEqual(5);
    // await console.log('test11: ' + simNames.length);
    // https://beta.familysearch.org/en/surname?surname=james
  });
  it('Test for 2+ results', async () => {
    await SurnamePage.OpenURL('https://beta.familysearch.org/surname');
    await SurnamePage.SearchLastName('Martes');
    const simNames = await $$(
      'main > div > div > div > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div [wrap=true]'
    )[1].$$('div');
    await expect(simNames.length).toBeLessThanOrEqual(5);
  });
  it('Test for 0 results', async () => {
    await SurnamePage.OpenURL('https://beta.familysearch.org/surname');
    await SurnamePage.SearchLastName('Armenda');
    // If the parent element does not exist, we can assume
    // there is no "similar names" element
    const simNames = await $$(
      'main > div > div > div > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div [wrap=true]'
    )[1];
    await expect(simNames).toBe(undefined);
  });
});
