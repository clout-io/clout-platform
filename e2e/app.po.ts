import { browser, by, element } from 'protractor';

export class IcoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ico-root h1')).getText();
  }
}
