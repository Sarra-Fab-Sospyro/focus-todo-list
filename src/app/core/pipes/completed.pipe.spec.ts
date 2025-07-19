import { CompletedPipe } from './completed.pipe';

describe('CompletedTaskPipe', () => {
  it('create an instance', () => {
    const pipe = new CompletedPipe();
    expect(pipe).toBeTruthy();
  });
});
