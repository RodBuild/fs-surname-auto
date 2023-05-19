/*
 * Title: App Languages
 *
 * Purpouse:
 *    Check th content inside the page base
 *    of the selected language
 *
 * Author: Rodrigo Rodriguez
 */
import SurnamePage from '../pageobjects/surname.page.js';

describe('Test URL routing for each available language', async () => {
  it('Should successfully route in the main page', async () => {
    await SurnamePage.OpenBeginPage();
    const lang = await SurnamePage.GetAvailableLanguages();
    // Starting point for test
    let x = 0;
    while (x < lang.length) {
      await SurnamePage.ChangeLang(await lang[x]);
      await SurnamePage.CheckMainLanguageAuto(lang[x]);
      await SurnamePage.CheckUrlContains(`${lang[i]}/surname`);
      x++;
    }
  });
  it('Should successfully route in the results page', async () => {
    await SurnamePage.SearchLastName('Perez');
    const lang = await SurnamePage.GetAvailableLanguages();
    for (let i = 0; i < lang.length; i++) {
      await SurnamePage.ChangeLang(await lang[i]);
      await SurnamePage.CheckUrlContains(`${lang[i]}/surname`);
      await SurnamePage.CheckUrlContains(`Perez`);
    }
  });
});
