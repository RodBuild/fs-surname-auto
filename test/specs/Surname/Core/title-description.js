/*
 * Title: Titlle Update
 *
 * Purpouse:
 *    Validate that the surname page has the
 *    propert title and description
 *
 * Story:
 *    https://www5.v1host.com/FH-V1/story.mvc/Summary?oidToken=Story%3a2064739
 *
 * Author: Rodrigo Rodriguez
 */

import SurnamePage from '../../../pageobjects/new-surname.page.js';

describe('Title-Description Core', () => {
  it('Should have the correct title when in the home page', async () => {
    await SurnamePage.OpenBeginPage();
    await SurnamePage.CheckTitleContains(
      'Last Name Meanings and Origins • Search Your Surname at FamilySearch'
    );
  });
  it('Should have the correct description tag', async () => {
    await SurnamePage.CheckMetaDescriptionContains(
      'Enter your surname and begin learning its origins, your potential family lineage, and where your ancestors most likely came from. Find out more today.'
    );
  });
  it('Should have the correct title when in the results page', async () => {
    await SurnamePage.SearchLastName('Garcia');
    await SurnamePage.CheckTitleContains(
      `Garcia Name Meaning and Garcia Family History at FamilySearch`
    );
  });
});
