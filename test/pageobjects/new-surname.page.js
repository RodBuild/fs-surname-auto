import { expect as expectChai } from 'chai';
// import Page from '../../../Source/page.mjs'; // Local
import Page from 'fs-auto-page'; // Online
import * as dotenv from 'dotenv';
dotenv.config();

class SurnamePage extends Page {
  /*** GET STATEMENTS ***/

  /**
   * ### Returns the input field element.
   *
   * **Begin Page:** The input box on top
   *
   * **Results Page:** The input box on top
   */
  GetInputFieldTop() {
    return $$('[data-testid="your-last-name-field"]')[0];
  }
  /**
   * ### Returns the input field element.
   *
   * **Begin Page:** Element does not exist
   *
   * **Results Page:** The input box on bottom
   */
  GetInputFieldBottom() {
    return $$('[data-testid="your-last-name-field"]')[1];
  }
  /**
   * ### Returns the button search element.
   *
   * **Begin Page:** The search button on top
   *
   * **Results Page:** The search button on top
   */
  GetButtonSearchTop() {
    return $$('[data-testid="surnames-search-button"]')[0];
  }
  /**
   * ### Returns the button search element.
   *
   * **Begin Page:** Element does not exist
   *
   * **Results Page:** The search button on bottom
   */
  GetButtonSearchBottom() {
    return $$('[data-testid="surnames-search-button"]')[1];
  }
  /**
   * ### Returns the content value of meta tag
   *
   * **Any Page:** Works in any page
   */
  GetMetaDescription() {
    return $('meta[name="description"]').getAttribute('content');
  }
  /**
   * ### Returns the **DIVs** that wrap each section of the page.
   *
   * **Begin Page:** There is only one Section
   *
   * **Results Page:** There will be 5 - 7 sections depending
   *    on results.
   */
  GetResultsPageSections() {
    return $$('main > div > div > div > div');
  }

  /*** OPEN STATEMENTS ***/

  /**
   * Open the beginning page
   * for the **surname** experience
   */
  OpenBeginPage() {
    return browser.url('https://beta.familysearch.org/surname');
  }
  /**
   * Navigate to specific URL
   * @param url target url to open
   */
  OpenPage(url) {
    return browser.url(url);
  }

  /*** SEARCH STATEMENTS ***/
  /**
   * Use the passed param to make a search
   * @param lname last name to search
   */
  async SearchLastName(lname) {
    // Pause and Wait for elements to load
    await browser.waitUntil(
      async function () {
        return await (await $('main form')).isExisting();
      },
      { timeoutMsg: 'ERROR: Input fields were not found' }
    );

    await (await this.GetInputFieldTop()).setValue(lname);
    await (await this.GetButtonSearchTop()).click();
  }

  /*** CHECK STATEMENTS ***/

  /**
   * Check if the current page contains
   * specific values
   * @param text value to be present in url
   */
  async CheckUrlContains(text) {
    await expect(browser).toHaveUrlContaining(text);
  }
  /**
   * Check if the current page contains
   * specified title
   * @param text value to be present in title
   */
  CheckTitleContains(text) {
    return expect(browser).toHaveTitleContaining(text);
  }
  /**
   * Check if the current page contains
   * specified text in the meta tag
   * @param text value to be present in meta tag
   */
  async CheckMetaDescriptionContains(text) {
    return expectChai(await this.GetMetaDescription()).to.contain(`${text}`);
  }
  /**
   * #### Any Page
   * Check if **h1** element contains the
   * passed value
   *
   * @param text value to be present in url
   */
  async CheckPageHeader(text) {
    await expect(await $('h1')).toHaveTextContaining(text);
  }
  /**
   * #### Any Page
   * Check if main search button (top) element
   * contains the passed value
   *
   * @param text value to be present in url
   */
  // REVISE ?????
  async CheckPageSearchButton(text) {
    await expect(await this.GetButtonSearchTop()).toHaveTextContaining(text);
  }
  /**
   * #### Results Page
   * Check if specif section **(number)** contains
   * the surname and elements that should be present
   *
   * @param number target section to be evaluated
   *    - One, Two, Three, Four, Five, Six, Seven
   * @param surname value to be present in section elements
   */
  async CheckResultsSection(number, surname) {
    const sections = await this.GetResultsPageSections();
    if (number == 'one') {
      // Pause and Wait for section to load
      await browser.waitUntil(
        async function () {
          return await sections[0].isExisting();
        },
        {
          timeoutMsg: 'ERROR: Section One was not found',
        }
      );
      const section = sections[0];

      // We check h1
      await expect(await section.$('h1')).toHaveTextContaining('Want to search a different name?');

      // We check input box
      await expect(await section.$('[data-testid="your-last-name-field"]')).toExist({
        message: 'ALERT: Input field was not found',
      });

      // We check search button
      await expect(await section.$('[data-testid="surnames-search-button"]')).toExist({
        message: 'ALERT: Search button was not found',
      });

      // We check h2
      await expect(await section.$('h2')).toHaveTextContaining('Martinez Family History');

      // We check h3
      await expect(await section.$('h3')).toHaveTextContaining('Martinez Name Meaning');

      // We check name meaning
      // 1. First <p>
      await expect(
        await section.$$('[data-testid="surnamedefinition"] > p')[0]
      ).toHaveTextContaining('Some characteristic forenames');
      // 2. Second <p>
      await expect(
        await section.$$('[data-testid="surnamedefinition"] > p')[1]
      ).toHaveTextContaining('Spanish (Martínez)');

      // We check copyright
      await expect(await section.$('p[data-inline-text="true"] > span')).toHaveTextContaining(
        'Dictionary of American Family Names © Patrick Hanks 2003, 2006.'
      );

      // End
    } else if (number == 'two') {
      // Pause and Wait for section to load
      await browser.waitUntil(
        async function () {
          return await sections[1].isExisting();
        },
        {
          timeoutMsg: 'ERROR: Section Two was not found',
        }
      );
      const section = sections[1];

      // We check h2
      await expect(await section.$('h2')).toHaveTextContaining('Martinez is most likely found in:');

      // End
    } else if (number == 'three') {
      // Pause and Wait for section to load
      await browser.waitUntil(
        async function () {
          return await sections[2].isExisting();
        },
        {
          timeoutMsg: 'ERROR: Section Three was not found',
        }
      );
      const section = sections[2];

      const maps = section.$$('[last-row-align="left"] > div');

      // We check map 1
      const map1 = maps[0];
      // 1. It has SVG
      await expect(await map1.$('svg')).toExist({
        message: 'ALERT: Country #1 SVG was not found',
      });
      // 2. It has country name
      await expect(await map1.$('h3')).toExist({
        message: 'ALERT: Country #1 NAME was not found',
      });
      // 3. It has # of people description
      await expect(await map1.$('p')).toExist({
        message: 'ALERT: Country #1 DESCRIPTION was not found',
      });

      // We check map 2
      const map2 = maps[1];
      // 1. It has SVG
      await expect(await map2.$('svg')).toExist({
        message: 'ALERT: Country #2 SVG was not found',
      });
      // 2. It has country name
      await expect(await map2.$('h3')).toExist({
        message: 'ALERT: Country #2 NAME was not found',
      });
      // 3. It has # of people description
      await expect(await map2.$('p')).toExist({
        message: 'ALERT: Country #2 DESCRIPTION was not found',
      });

      // We check map 3
      const map3 = maps[2];
      // 1. It has SVG
      await expect(await map3.$('svg')).toExist({
        message: 'ALERT: Country #3 SVG was not found',
      });
      // 2. It has country name
      await expect(await map3.$('h3')).toExist({
        message: 'ALERT: Country #3 NAME was not found',
      });
      // 3. It has # of people description
      await expect(await map3.$('p')).toExist({
        message: 'ALERT: Country #3 DESCRIPTION was not found',
      });

      // We check link at the bottom
      await expectChai((await section.$$('[data-testid="social-menu"] > div')).length).to.equal(
        5,
        'ALERT: Social links quantity should be 5'
      );

      // End
    } else if (number == 'four') {
    } else if (number == 'five') {
    } else if (number == 'six') {
    } else if (number == 'seven') {
    } else {
      throw new Error('ERROR: CheckResultsSection() Section number is not valid.');
    }
  }
  /**
   * #### Results Page
   * Check if the last name is present on the **h2**
   * elements of the results page
   *
   * @param lname vale to be present
   */
  async CheckResultskHeadersFast(lname) {
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

    // First header should include lastname
    await expect(h2[0]).toHaveTextContaining(lname);
    // Second header should include lastname
    await expect(h2[1]).toHaveTextContaining(lname);
    // Third header should include lastname
    await expect(h2[2]).toHaveTextContaining(lname);
    // Fourth header should include lastname
    await expect(h2[3]).toHaveTextContaining(lname);
    // Fifth header should include lastname
    await expect(h2[4]).toHaveTextContaining(lname);
  }
}
export default new SurnamePage();
