import { IcoPage } from './app.po';

describe('ico App', () => {
  let page: IcoPage;

  beforeEach(() => {
    page = new IcoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to ico!');
  });
});
