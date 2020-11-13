import { BlogPipePipe } from './blog-pipe.pipe';

describe('BlogPipePipe', () => {
  it('create an instance', () => {
    const pipe = new BlogPipePipe();
    expect(pipe).toBeTruthy();
  });
});
