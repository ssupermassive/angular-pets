import { FrontestingPage } from './app.po';

describe('frontesting App', function() {
  let page: FrontestingPage;

  beforeEach(() => {
    page = new FrontestingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
