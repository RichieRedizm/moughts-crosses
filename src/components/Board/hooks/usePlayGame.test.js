import { renderHook } from '@testing-library/react-hooks';

import { usePlayGame } from './usePlayGame';

describe('usePlayGame', () => {
  const mockSquares = [
    { id: 0, icon: undefined },
    { id: 1, icon: undefined },
    { id: 2, icon: undefined },
    { id: 3, icon: undefined },
    { id: 4, icon: undefined },
    { id: 5, icon: undefined },
    { id: 6, icon: undefined },
    { id: 7, icon: undefined },
    { id: 8, icon: undefined },
  ];

  it('returns default hook state and functions', () => {
    const { result } = renderHook(() => usePlayGame());

    expect(result.current).toEqual({
      message: null,
      squares: mockSquares,
      handleSquareClick: expect.any(Function),
      handleReset: expect.any(Function),
    });
  });
});
