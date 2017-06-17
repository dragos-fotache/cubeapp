import { CubeappPage } from './app.po';

describe('cubeapp App', () => {
  let page: CubeappPage;

  beforeEach(() => {
    page = new CubeappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
