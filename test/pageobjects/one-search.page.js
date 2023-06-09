import { expect as expectChai } from 'chai';
// import Page from '../../../Source/page.mjs'; // Local
import Page from 'fs-auto-page'; // Online
import * as dotenv from 'dotenv';
dotenv.config();

class OneSearchPage extends Page {
  /***
   *
   * GET STATEMENTS
   *
   * ***/
  /**
   * ### Returns the button search element.
   *
   * **Begin Page:** The search button on top
   *
   * **Results Page:** The search button on top
   */
  GetButtonSearch() {
    return $('[data-testid="refine-search-form-search-button"]');
  }
  /**
   * ### Returns the button calculator element.
   *
   * **Begin Page:** The calculator button on top
   *
   * **Results Page:** The calculator button on top
   */
  GetButtonCalculator() {
    return $('[data-testid="show-birth-year-calculator-button"]');
  }
  /**
   * ### Returns the input firstname element.
   *
   * **Begin Page:** The first name input on top
   *
   * **Results Page:** The first name input on top
   */
  GetInputFirstName() {
    return $('[data-testid="name-field1"]');
  }
  /**
   * ### Returns the input lastname element.
   *
   * **Begin Page:** The last name input on top
   *
   * **Results Page:** The last name input on top
   */
  GetInputLastName() {
    return $('[data-testid="name-field2"]');
  }
  /**
   * ### Returns the input place element.
   *
   * **Begin Page:** The place lived input on top
   *
   * **Results Page:** The place lived input on top
   */
  GetInputPlace() {
    return $('[data-testid="place-field"]');
  }
  /**
   * ### Returns the input year element.
   *
   * **Begin Page:** The birth year input on top
   *
   * **Results Page:** The birth year input on top
   */
  GetInputYear() {
    return $('[data-testid="year-field"]');
  }

  /***
   *
   * OPEN STATEMENTS
   *
   * ***/
  /**
   * Open the beginning page
   * for the **one-search** experience
   */
  OpenBeginPage() {
    return browser.url('search/discovery/');
  }
  /**
   * Open the results page by searching
   * via passed lastname
   * @param lastname value to be present in url
   */
  OpenResultsPage(lastname) {
    return browser.url(`search/discovery/results/?q.surname=${lastname}`);
  }

  /***
   *
   * SEARCH STATEMENTS
   *
   * ***/
  /**
   * ### SEARCH ONLY BY LAST NAME
   * Use the passed param to make a search
   * @param lname last name to search
   */
  async SearchLastName(lname) {
    // Pause and Wait for elements to load
    await browser.waitUntil(
      async function () {
        return await (await $('main form')).isExisting();
      },
      {
        timeoutMsg: 'ERROR: Input fields were not found',
      }
    );
    await (await this.GetInputLastName()).setValue(lname);
    await (await this.GetButtonSearch()).click();
  }
  /**
   * ### SEARCH ONLY BY LAST NAME
   * Use the passed param to make a search
   * @param lname last name to search
   */
  async SearchPerson(fname, lname, place, year) {}
  /***
   *
   * CHECK STATEMENTS
   *
   * ***/
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
  async CheckTitleContains(text) {
    await expect(browser).toHaveTitleContaining(text);
  }
  /**
   * #### Begin Page
   * Check if **h1** element contains the
   * passed value
   *
   * @param text value to be present in H1
   */
  async CheckBeginPageHeader(text) {
    await expect(await $('h1')).toHaveTextContaining(text);
  }
  /**
   * #### Any Page
   * Check if main search button (top) element
   * contains the passed value
   *
   * @param text value to be present in button
   */
  async CheckSearchButton(text) {
    await expect(await this.GetButtonSearch()).toHaveTextContaining(text);
  }
  /**
   * #### Results Page
   * Quickly Check contents of
   * specified section
   *
   * @param number target section
   *    - one, two, three, four, five, six, seven
   */
  async CheckResultsSectionsFast(number) {
    //Pause and Wait for parent element to load
    await browser.waitUntil(
      async function () {
        return await (
          await $('[data-reach-tab-panels] > div > div[align-y="top"] > div > div > div')
        ).isExisting();
      },
      { timeoutMsg: 'ERROR: Sections were not found.' }
    );

    const sections = await $$(
      '[data-reach-tab-panels] > div > div[align-y="top"] > div > div > div > div > div'
    );

    if (number === 'one') {
      // Select and focus on element
      const section = sections[0];
      await section.scrollIntoView();

      // 1. We check h4 has proper text
      await expect(await section.$('h4')).toHaveTextContaining(
        'Family Tree profiles found for Jones'
      );

      // 2. We check that 2-8 tree results are displayed
      await expectChai((await section.$$('[data-testid="tree-results"] > div > div > div')).length)
        .to.be.greaterThanOrEqual(
          2,
          'ALERT: Section 1 - Tree results should display at least 2 results.\nNote: Number of results displayed variate depending on screen size'
        )
        .and.to.be.lessThanOrEqual(
          8,
          'ALERT: Section 1 - Tree results should display no more than 8 results.\nNote: Number of results displayed variate depending on screen size'
        );

      // End
    } else if (number === 'two') {
      // Select and focus on element
      const section = sections[1];
      await section.scrollIntoView();

      // 1. We check h4
      await expect(await section.$('h4')).toHaveTextContaining(
        'Historical records found for Jones'
      );
      // 2. We check that 4 historical results are displayed
      await expectChai(
        (
          await section.$$('[data-testid="hr-results"] tbody tr')
        ).length
      ).to.be.equal(4, 'ALERT: Section 2 - Historical records should display 4 results');

      // End
    } else if (number === 'three') {
      // Select and focus on element
      const section = sections[2];
      await section.scrollIntoView();

      // 1. We check h4
      await expect(await section.$('h4')).toHaveTextContaining('Memories found for Jones');

      // 2. We check that 2-8 memories results are displayed
      await expectChai(
        (
          await section.$$('[data-testid="memories-results"] > div > div > div')
        ).length
      )
        .to.be.greaterThanOrEqual(
          2,
          'ALERT: Section 3 - Memories records should display at least 2 results.\nNote: Number of results displayed variate depending on screen size'
        )
        .and.lessThanOrEqual(
          8,
          'ALERT: Section 3 - Memories records should display no more than 8 results.\nNote: Number of results displayed variate depending on screen size'
        );

      // End
    } else if (number === 'four') {
      // Select and focus on element
      const section = sections[3];
      await section.scrollIntoView();

      // 1. We check h5
      await expect(await section.$('h5')).toHaveTextContaining(
        'Last name information found for Jones'
      );
      // 2. We check preview surname's h2
      await expect(
        await section.$('[data-testid="preview-surname"] h2 > span')
      ).toHaveTextContaining('Jones');

      // End
    } else {
      throw new Error('ERROR: CheckResultsSectionFast() Section number is not valid.');
    }
  }

  /***
   *
   * EXIST STATEMENTS
   *
   * ***/
  /**
   * #### Begin Page
   * Check if Advanced Search button exists
   */
  async ExistsAdvSearchButton() {
    // Pause and Wait for element's parent
    await browser.waitUntil(
      async () => {
        return await (await $('main form > div')).isExisting();
      },
      {
        timeoutMsg: 'ERROR: Advanced Search Button was not found',
      }
    );

    await expect(await $$('main form button')[2]).toExist();
  }
  /**
   * #### Any Page
   * Check if Birth Year Calculator exists
   */
  async ExistsCalculatorButton() {
    // Since Calculator appears in both begin and results
    // it has different parent elements. Best to just wait
    // for a couple of seconds
    await browser.pause(1500);
    await expect(await this.GetButtonCalculator()).toExist();
  }
  /**
   * #### Results Page
   * Check Tab List exists and that 5 elements
   * are in within
   */
  async ExistsTabList() {
    // Wait :)
    await browser.pause(1500);
    const tabList = await $$('[role="tablist"] > div');
    await expectChai(tabList.length).to.be.equal(5, 'ERROR: Tab list should have 5 elements');
  }
}

export default new OneSearchPage();
