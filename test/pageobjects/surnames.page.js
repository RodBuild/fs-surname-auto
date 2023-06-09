import Page from '../../../Source/page.mjs'; // Local
// import Page from 'fs-auto-page'; // Online
import * as dotenv from 'dotenv';
dotenv.config();

class SurnamesPage extends Page {
  /* OPEN STATEMENTS */
  /**
   * Open the beginning page
   * for the **surnames** experience
   */
  OpenBeginPage() {
    // return browser.url('https://beta.familysearch.org/surnames');
    return browser.url('en/surnames');
  }
  /**
   * Open the results page
   * for the **surnames** experience
   * by using default surnames of
   * - Ramirez
   * - Ruiz
   */
  OpenResultsPage() {
    // return browser.url('https://beta.familysearch.org/surnames');
    return browser.url('en/surnames?surname1=Ramirez&surname2=Ruiz');
  }
  /**
   * ### PREFERED
   * Navigate to specific page by
   * using the baseURL path
   * @param url target url to open. Ex:
   * - 'en/surnames/
   * - 'apellidos
   * - it/surnames
   */
  OpenPage(url) {
    return browser.url(url);
  }
  /**
   * ### NOT RECOMMENDED
   * Navigate to specific URL
   * @param url target url to open
   */
  OpenURL(url) {
    return browser.url(url);
  }

  /* SEARCH STATEMENTS */
  /**
   * Use the passed params to make a search
   * @param lname1 first last name to search
   * @param lname2 second last name to search
   */
  async SearchLastNames(lname1, lname2) {
    // Pause and Wait for elements to load
    await browser.waitUntil(
      async function () {
        return await (await $('main form')).isExisting();
      },
      { timeoutMsg: 'ERROR: Input fields were not found' }
    );

    await (await $('[data-testid="your-last-name-field"]')).setValue(lname1);
    await (await $('[data-testid="friend-last-name-field"]')).setValue(lname2);
    await (await $('[data-testid="surnames-search-button"]')).click();
  }

  /* CHECK STATEMENTS */

  /**
   * Check if the current page contains
   * specific values
   * @param text value to be present in url
   */
  async CheckUrlContains(text) {
    await expect(browser).toHaveUrlContaining(text);
  }
  /**
   * #### Begin Page
   * Check if h1 element contains the
   * passed value
   *
   * @param text value to be present in h1
   */
  async CheckBeginPageHeader(text) {
    await expect(await $('h1')).toHaveTextContaining(text);
  }
  /**
   * #### Begin Page
   * Check if main button element contains the
   * passed value
   *
   * @param text value to be present in button
   */
  async CheckBeginPageButton(text) {
    await expect(await $('[data-testid="surnames-search-button"]')).toHaveTextContaining(text);
  }
  /**
   * #### Results Page
   * Check if h1 element contains the
   * passed value
   *
   * @param text value to be present in h1
   */
  async CheckResultsPageHeader(text) {
    await expect(await $('h1')).toHaveTextContaining(text);
  }
  /**
   * #### Results Page
   * Check if main button element contains the
   * passed value
   *
   * @param text value to be present in button
   */
  async CheckResultsPageButton(text) {
    await expect(await $('[data-testid="surnames-search-button"]')).toHaveTextContaining(text);
  }
  /**
   * Use the passed params to check if the 3 first
   * h2 elements were updated
   * @param lname1 first last name to check
   * @param lname2 second last name to check
   */
  async CheckResultskHeadersFast(lname1, lname2) {
    // Pause and Wait for elements to load
    await browser.pause(1000);
    await browser.waitUntil(
      async function () {
        return await (await $$('main > div > div > div > div'))[6].isExisting();
      },
      {
        timeoutMsg: 'ERROR: H2 elements in results page were not found',
      }
    );

    const h2 = await $$('h2');

    // First header should only have the lastname 1
    await expect(h2[0]).toHaveTextContaining(lname1);
    // Second header should only have the lastname 2
    await expect(h2[1]).toHaveTextContaining(lname2);
    // Third header should have both lastnames
    await expect(h2[2]).toHaveTextContaining(lname1 && lname2);
  }
}

export default new SurnamesPage();
