/*
 * Title: App Languages
 *
 * Purpouse:
 *    Check the contents inside the page depending
 *    of the selected language
 *
 * Author: Rodrigo Rodriguez
 */
import SurnamePage from '../pageobjects/surname.page.js';

describe('Test URL routing for each available language', async () => {
  let langs = [];
  it('Should retrieve all of the available languages', async () => {
    await SurnamePage.OpenBeginPage();
    await SurnamePage.PauseShort();
    langs = await SurnamePage.GetAvailableLanguages();
  });
  it('Should successfully route in the main page', async () => {
    let x = 0;
    try {
      while (x < langs.length) {
        await SurnamePage.ChangeLang(await langs[x]);
        if (x === langs.length - 1) await SurnamePage.PauseShort();
        await SurnamePage.CheckMainLanguageAuto(langs[x]);
        await SurnamePage.CheckUrlContains(`${langs[x]}/surname`);
        await x++;
      }
    } catch (err) {
      await console.log('err: ' + err);
    }
    await SurnamePage.PauseShort();
  });

  it('Should successfully route in the results page', async () => {
    await SurnamePage.SearchLastName('Perez');
    await SurnamePage.PauseLong();
    try {
      for (let i = 0; i < langs.length; i++) {
        // if (browser.getUrl() === '')
        await SurnamePage.ChangeLang(await langs[i]);
        // await SurnamePage.PauseShort();
        await SurnamePage.CheckResultsLanguageAuto(langs[i]);
        await SurnamePage.CheckUrlContains(`${langs[i]}/surname`);
        await SurnamePage.CheckUrlContains(`Perez`);
      }
    } catch (err) {
      await console.log('err: ' + err);
    }
  });
});
