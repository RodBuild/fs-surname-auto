// Check for result's card
// Print: // Check url // Browser Print screen (print || save) then cancel

// One Search (lil kid): Make sure result's page has the right content

/*
 * Title: App Components
 *
 * Purpouse:
 *    Test links and components found in the
 *    results page of the surname experience
 *
 * Author: Rodrigo Rodriguez
 */
import SurnamePage from '../pageobjects/surname.page.js';

describe('Test components found in the app', () => {
  const surname = 'Martinez';
  it('Should open the menu when print button is pressed', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.GetPrintButton().click();
    await SurnamePage.CheckUrlContains(`surname=${surname}&print`);
  });
  it('Should search a new lastname using the top search bar', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.PauseShort();
    const newsurname = await SurnamePage.GetRandomLastName();
    await SurnamePage.SearchLastNameTopBar(newsurname);
    await SurnamePage.CheckUrlContains(newsurname);
  });
  it('Should open a window to share coutries in Facebook', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.PauseShort();
    await SurnamePage.GetSocialButton('fb').click();
    await SurnamePage.fbLogin();
    await SurnamePage.CheckSocialWindow('fb', surname);
    await SurnamePage.CloseExtraWindows();
    // await SurnamePage.PauseMedium();
  });
  it('Should open a window to share coutries in Messenger', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.PauseShort();
    await SurnamePage.GetSocialButton('ms').click();
    await SurnamePage.fbLogin();
    await SurnamePage.CheckSocialWindow('ms', surname);
    await SurnamePage.CloseExtraWindows();
  });
  it('Should open a window to share countries in Twitter', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.PauseShort();
    await SurnamePage.GetSocialButton('tw').click();
    // Maybe create a function that logs you into twitter :)
    // await SurnamePage.PauseMedium();
    await SurnamePage.CheckSocialWindow('tw', surname);
    await SurnamePage.CloseExtraWindows(surname);
  });
  //   TODO: WHEN CHECKING
  it('Should open a window to share countries in WhatsApp', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.PauseShort();
    await SurnamePage.GetSocialButton('wh').click();
    await SurnamePage.CheckSocialWindow('wh', surname);
    await SurnamePage.CloseExtraWindows(surname);
  });
  it('Should search the last name using one search section', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.PauseShort();
    await SurnamePage.GetOneSearchButton().click();
    await SurnamePage.PauseShort();
    await SurnamePage.CheckUrlContains(`surname=${surname}`);
    await SurnamePage.CheckElementContains(
      await $('h4'),
      `Family Tree profiles found for ${surname}`
    );
  });
  it('Should search more ancestors using the discover section ', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.PauseShort();
    await SurnamePage.GetDiscoverButton().click();
    await SurnamePage.PauseShort();
    await SurnamePage.CheckUrlContains(`surname=${surname}`);
    await SurnamePage.CheckElementContains(
      await $('h4'),
      `Family Tree profiles found for ${surname}`
    );
  });
  it('Should login to access the records section', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.PauseShort();
    await SurnamePage.fsLogin();
  });
  it('Should search census records using the records section ', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.PauseShort();
    await SurnamePage.GetRecordButton('cs').click();
    await SurnamePage.CheckUrlContains(`surname=${surname}`);
    await SurnamePage.CheckUrlContains(`collectionType=0`);
    await SurnamePage.CheckElementContains(await $('h1'), `Historical Records for ${surname}`);
  });
  it('Should search migration records using the records section ', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.PauseShort();
    await SurnamePage.GetRecordButton('mg').click();
    await SurnamePage.CheckUrlContains(`surname=${surname}`);
    await SurnamePage.CheckUrlContains(`collectionType=4`);
    await SurnamePage.CheckElementContains(await $('h1'), `Historical Records for ${surname}`);
  });
  it('Should search militar records using the records section ', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.PauseShort();
    await SurnamePage.GetRecordButton('mt').click();
    await SurnamePage.CheckUrlContains(`surname=${surname}`);
    await SurnamePage.CheckUrlContains(`collectionType=5`);
    await SurnamePage.CheckElementContains(await $('h1'), `Historical Records for ${surname}`);
  });
  it('Should search a new lastname using the bottom search bar', async () => {
    await SurnamePage.SearchLastName(surname);
    await SurnamePage.PauseShort();
    const newsurname = await SurnamePage.GetRandomLastName();
    await SurnamePage.SearchLastNameBottomBar(newsurname);
    await SurnamePage.CheckUrlContains(newsurname);
  });
});
