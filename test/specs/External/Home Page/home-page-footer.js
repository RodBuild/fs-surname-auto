/*
 * Title: App Languages
 *
 * Purpouse:
 *    1. Improve SEO of FamilySearch home page
 *    2. Test that a new list was added on top of Footer
 * Steps:
 *    Note: count start from 0. 0-9 (10)
 *    1. The 8th element in main tag should not have a class (Create an account div)
 *    2. The 9th element in main tag should have a class
 *    3. The 9th element should have 3 ul elements
 *
 * Author: Rodrigo Rodriguez
 */

/**
 * @param lang es, pt, it, fr
 */

async function checkFooterLinks(lang) {
  const lists = await $$('main > div > div > div > div:nth-child(10) ul');
  let error_div = false;

  /* Genealogical Trees */
  const gentree = await lists[0].$$('a');

  for (let i = 0; i < gentree.length; i++) {
    // await console.log('test: ' + (await gentree[i].getText()));
    // Click on link
    await gentree[i].click();
    await browser.pause(3000);
    // Check if error div exists
    error_div = await (await $('[data-testid="notfound"]')).isExisting();

    // 1. Genealogical Tree
    if (i === 0) {
      if ((await browser.getUrl()) !== `https://beta.familysearch.org/tree/overview`) {
        throw new Error('ERROR: Genealogical Tree - First link has a bad URL');
      }
      if (error_div === true) {
        throw new Error('ERROR: Genealogical Tree - First link re-directs to a 404 page');
      }
    }
    // 2. Start your genealogical tree
    else if (i === 1) {
      if (
        (await browser.getUrl()) !==
        `https://beta.familysearch.org/${lang}/gettingstarted/start-your-genealogy`
      ) {
        throw new Error('ERROR: Genealogical Tree - Second link has a bad URL');
      }
      if (error_div === true) {
        throw new Error('ERROR: Genealogical Tree - Second link re-directs to a 404 page');
      }
    }
    // 3. Find your ancestors
    else if (i === 2) {
      if (
        (await browser.getUrl()) !== `https://beta.familysearch.org/blog/${lang}/find-your-family/`
      ) {
        throw new Error('ERROR: Genealogical Tree - Thrid link has a bad URL');
      }
      if (error_div === true) {
        throw new Error('ERROR: Genealogical Tree - Third link re-directs to a 404 page');
      }
    }
    // 4. Legacy
    else if (i === 3) {
      if ((await browser.getUrl()) !== `https://beta.familysearch.org/${lang}/discovery/explore/`) {
        throw new Error('ERROR: Genealogical Tree - Fourth link has a bad URL');
      }
      if (error_div === true) {
        throw new Error('ERROR: Genealogical Tree - Fourth link re-directs to a 404 page');
      }
    }

    await browser.url(`https://beta.familysearch.org/${lang}/`);
    await browser.pause(2000);
  }

  /* Genealogy */
  const genlog = await lists[1].$$('a');

  for (let i = 0; i < genlog.length; i++) {
    // Click on link
    await genlog[i].click();
    await browser.pause(3000);

    // Check if error div exists
    error_div = await (await $('[data-testid="notfound"]')).isExisting();

    // 1. Get Started
    if (i === 0) {
      if (
        (await browser.getUrl()) !==
        `https://beta.familysearch.org/${lang}/gettingstarted/start-your-genealogy`
      ) {
        throw new Error('ERROR: Genealogy - First link has a bad URL');
      }
      if (error_div === true) {
        throw new Error('ERROR: Genealogy - First link re-directs to a 404 page');
      }
    }
    // 2. Surname Page
    else if (i === 1) {
      if ((await browser.getUrl()) !== `https://beta.familysearch.org/${lang}/surname`) {
        throw new Error('ERROR: Genealogy - Second link has a bad URL');
      }
      if (error_div === true) {
        throw new Error('ERROR: Genealogy - Second link re-directs to a 404 page');
      }
    }
    // 3. DNA Testing
    else if (i === 2) {
      if ((await browser.getUrl()) !== `https://beta.familysearch.org/${lang}/home/dna-testing`) {
        throw new Error('ERROR: Genealogy - Third link has a bad URL');
      }
      if (error_div === true) {
        throw new Error('ERROR: Genealogy - Thrid link re-directs to a 404 page');
      }
    }
    // 4. Wiki
    else if (i === 3) {
      await expect(browser).toHaveUrlContaining(`familysearch.org/${lang}/wiki`, {
        message: 'ERROR: Genealogy - Fourth link has a bad URL',
      });
      if (error_div === true) {
        throw new Error('ERROR: Genealogy - Fourth link re-directs to a 404 page');
      }
    }
    // 5. Activities
    else if (i === 4) {
      if ((await browser.getUrl()) !== `https://beta.familysearch.org/${lang}/discovery/`) {
        throw new Error('ERROR: Genealogy - Fifth link has a bad URL');
      }
      if (error_div === true) {
        throw new Error('ERROR: Genealogy - Fifth link re-directs to a 404 page');
      }
    }
    // 6. Indexing
    else if (i === 5) {
      if ((await browser.getUrl()) !== `https://beta.familysearch.org/getinvolved/`) {
        throw new Error('ERROR: Genealogy - Sixth link has a bad URL');
      }
      if (error_div === true) {
        throw new Error('ERROR: Genealogy - Sixth link re-directs to a 404 page');
      }
    }

    await browser.url(`https://beta.familysearch.org/${lang}/`);
    await browser.pause(2000);
  }

  /* Free Historical Records */
  const hisrec = await lists[2].$$('a');

  for (let i = 0; i < hisrec.length; i++) {
    // Click on link
    await hisrec[i].click();
    await browser.pause(3000);
    // Check if error div exists
    error_div = await (await $('[data-testid="notfound"]')).isExisting();

    // 1. Archive
    if (i === 0) {
      if ((await browser.getUrl()) !== `https://beta.familysearch.org/${lang}/search/`) {
        throw new Error(
          `ERROR: Free Historical Records - First link has a bad URL\nLinkURL: ${await browser.getUrl()}\nExpectedURL: https://beta.familysearch.org/${lang}/search/`
        );
      }
      if (error_div === true) {
        throw new Error('ERROR: Free Historical Records - First link re-directs to a 404 page');
      }
    }

    // 2. Birth, marriage, death records
    else if (i === 1) {
      if (
        (await browser.getUrl()) !==
        `https://beta.familysearch.org/${lang}/search/collection/list/?fcs=recordType%3AVITAL&ec=recordType%3AVITAL`
      ) {
        throw new Error(
          `ERROR: Free Historical Records - Second link has a bad URL\nLinkURL: ${await browser.getUrl()}\nExpectedURL: https://beta.familysearch.org/${lang}/search/collection/list/?fcs=recordType%3AVITAL&ec=recordType%3AVITAL`
        );
      }
      if (error_div === true) {
        throw new Error('ERROR: Free Historical Records - Second link re-directs to a 404 page');
      }
    }

    await browser.url(`https://beta.familysearch.org/${lang}/`);
    await browser.pause(2000);
  }

  // await browser.pause(10000);
}

describe('Test Footer for es, pt, it, fr', () => {
  it('Should NOT have links list on top footer for English', async () => {
    await browser.url('https://beta.familysearch.org/en/');
    // Wait! Until the main target element exists
    await browser.waitUntil(async function () {
      return (await (await $('main > div > div > div')).isExisting()) === true;
    });
    // Second element up from Footer
    const mainDiv8 = await $$('main > div > div > div > div')[8];
    // First element up from Footer
    const mainDiv9 = await $$('main > div > div > div > div')[9];

    // 1. Yes class for second element
    await expect(await mainDiv8).toHaveAttribute('class');
    // 2. No Class for first element
    await expect(await mainDiv9.getAttribute('class')).toBeNull();
    // 3. Second element does not have ul elements
    await expect(await mainDiv8.$$('ul').length).toBe(0);
  });
  it('Should have links list on top footer for Spanish', async () => {
    await browser.url('https://beta.familysearch.org/es/');
    // Wait! Until the main target element exists
    await browser.waitUntil(async function () {
      return (await (await $('main > div > div > div')).isExisting()) === true;
    });
    // Second element up from Footer
    const mainDiv8 = await $$('main > div > div > div > div')[8];
    // First element up from Footer
    const mainDiv9 = await $$('main > div > div > div > div')[9];

    // 1. No class for second element
    await expect(await mainDiv8.getAttribute('class')).toBeNull();
    // 2. Yes Class for first element
    await expect(await mainDiv9).toHaveAttribute('class');
    // 3. First element has columns and each column has an ul element
    await expect(await mainDiv9.$$('ul').length).toBeGreaterThan(1);
    // 4. Check all links
    // await checkFooterLinks('es');
  });
  it('Should have links list on top footer for French', async () => {
    await browser.url('https://beta.familysearch.org/fr/');
    // Wait! Until the main target element exists
    await browser.waitUntil(async function () {
      return (await (await $('main > div > div > div')).isExisting()) === true;
    });
    // Second element up from Footer
    const mainDiv8 = await $$('main > div > div > div > div')[8];
    // First element up from Footer
    const mainDiv9 = await $$('main > div > div > div > div')[9];

    // 1. No class for second element
    await expect(await mainDiv8.getAttribute('class')).toBeNull();
    // 2. Yes Class for first element
    await expect(await mainDiv9).toHaveAttribute('class');
    // 3. First element has columns and each column has an ul element
    await expect(await mainDiv9.$$('ul').length).toBeGreaterThan(1);
    // 4. Check all links
    // await checkFooterLinks('fr');
  });
  it('Should have links list on top footer for Italian', async () => {
    await browser.url('https://beta.familysearch.org/it/');
    // Wait! Until the main target element exists
    await browser.waitUntil(async function () {
      return (await (await $('main > div > div > div')).isExisting()) === true;
    });
    // Second element up from Footer
    const mainDiv8 = await $$('main > div > div > div > div')[8];
    // First element up from Footer
    const mainDiv9 = await $$('main > div > div > div > div')[9];

    // 1. No class for second element
    await expect(await mainDiv8.getAttribute('class')).toBeNull();
    // 2. Yes Class for first element
    await expect(await mainDiv9).toHaveAttribute('class');
    // 3. First element has columns and each column has an ul element
    await expect(await mainDiv9.$$('ul').length).toBeGreaterThan(1);
    // 4. Check all links
    // await checkFooterLinks('it');
  });
  it('Should have links list on top footer for Portuguese', async () => {
    await browser.url('https://beta.familysearch.org/pt/');
    // Wait! Until the main target element exists
    await browser.waitUntil(async function () {
      return (await (await $('main > div > div > div')).isExisting()) === true;
    });
    // Second element up from Footer
    const mainDiv8 = await $$('main > div > div > div > div')[8];
    // First element up from Footer
    const mainDiv9 = await $$('main > div > div > div > div')[9];

    // 1. No class for second element
    await expect(await mainDiv8.getAttribute('class')).toBeNull();
    // 2. Yes Class for first element
    await expect(await mainDiv9).toHaveAttribute('class');
    // 3. First element has columns and each column has an ul element
    await expect(await mainDiv9.$$('ul').length).toBeGreaterThan(1);
    // 4. Check all links
    // await checkFooterLinks('pt');
  });
  it('Test that each link works using Spanish page', async () => {
    await browser.url('https://beta.familysearch.org/es/');
    // Wait! Until the main target element exists
    await browser.waitUntil(async function () {
      return (await (await $('main > div > div > div')).isExisting()) === true;
    });
    await checkFooterLinks('es');
  });
});
