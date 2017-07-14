import { StudentmanagerPage } from './app.po';

describe('studentmanager App', () => {
  let page: StudentmanagerPage;

  beforeEach(() => {
    page = new StudentmanagerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
