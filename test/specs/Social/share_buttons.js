/*
 * Title: Share Buttons
 *
 * Purpouse:
 *    1. Test the funcionality of buttons that re-direct the
 *       user to an external social page (social buttons)
 * Steps:
 *    1. Click Facebook button and check results
 *    2. Click Messenger button and check results
 *    3. Click Twitter button and check results
 *    4. Click WhatsApp button and check results
 *
 * Author: Rodrigo Rodriguez
 */
import SurnamePage from '../../pageobjects/surname.page.js';

describe('Test share buttons', () => {
  const surname = 'Martinez';
  it('Should open a Facebook window', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.GetSocialButton('fb').click();
    await SurnamePage.fbLogin();
    await SurnamePage.PauseLong();
    await SurnamePage.CloseExtraWindows();
  });
  it('Should open a Messenger window', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.GetSocialButton('ms').click();
    await SurnamePage.fbLogin();
    await SurnamePage.CheckSocialWindow('ms', surname);
    await SurnamePage.CloseExtraWindows();
  });
  it('Should open a Twitter window', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.GetSocialButton('tw').click();
    await SurnamePage.twLogin();
    await SurnamePage.CheckSocialWindow('tw', surname);
    await SurnamePage.CloseExtraWindows();
  });
  it('Should open a WhatsApp window', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.GetSocialButton('wh').click();
    await SurnamePage.CheckSocialWindow('wh', surname);
    await SurnamePage.CloseExtraWindows(surname);
  });
});
