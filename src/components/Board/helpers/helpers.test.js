import { initializeSquares } from './';

describe('initializeSquares', () => {
  it('returns an array of objects with id and icon', () => {
    expect(initializeSquares()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 0, icon: undefined }),
        expect.objectContaining({ id: 1, icon: undefined }),
        expect.objectContaining({ id: 2, icon: undefined }),
        expect.objectContaining({ id: 3, icon: undefined }),
        expect.objectContaining({ id: 4, icon: undefined }),
        expect.objectContaining({ id: 5, icon: undefined }),
        expect.objectContaining({ id: 6, icon: undefined }),
        expect.objectContaining({ id: 7, icon: undefined }),
        expect.objectContaining({ id: 8, icon: undefined }),
      ]),
    );
  });
});
