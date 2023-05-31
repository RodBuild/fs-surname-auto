/*
 * Title: App Languages
 *
 * Purpouse:
 *    Check the contents inside the page depending
 *    of the selected language
 *
 * Author: Rodrigo Rodriguez
 */
import { expect as expectChai } from 'chai';
import * as wdioo from '@wdio/globals';
import SurnamePage from '../../pageobjects/surname.page.js';

describe('Test Header for es, pt, it, fr', () => {
  it('Should have header links for English', async () => {
    await browser.url('https://beta.familysearch.org/en/');
    // Wait! Until element exists
    await browser.waitUntil(async function () {
      return (await (await $('header')).isExisting()) === true;
    });

    // Increase size so that header links appear
    await browser.setWindowSize(1200, 1000);
    // Header Navigation links
    const headerNav = await $('header > div:nth-child(1) nav');
    // 1. Links SHOULD exist
    await expect(await headerNav.isExisting()).toBe(true);
  });
  it('Should NOT have header links for Spanish', async () => {
    await browser.url('https://beta.familysearch.org/es/');
    // Wait! Until element exists
    await browser.waitUntil(async function () {
      return (await (await $('header')).isExisting()) === true;
    });

    // Increase size so that header links appear
    await browser.setWindowSize(1200, 1000);
    // Header Navigation links
    const headerNav = await $('header > div:nth-child(1) nav');
    // 1. Links SHOULD NOT exist
    await expect(await headerNav.isExisting()).toBe(false);
  });
  it('Should NOT have header links for French', async () => {
    await browser.url('https://beta.familysearch.org/fr/');
    // Wait! Until element exists
    await browser.waitUntil(async function () {
      return (await (await $('header')).isExisting()) === true;
    });

    // Increase size so that header links appear
    await browser.setWindowSize(1200, 1000);
    // Header Navigation links
    const headerNav = await $('header > div:nth-child(1) nav');
    // 1. Links SHOULD NOT exist
    await expect(await headerNav.isExisting()).toBe(false);
  });
  it('Should NOT have header links for Italian', async () => {
    await browser.url('https://beta.familysearch.org/it/');
    // Wait! Until element exists
    await browser.waitUntil(async function () {
      return (await (await $('header')).isExisting()) === true;
    });

    // Increase size so that header links appear
    await browser.setWindowSize(1200, 1000);
    // Header Navigation links
    const headerNav = await $('header > div:nth-child(1) nav');
    // 1. Links SHOULD NOT exist
    await expect(await headerNav.isExisting()).toBe(false);
  });
  it('Should NOT have header links for Portuguese', async () => {
    await browser.url('https://beta.familysearch.org/pt/');
    // Wait! Until element exists
    await browser.waitUntil(async function () {
      return (await (await $('header')).isExisting()) === true;
    });

    // Increase size so that header links appear
    await browser.setWindowSize(1200, 1000);
    // Header Navigation links
    const headerNav = await $('header > div:nth-child(1) nav');
    // 1. Links SHOULD NOT exist
    await expect(await headerNav.isExisting()).toBe(false);
  });
});
