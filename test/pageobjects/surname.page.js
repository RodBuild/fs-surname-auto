import { expect as expectChai } from 'chai';
// import Page from '../../../Source/page.mjs'; // Local
import Page from 'fs-auto-page';                    // Online
import * as dotenv from 'dotenv';
dotenv.config();

class SurnamePage extends Page {
  GetTopFindButton() {
    return $$('[data-testid="surnames-search-button"]')[0];
  }
  GetTopLastNameBox() {
    return $$('[data-testid="your-last-name-field"]')[0];
  }
  GetBottomFindButton() {
    return $$('[data-testid="surnames-search-button"]')[1];
  }
  GetBottomLastNameBox() {
    return $$('[data-testid="your-last-name-field"]')[1];
  }
  GetOneSearchButton() {
    return $('[data-testid="refine-search-form-search-button"]');
  }
  GetDiscoverButton() {
    return $('[data-testid="search-results-search-button"]');
  }
  /**
   * **Census:** cs
   *
   * **Migration:** mg
   *
   * **Militar:** mt
   * @param type cs, mg, mt
   */
  GetRecordButton(type) {
    // Census
    if (type === 'cs') {
      return $('[data-testid="surname-census-collection"]');
    }
    // Migration
    else if (type === 'mg') {
      return $('[data-testid="surname-passenger-list-collection"]');
    }
    // Militar
    else {
      return $('[data-testid="surname-draft-cards-collection"]');
    }
  }
  GetPrintButton() {
    return $('[data-testid="surname-results-print-button"]');
  }
  /**
   * **Facebook:** fb
   *
   * **Messenger:** ms
   *
   * **Twitter:** tw
   *
   * **WhatsApp:** wh
   * @param type fb, ms, tw, wh
   */
  GetSocialButton(type) {
    const links = $$('[data-testid="social-menu"] > div');
    //Facebook
    if (type === 'fb') {
      return links[1];
    }
    //Messenger
    else if (type === 'ms') {
      return links[2];
    }
    // Twitter
    else if (type === 'tw') {
      return links[3];
    }
    // We default to WhatsApp
    else {
      return links[4];
    }
  }
  /**
   * ### Type
   * **Facebook:** fb
   *
   * **Messenger:** ms
   *
   * **Twitter:** tw
   *
   * **WhatsApp:** wh
   *
   * ### Surname
   *
   * **Anything!!**
   *
   * @param type fb, ms, tw, wh
   * @param surname text to be present in social links
   */
  async CheckSocialWindow(type, surname) {
    // Wait for websitres
    await this.PauseShort();
    if (type === 'fb') {
      await Page.switchwindowfilter('Facebook');
      await expect(browser).toHaveUrlContaining(`${surname}` && 'share');
    }
    //Messenger
    else if (type === 'ms') {
      await Page.switchwindowfilter('Message');
      await expect(browser).toHaveUrlContaining(`${surname}` && 'send');
    }
    // Twitter
    else if (type === 'tw') {
      await Page.switchwindowfilter('Twitter');
      await expect(browser).toHaveUrlContaining(`text=${surname}` && '_twitter');
    }
    // We default to WhatsApp
    else {
      await Page.switchwindowfilter('WhatsApp');
      await expect(browser).toHaveUrlContaining(`text=${surname}` && '_whatsapp');
    }
  }

  /**
   * Login into FamilySearch with a default account
   */
  async fsLogin() {
    await $('[id="signInLink"]').click();

    // await Page.login('ChickenWingsParty', 'VggJ5tasf2wZ4Tr');
    await Page.login(process.env.FS_USERNAME, process.env.FS_PASSWORD);
  }
  /**
   * Login into Facebook® with a default account
   */
  async fbLogin() {
    // await Page.opennewtab();
    // await Page.opennewtab();
    // await Page.opennewtab();
    // await Page.opennewtab();
    await Page.loginfacebook(process.env.FB_EMAIL, process.env.FB_PASSWORD);
  }
  /**
   * Login into Twitter® with a default account
   */
  async twLogin() {
    await Page.logintwitter(process.env.TW_USERNAME, process.env.TW_PASSWORD);
  }
  async debugLogin() {
    await Page.logintwitter(process.env.TW_USERNAME, process.env.TW_PASSWORD);
  }

  OpenBeginPage() {
    return Page.open('/surname');
  }
  /**
   * It will go to a specific route based on the base url.
   * https://beta.familysearch.org/{router_url}
   * @param route_url route to move to
   */
  OpenRoute(route_url) {
    return browser.url(route_url);
  }
  /**
   * It will go to a specific route
   * @param full_url route to move to
   */
  OpenURL(full_url) {
    return browser.url(`${full_url}`);
  }

  PauseShort() {
    return Page.pause(3);
  }
  PauseMedium() {
    return Page.pause(6);
  }
  PauseLong() {
    return Page.pause(9);
  }
  /**
   * Check if url containts specific text
   * @param text text to be searched
   */
  CheckUrlContains(text) {
    return expect(browser).toHaveUrlContaining(text);
  }
  CheckTitleContains(text) {
    return expect(browser).toHaveTitleContaining(text);
  }
  async CheckMetaDescriptionContains(text) {
    return expectChai(await this.GetMetaDescription()).to.contain(`${text}`);
  }
  /**
   * Check if url containts specific text
   * @param element DOM element
   * @param text text to be searched
   */
  CheckElementContains(element, text) {
    return expect(element).toHaveTextContaining(text);
  }
  CheckInputValue(input, text) {
    return expect(input).toHaveValue(text);
  }

  /**
   * Check if an element exists in the DOM
   * @param element selector element
   */
  async CheckElemExists(element) {
    await expect(await element.waitForExist({ timeoutMsg: 'ERROR: Element was not found' })).toBe(
      true
    );
    // return element.waitForExist();
  }
  /**
   * Check if url containts specific text
   * @param element Selector Element
   */
  async CheckElemNoExists(element) {
    await expect(
      await element.waitForExist({ reverse: true, timeoutMsg: 'ERROR: Element was found' })
    ).toBe(true);
  }

  ScrollMiddlePage() {
    return Page.scroll(0, 1300);
  }
  GetMetaDescription() {
    return $('meta[name="description"]').getAttribute('content');
  }

  ChangeLang(lang) {
    return Page.changelanguage(lang);
  }

  /**
   * Check if header and button elements of the
   * surname base page match the passed values
   *
   * @context **Main Page only**
   * @param header - expected text to find in the header element
   * @param button - expected text to find in the button element
   * @param debug - occassions when data is not consistent (arabic languages)
   */
  async CheckMainLanguage(header, button, debug) {
    // Do task if not debbugging
    if (debug !== true) {
      await expect(await $('<h1 />')).toHaveTextContaining(header);
      await expect(await this.GetTopFindButton()).toHaveTextContaining(button);
    }
    // Skipp everything lol
    else {
      console.log('DEBUG: CheckMainLanguage was skipped');
    }
    // await expect(await $('[data-testid="surnames-search-button"]')).toHaveTextContaining(button);
  }
  /**
   * Check contents of main page according to passed language
   * @param lang language based on two characters. Ex: en-english, it-italian
   */
  // Pretty much a bunch of if-statements 🤫
  async CheckMainLanguageAuto(lang) {
    // Bahasa Indonesia
    if (lang == 'id') {
      await this.CheckMainLanguage('Masukkan nama belakang', 'TEMUKAN');
    }
    // Bahasa Melayu
    else if (lang == 'ms') {
      await this.CheckMainLanguage('Masukkan nama keluarga', 'CARI');
    }
    // Cebuano
    else if (lang == 'ceb') {
      await this.CheckMainLanguage('I-type ang imong', 'MANGITA');
    }
    // Cesky
    else if (lang == 'cs') {
      await this.CheckMainLanguage('Zadejte své příjmení', 'NAJÍT');
    }
    // Dansky
    else if (lang == 'da') {
      await this.CheckMainLanguage('Indtast dit efternavn', 'FIND');
    }
    // Deutsch
    else if (lang == 'de') {
      await this.CheckMainLanguage('Gib deinen Nachnamen', 'Suchen'); //Translation service's issue
    }
    // Eesti
    else if (lang == 'et') {
      await this.CheckMainLanguage('Sisestage oma perekonnaimi', 'LEIA');
    }
    // English
    else if (lang == 'en') {
      await this.CheckMainLanguage('Enter your last name', 'FIND');
    }
    // Espanol
    else if (lang == 'es') {
      await this.CheckMainLanguage('Ingresa tu apellido', 'BUSCAR');
    }
    // Faka-tonga
    else if (lang == 'to') {
      await this.CheckMainLanguage('Fakahū ho hingoa', 'KUMI');
    }
    // Francais
    else if (lang == 'fr') {
      await this.CheckMainLanguage('Saisissez votre nom', 'TROUVER');
    }
    // Gagana Samoa
    else if (lang == 'sm') {
      await this.CheckMainLanguage('Ta i totonu lou', 'SU’E');
    }
    // Hrvatski
    else if (lang == 'hr') {
      await this.CheckMainLanguage('Unesite svoje prezime', 'PRONAĐI');
    }
    // Italiano
    else if (lang == 'it') {
      await this.CheckMainLanguage('Inserisci il tuo', 'TROVA');
    }
    // Kreyol Ayisyen
    else if (lang == 'ht') {
      await this.CheckMainLanguage('Antre siyati w', 'JWENN');
    }
    // Latviesu
    else if (lang == 'lv') {
      await this.CheckMainLanguage('Ievadiet savu uzvārdu', 'ATRAST');
    }
    // Lietuviu
    else if (lang == 'lt') {
      await this.CheckMainLanguage('Įveskite savo pavardę', 'RASTI');
    }
    // Magyar
    else if (lang == 'hu') {
      await this.CheckMainLanguage('Írd be a családi', 'KERESÉS');
    }
    // Malagasy
    else if (lang == 'mg') {
      await this.CheckMainLanguage('Ampidiro ny anaranao', 'HIKAROKA');
    }
    // Nederlands
    else if (lang == 'nl') {
      await this.CheckMainLanguage('Voer uw achternaam', 'VINDEN');
    }
    // Norsk
    else if (lang == 'no') {
      await this.CheckMainLanguage('Skriv inn etternavnet', 'FINN');
    }
    // Polski
    else if (lang == 'pl') {
      await this.CheckMainLanguage('Wprowadź swoje nazwisko', 'ZNAJDŹ');
    }
    // Portugues
    else if (lang == 'pt') {
      await this.CheckMainLanguage('Digite seu sobrenome', 'PROCURAR');
    }
    // Romana
    else if (lang == 'ro') {
      await this.CheckMainLanguage('Scrie-ți numele de', 'GĂSEȘTE');
    }
    // Shqip
    else if (lang == 'sq') {
      await this.CheckMainLanguage('Shkruani mbiemrin tuaj', 'GJEJE');
    }
    // Slovencina
    else if (lang == 'sk') {
      await this.CheckMainLanguage('Zadajte svoje priezvisko', 'NÁJSŤ');
    }
    // Suomi
    else if (lang == 'fi') {
      await this.CheckMainLanguage('Kirjoita sukunimesi', 'ETSI');
    }
    // Svenska
    else if (lang == 'sv') {
      await this.CheckMainLanguage('Skriv in ditt efternamn', 'HITTA');
    }
    // Tagalog
    else if (lang == 'tl') {
      await this.CheckMainLanguage('Ipasok ang iyong apelyido', 'HANAPIN');
    }
    // Tieng Viet
    else if (lang == 'vi') {
      await this.CheckMainLanguage('Nhập vào họ của', 'TÌM');
    }
    // Turkce
    else if (lang == 'tr') {
      await this.CheckMainLanguage('Anlamını ve kökenini', 'BUL');
    }
    // Vosa vakaviti
    else if (lang == 'fj') {
      await this.CheckMainLanguage('Vakalewena nai otioti', 'KUNEA');
    }
    // Български
    else if (lang == 'bg') {
      await this.CheckMainLanguage('Въведете фамилното си', 'НАМЕРИ');
    }
    // Монгол
    else if (lang == 'mn') {
      await this.CheckMainLanguage('Овгоо оруулаад', 'ОЛОХ');
    }
    // Русский
    else if (lang == 'ru') {
      await this.CheckMainLanguage('Введите свою фамилию', 'Найти');
    }
    // Українська
    else if (lang == 'uk') {
      await this.CheckMainLanguage('Введіть своє прізвище', 'ЗНАЙТИ');
    }
    // ქართული
    else if (lang == 'ka') {
      await this.CheckMainLanguage('Enter your last name', 'ᲞᲝᲕᲜᲐ'); // No translation seems to be present yet
    }
    // Հայերեն
    else if (lang == 'hy') {
      await this.CheckMainLanguage('Մուտքագրեք ձեր', 'ԳՏՆԵԼ');
    }
    // العربية
    else if (lang == 'ar') {
      await this.CheckMainLanguage('معناه وأصله', 'اعثر على');
    }
    // فارسی
    else if (lang == 'fa') {
      await this.CheckMainLanguage('کنید تا معنی و', 'پیدا کن');
    }
    // ภาษาไทย
    else if (lang == 'th') {
      await this.CheckMainLanguage('ใส่นามสกุลขอ', 'ค้นหา');
    }
    // ភាសាខ្មែរ
    else if (lang == 'km') {
      await this.CheckMainLanguage('សូម​វាយ​បញ្ចូល​គោ', 'និ', true); // Text of button is inconsistent...
    }
    // 한국어
    else if (lang == 'ko') {
      await this.CheckMainLanguage('여러분의 성씨를', '찾기');
    }
    // 日本語
    else if (lang == 'ja') {
      await this.CheckMainLanguage('あなたの姓を入', '検索');
    }
    // 繁體中文 - 國語
    else if (lang == 'zh') {
      await this.CheckMainLanguage('輸入你的姓氏', '尋找');
    }
    // Complain
    else {
      throw new Error('Passed language does not exist');
    }
  }
  async CheckResultsLanguage(header, button) {
    await expect(await $('<h2 />')).toHaveTextContaining(header);
    await expect(await this.GetTopFindButton()).toHaveTextContaining(button);
  }
  /**
   * Check contents of results page according to passed language
   * @param lang language based on two characters. Ex: en-english, it-italian
   */
  // Pretty much a bunch of if-statements 🤫
  async CheckResultsLanguageAuto(lang) {
    // Bahasa Indonesia
    if (lang == 'id') {
      await this.CheckResultsLanguage('Sejarah Keluarga', 'CARI');
    }
    // Bahasa Melayu
    else if (lang == 'ms') {
      await this.CheckResultsLanguage('Sejarah Keluarga', 'CARI');
    }
    // Cebuano
    else if (lang == 'ceb') {
      await this.CheckResultsLanguage('Kasaysayan sa Pamilya', 'MANGITA');
    }
    // Cesky
    else if (lang == 'cs') {
      await this.CheckResultsLanguage('Rodinná historie osob', 'VYHLEDAT');
    }
    // Dansky
    else if (lang == 'da') {
      await this.CheckResultsLanguage('historie', 'SØG');
    }
    // Deutsch
    else if (lang == 'de') {
      await this.CheckResultsLanguage('Geschichte der', 'Suchen'); //Translation service's issue
    }
    // Eesti
    else if (lang == 'et') {
      await this.CheckResultsLanguage('pereajalugu', 'OTSI');
    }
    // English
    else if (lang == 'en') {
      await this.CheckResultsLanguage('Family History', 'SEARCH');
    }
    // Espanol
    else if (lang == 'es') {
      await this.CheckResultsLanguage('Historia familiar', 'BUSCAR');
    }
    // Faka-tonga
    else if (lang == 'to') {
      await this.CheckResultsLanguage('Hisitōlia Fakafāmilí', 'KUMI');
    }
    // Francais
    else if (lang == 'fr') {
      await this.CheckResultsLanguage('Histoire familiale', 'RECHERCHER');
    }
    // Gagana Samoa
    else if (lang == 'sm') {
      await this.CheckResultsLanguage('Talafaasolopito o le Aiga', 'SAILI');
    }
    // Hrvatski
    else if (lang == 'hr') {
      await this.CheckResultsLanguage('Obiteljska povijest', 'TRAŽI');
    }
    // Italiano
    else if (lang == 'it') {
      await this.CheckResultsLanguage('Storia familiare del', 'CERCA');
    }
    // Kreyol Ayisyen
    else if (lang == 'ht') {
      await this.CheckResultsLanguage('Istwa Familyal', 'CHÈCHE'); //Lastname does not have space
    }
    // Latviesu
    else if (lang == 'lv') {
      await this.CheckResultsLanguage('ģimenes vēsture', 'MEKLĒT');
    }
    // Lietuviu
    else if (lang == 'lt') {
      await this.CheckResultsLanguage('Giminės istorija', 'IEŠKOTI');
    }
    // Magyar
    else if (lang == 'hu') {
      await this.CheckResultsLanguage('család története', 'KERESÉS');
    }
    // Malagasy
    else if (lang == 'mg') {
      await this.CheckResultsLanguage('Tantaram-pianakaviana', 'HIKAROKA');
    }
    // Nederlands
    else if (lang == 'nl') {
      await this.CheckResultsLanguage('Geschiedenis familie', 'ZOEKEN');
    }
    // Norsk
    else if (lang == 'no') {
      await this.CheckResultsLanguage('Perez Slektshistorie', 'SØK');
    }
    // Polski
    else if (lang == 'pl') {
      await this.CheckResultsLanguage('Historia rodziny', 'SZUKAJ');
    }
    // Portugues
    else if (lang == 'pt') {
      await this.CheckResultsLanguage('História da família', 'PESQUISAR');
    }
    // Romana
    else if (lang == 'ro') {
      await this.CheckResultsLanguage('Istoria familiei', 'CAUTĂ');
    }
    // Shqip
    else if (lang == 'sq') {
      await this.CheckResultsLanguage('Historia Familjare për', 'KËRKOJE');
    }
    // Slovencina
    else if (lang == 'sk') {
      await this.CheckResultsLanguage('Rodinná história', 'VYHĽADÁVAŤ');
    }
    // Suomi
    else if (lang == 'fi') {
      await this.CheckResultsLanguage('Suvun', 'HAE');
    }
    // Svenska
    else if (lang == 'sv') {
      await this.CheckResultsLanguage('Släkthistoria om', 'SÖK');
    }
    // Tagalog
    else if (lang == 'tl') {
      await this.CheckResultsLanguage('Kasaysayan ng', 'MAGHANAP');
    }
    // Tieng Viet
    else if (lang == 'vi') {
      await this.CheckResultsLanguage('Lịch Sử Gia Đình', 'TÌM KIẾM');
    }
    // Turkce
    else if (lang == 'tr') {
      await this.CheckResultsLanguage('Aile Tarihi', 'ARA');
    }
    // Vosa vakaviti
    else if (lang == 'fj') {
      await this.CheckResultsLanguage('Tuva Kawa', 'VAKASAQARA');
    }
    // Български
    else if (lang == 'bg') {
      await this.CheckResultsLanguage('Семейна история', 'ТЪРСИ');
    }
    // Монгол
    else if (lang == 'mn') {
      await this.CheckResultsLanguage('Гэр бүлийн түүх', 'ХАЙХ');
    }
    // Русский
    else if (lang == 'ru') {
      await this.CheckResultsLanguage('История семьи', 'Поиск');
    }
    // Українська
    else if (lang == 'uk') {
      await this.CheckResultsLanguage('Сімейна історія', 'ПОШУК');
    }
    // ქართული
    else if (lang == 'ka') {
      await this.CheckResultsLanguage('Family History', 'ᲫᲘᲔᲑᲐ'); // No translation seems to be present yet
    }
    // Հայերեն
    else if (lang == 'hy') {
      await this.CheckResultsLanguage('Ընտանեկան', 'ՈՐՈՆԵԼ');
    }
    // العربية
    else if (lang == 'ar') {
      await this.CheckResultsLanguage('Family History', 'ابحث');
    }
    // فارسی
    else if (lang == 'fa') {
      await this.CheckResultsLanguage('Family History', 'جستجو');
    }
    // ภาษาไทย
    else if (lang == 'th') {
      await this.CheckResultsLanguage('ประวัติครอบครัว', 'ค้นข้อมูล');
    }
    // ភាសាខ្មែរ
    else if (lang == 'km') {
      await this.CheckResultsLanguage('ពង្សប្រវត្តិ', 'ស្វែងរក', true); // Text of button is inconsistent...
    }
    // 한국어
    else if (lang == 'ko') {
      await this.CheckResultsLanguage('씨 가족 역사', '검색');
    }
    // 日本語
    else if (lang == 'ja') {
      await this.CheckResultsLanguage('家の歴史', '検索');
    }
    // 繁體中文 - 國語
    else if (lang == 'zh') {
      await this.CheckResultsLanguage('氏家譜', '搜尋');
    }
    // Complain
    else {
      throw new Error('Passed language does not exist');
    }
  }

  async GetAvailableLanguages() {
    // const languages = Page.getlanguages
    return Page.getlanguages();
  }
  GetRandomLastName() {
    const lastnames = [
      'Ruiz',
      'Yamamoto',
      'Toronto',
      'Paga',
      'Mesa',
      // 'Caparao',
      'Jones',
      'Arroyo',
      'McCurry',
      'Martinez',
      'Monkey',
      'Gomez',
    ];
    const lastname = Math.floor(Math.random() * lastnames.length);
    return lastnames[lastname];
  }
  /**
   * Search for an specific lastname, default is Perez
   * @param lastname lastname to search
   */
  async SearchLastName(lastname = 'Perez') {
    await this.OpenRoute(`/surname?surname=${lastname}`);
    await browser.waitUntil(
      async function () {
        return await (await $$('[data-testid="surnames-search-button"]')[0]).isExisting();
      },
      { timeoutMsg: 'There was an error fetching name' }
    );
    // await this.GetLastNameBox().setValue(lastname);
    // await this.GetFindButton().click();
  }
  async SearchLastNameTopBar(lastname) {
    await this.GetTopLastNameBox().setValue(lastname);
    await this.GetTopFindButton().click();
  }
  async SearchLastNameBottomBar(lastname) {
    await this.GetBottomLastNameBox().setValue(lastname);
    await this.GetBottomFindButton().click();
  }
  /**
   * Close all tabs/windows **expect** the **main** one
   */
  async CloseExtraWindows() {
    // await Page.opennewtab();
    // await Page.opennewtab();
    // await Page.opennewtab();
    // await Page.opennewtab();
    // const arr = await Page.getallwindows();
    // await browser.switchToWindow(arr[0]);
    await Page.closeallwindows();
  }

  // OpenBeginPage() {
  //   return Page.open('/tree/guided/connect-to-tree');
  // }
  // LoginDefault() {
  //   return Page.login('ChickenWingsParty', 'VggJ5tasf2wZ4Tr');
  // }
  // LogoutDefault() {
  //   return Page.logout();
  // }

  // OpenEndPage() {
  //   return Page.open('/tree/guided/connect-to-tree?node=finale');
  // }

  // ClearFamilyTree() {
  //   return Page.cleartree();
  // }
}

export default new SurnamePage();
