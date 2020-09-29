import { Blog } from './blog';

describe('Blog', () => {
  const testTitle = 'title';
  const testAuthor = 'Bob';
  const testBody = '<h1>Hello world!</h1>';

  it('should create an instance', () => {
    expect(new Blog(testTitle, testAuthor, testBody)).toBeTruthy();
  });
  it('should contain the correct values after construction', () => {
    const blog = new Blog(testTitle, testAuthor, testBody);
    expect(blog.title).toEqual(testTitle);
    expect(blog.author).toEqual(testAuthor);
    expect(blog.body).toEqual(testBody);
  });
});
