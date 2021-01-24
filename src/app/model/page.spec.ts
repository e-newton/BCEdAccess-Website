import { Page } from './page';

describe('Page', () => {
  it('should create an instance', () => {
    expect(new Page('parent', 'title', 'body', true, 'id')).toBeTruthy();
  });
});
