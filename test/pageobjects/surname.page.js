// import Page from '../../../Source/page.mjs';     // Local
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
  ScrollMiddlePage() {
    return Page.scroll(0, 1300);
  }
  /**
   *
   * @contex **Main Page only**
   */
  GetMainSearchSpecificButton() {
    return $('[class="css-1dhwrh5 linkCss_l50ksak"]');
  }
  ChangeLang(lang) {
    return Page.changelanguage(lang);
  }
  /**
   * Check if passed values (in respective language) match the value of the element
   * Check if header and button elements of the
   * surname base page match the passed values
   * @context **Main Page only**
   * @param header - expected text to find in the header element
   * @param button - expected text to find in the button element
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
   * Check contents of page according to passed to language
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
   * **NOT FUNCTIONAL:** Check contents of page according to passed to language
   * @param lang language based on two characters. Ex: en-english, it-italian
   */
  // Pretty much a bunch of if-statements 🤫
  async CheckResultsLanguageAuto(lang) {
    // Bahasa Indonesia
    if (lang == 'id') {
      await this.CheckMainLanguage('Masukkan nama', 'TEMUKAN');
    }
    // Bahasa Melayu
    else if (lang == 'ms') {
      await this.CheckMainLanguage('', '');
    }
    // Cebuano
    else if (lang == 'ceb') {
      await this.CheckMainLanguage('', '');
    }
    // Cesky
    else if (lang == 'cs') {
      await this.CheckMainLanguage('', '');
    }
    // Dansky
    else if (lang == 'da') {
      await this.CheckMainLanguage('', '');
    }
    // Deutsch
    else if (lang == 'de') {
      await this.CheckMainLanguage('', '');
    }
    // Eesti
    else if (lang == 'et') {
      await this.CheckMainLanguage('', '');
    }
    // English
    else if (lang == 'en') {
      await this.CheckMainLanguage('', '');
    }
    // Espanol
    else if (lang == 'es') {
      await this.CheckMainLanguage('', '');
    }
    // Faka-tonga
    else if (lang == 'to') {
      await this.CheckMainLanguage('', '');
    }
    // Francais
    else if (lang == 'fr') {
      await this.CheckMainLanguage('', '');
    }
    // Gagana Samoa
    else if (lang == 'sm') {
      await this.CheckMainLanguage('', '');
    }
    // Hrvatski
    else if (lang == 'hr') {
      await this.CheckMainLanguage('', '');
    }
    // Italiano
    else if (lang == 'it') {
      await this.CheckMainLanguage('', '');
    }
    // Kreyol Ayisyen
    else if (lang == 'ht') {
      await this.CheckMainLanguage('', '');
    }
    // Latviesu
    else if (lang == 'lv') {
      await this.CheckMainLanguage('', '');
    }
    // Lietuviu
    else if (lang == 'lt') {
      await this.CheckMainLanguage('', '');
    }
    // Magyar
    else if (lang == 'hu') {
      await this.CheckMainLanguage('', '');
    }
    // Malagasy
    else if (lang == 'mg') {
      await this.CheckMainLanguage('', '');
    }
    // Nederlands
    else if (lang == 'nl') {
      await this.CheckMainLanguage('', '');
    }
    // Norsk
    else if (lang == 'no') {
      await this.CheckMainLanguage('', '');
    }
    // Polski
    else if (lang == 'pl') {
      await this.CheckMainLanguage('', '');
    }
    // Portugues
    else if (lang == 'pt') {
      await this.CheckMainLanguage('', '');
    }
    // Romana
    else if (lang == 'ro') {
      await this.CheckMainLanguage('', '');
    }
    // Shqip
    else if (lang == 'sq') {
      await this.CheckMainLanguage('', '');
    }
    // Slovencina
    else if (lang == 'sk') {
      await this.CheckMainLanguage('', '');
    }
    // Suomi
    else if (lang == 'fi') {
      await this.CheckMainLanguage('', '');
    }
    // Svenska
    else if (lang == 'sv') {
      await this.CheckMainLanguage('', '');
    }
    // Tagalog
    else if (lang == 'tl') {
      await this.CheckMainLanguage('', '');
    }
    // Tieng Viet
    else if (lang == 'vi') {
      await this.CheckMainLanguage('', '');
    }
    // Turkce
    else if (lang == 'tr') {
      await this.CheckMainLanguage('', '');
    }
    // Vosa vakaviti
    else if (lang == 'fj') {
      await this.CheckMainLanguage('', '');
    }
    // Български
    else if (lang == 'bg') {
      await this.CheckMainLanguage('', '');
    }
    // Монгол
    else if (lang == 'mn') {
      await this.CheckMainLanguage('', '');
    }
    // Русский
    else if (lang == 'ru') {
      await this.CheckMainLanguage('', '');
    }
    // Українська
    else if (lang == 'uk') {
      await this.CheckMainLanguage('', '');
    }
    // ქართული
    else if (lang == 'ka') {
      await this.CheckMainLanguage('', '');
    }
    // Հայերեն
    else if (lang == 'hy') {
      await this.CheckMainLanguage('', '');
    }
    // العربية
    else if (lang == 'ar') {
      await this.CheckMainLanguage('', '');
    }
    // فارسی
    else if (lang == 'fa') {
      await this.CheckMainLanguage('', '');
    }
    // ภาษาไทย
    else if (lang == 'th') {
      await this.CheckMainLanguage('', '');
    }
    // ភាសាខ្មែរ
    else if (lang == 'km') {
      await this.CheckMainLanguage('', '');
    }
    // 한국어
    else if (lang == 'ko') {
      await this.CheckMainLanguage('', '');
    }
    // 日本語
    else if (lang == 'ja') {
      await this.CheckMainLanguage('', '');
    }
    // 繁體中文 - 國語
    else if (lang == 'zh') {
      await this.CheckMainLanguage('', '');
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
  async SearchLastName(lastname) {
    await this.OpenRoute(`/surname?surname=${lastname}`);
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
