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
  });
});
