/*
 * Title: App Break
 *
 * Purpouse:
 *    Test procedures thay may break the integrity
 *    of the surname experience
 *
 * Author: Rodrigo Rodriguez
 */
import SurnamePage from '../pageobjects/surname.page.js';

describe('Test', () => {
  it('Try cross-site scripting', async () => {
    const script = 'Attacker"/><script>alert("Hello! I am an alert box!!");</script>';
    await SurnamePage.SearchLastName(script);
    // await SurnamePage.PauseLong();
    await SurnamePage.OpenRoute(`/surname?surname=${script}`);
  });
  it('Try to search for a name 20 times', async () => {
    await SurnamePage.OpenBeginPage();

    let lastname = await SurnamePage.GetRandomLastName();
    // await SurnamePage.SearchLastName(lastname);
    // const element = await $$('h2')[0];

    for (let i = 0; i < 19; i++) {
      await SurnamePage.SearchLastName(lastname);
      // await expect(element[0]).toHaveTextContaining(`${surname}`);
      await SurnamePage.CheckElementContains(await $$('h2')[0], `${lastname} Family History`);
      await SurnamePage.CheckElementContains(
        await $$('h2')[1],
        `${lastname} is most likely found in`
      );
      lastname = await SurnamePage.GetRandomLastName();
    }
  });
  it('Try to search for a last name with 128 characters (max)', async () => {
    const text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis convallis purus vel ligula sodales elementum. Mauris sem metus, au';
    await SurnamePage.SearchLastName(text);
  });
});
