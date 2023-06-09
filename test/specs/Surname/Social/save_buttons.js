/*
 * Title: Share Buttons
 *
 * Purpouse:
 *    1. Test the funcionality of buttons print or download
 *       the results. Any component allows the user to save
 *       the results in their local machines
 * Steps:
 *    1. Click print and check contents
 *    2. Click Download and check contents
 *
 * Author: Rodrigo Rodriguez
 */
import SurnamePage from '../../../pageobjects/surname.page.js';

describe('Test print button', async () => {
  const surname = 'Gonzalez';
  it('Should open the "Print" window', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.GetPrintButton().click();
    await SurnamePage.CheckUrlContains(`surname=${surname}&print`);
  });
  it('Should open the "Download" window', async () => {
    await SurnamePage.SearchLastName(surname);
    let downloadBtn = await $$('[data-testid="social-menu"] > div > a')[0];
    await SurnamePage.OpenRoute(await downloadBtn.getAttribute('href'));
    await expect(await $('img')).toExist();
  });
});
