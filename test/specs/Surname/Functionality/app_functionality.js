/*
 * Title: App Functionality
 *
 * Purpouse:
 *    Test anything is striclty related to the surname
 *    experience. "The main purpouse of the application"
 *    The following concepts will be considered
 *    1. Behavior
 *    2. Outputs
 *    3. Inputs
 *
 * Author: Rodrigo Rodriguez
 */
import SurnamePage from '../../../pageobjects/new-surname.page.js';

describe('Test FUNCTIONALITY by searching the surname Martinez', () => {
  it('Should open the begin page', async () => {
    await SurnamePage.OpenBeginPage();
    await SurnamePage.CheckPageHeader('Enter your last name to find its meaning and origin.');
    await SurnamePage.CheckPageSearchButton('FIND');
  });
  it('Should add last name and make a search', async () => {
    await SurnamePage.SearchLastName('Martinez');
  });
  it('Should route properly after searching', async () => {
    await SurnamePage.CheckTitleContains(
      'Martinez Name Meaning and Martinez Family History at FamilySearch'
    );
    await SurnamePage.CheckUrlContains('en/surname?surname=Martinez');
  });
  it('Should update section 1 properly', async () => {
    await SurnamePage.CheckResultsSection('one', 'Martinez');
  });
  it('Should update section 2 properly', async () => {
    await SurnamePage.CheckResultsSection('two', 'Martinez');
  });
  it('Should update section 3 properly', async () => {
    await SurnamePage.CheckResultsSection('three', 'Martinez');
  });
  it('Should update section 4 properly', async () => {
    await SurnamePage.CheckResultsSection('four', 'Martinez');
  });
  it('Should update section 5 properly', async () => {
    await SurnamePage.CheckResultsSection('five', 'Martinez');
  });
  it('Should update section 6 properly', async () => {
    await SurnamePage.CheckResultsSection('six', 'Martinez');
  });
  it('Should update section 7 properly', async () => {
    await SurnamePage.CheckResultsSection('seven', 'Martinez');
  });
});

// describe('Test functionality of the app', () => {
//   const surname = 'Martinez';
//   it('Should search for a name and route properly from main page', async () => {
//     await SurnamePage.SearchLastName(`${surname}`);
//     await SurnamePage.CheckUrlContains(`surname=${surname}`);
//     await SurnamePage.PauseShort();
//   });
//   it('Should update the top section', async () => {
//     const element = await $$('h2')[0];
//     // await expect(element[0]).toHaveTextContaining(`${surname}`);
//     await SurnamePage.CheckElementContains(element, `${surname} Family History`);
//   });
//   it('Should update the countries section', async () => {
//     const element = await $$('h2')[1];
//     await SurnamePage.CheckElementContains(element, `${surname} is most likely found in`);
//   });
//   it('Should update the one search section', async () => {
//     await SurnamePage.PauseShort();
//     const element = await $$('h4')[1]; //Title
//     await SurnamePage.CheckElementContains(element, `records for the ${surname} last name`);
//     const input = await $('[data-testid="name-field2"]'); // Input Box
//     await SurnamePage.CheckInputValue(input, `${surname}`);
//   });
//   it('Should update the discover section', async () => {
//     const element = await $$('h4')[2];
//     await SurnamePage.CheckElementContains(element, `ancestors in the ${surname} family tree`);
//     await SurnamePage.ScrollMiddlePage(); // To Spawn the rest of the elements
//     const results = await $$('[data-testid="tree-results"] h4 span');
//     let x = 0;
//     // This loop check for the first 3 cards of people that show
//     while (x < 3) {
//       //   await console.log('ress: ' + (await results[x].getText()));
//       //   await expect(results[x]).toHaveTextContaining('Mart');
//       await SurnamePage.CheckElementContains(results[x], 'Mart');
//       x++;
//     }
//   });
//   it('Should update the records section', async () => {
//     const element = await $$('h4')[6];
//     await SurnamePage.CheckElementContains(element, `What ${surname} family records`);
//   });
//   //   it('Should test', async () => {
//   //     const element = await $$('h4')[7];
//   //     await SurnamePage.CheckElementContains(element, 'Search for another')
//   //   });
// });
