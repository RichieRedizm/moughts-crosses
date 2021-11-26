import { renderHook, act } from '@testing-library/react-hooks';

import { usePlayGame } from './usePlayGame';
import { Icons } from '../constants';
import { initializeSquares } from '../helpers';

jest.mock('../helpers');

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

  const mockCrossesWin = [
    { id: 0, icon: Icons.NOUGHT },
    { id: 1, icon: undefined },
    { id: 2, icon: Icons.CROSS },
    { id: 3, icon: undefined },
    { id: 4, icon: Icons.CROSS },
    { id: 5, icon: undefined },
    { id: 6, icon: Icons.CROSS },
    { id: 7, icon: undefined },
    { id: 8, icon: Icons.NOUGHT },
  ];

  const mockNoughtsWin = [
    { id: 0, icon: undefined },
    { id: 1, icon: Icons.CROSS },
    { id: 2, icon: undefined },
    { id: 3, icon: undefined },
    { id: 4, icon: Icons.CROSS },
    { id: 5, icon: undefined },
    { id: 6, icon: Icons.NOUGHT },
    { id: 7, icon: Icons.NOUGHT },
    { id: 8, icon: Icons.NOUGHT },
  ];

  const mockNobodyWin = [
    { id: 0, icon: Icons.CROSS },
    { id: 1, icon: Icons.CROSS },
    { id: 2, icon: Icons.NOUGHT },
    { id: 3, icon: Icons.NOUGHT },
    { id: 4, icon: Icons.CROSS },
    { id: 5, icon: Icons.CROSS },
    { id: 6, icon: Icons.CROSS },
    { id: 7, icon: Icons.NOUGHT },
    { id: 8, icon: Icons.NOUGHT },
  ];

  beforeEach(() => {
    initializeSquares.mockReturnValue(mockSquares);
  });

  it('returns default hook state and functions', () => {
    const { result } = renderHook(() => usePlayGame());

    expect(result.current).toEqual({
      message: null,
      squares: mockSquares,
      handleSquareClick: expect.any(Function),
      handleReset: expect.any(Function),
    });
  });

  it('on handleSquareClick update square icon', () => {
    const { result } = renderHook(() => usePlayGame());

    expect(result.current.squares[2]).toEqual({ id: 2, icon: undefined });

    act(() => {
      result.current.handleSquareClick(2);
    });

    expect(result.current.squares[2]).toEqual({ id: 2, icon: Icons.CROSS });
  });

  it('on click switches icon type', () => {
    const { result } = renderHook(() => usePlayGame());

    act(() => {
      result.current.handleSquareClick(1);
    });
    expect(result.current.squares[1]).toEqual({ id: 1, icon: Icons.CROSS });

    act(() => {
      result.current.handleSquareClick(3);
    });
    expect(result.current.squares[3]).toEqual({ id: 3, icon: Icons.NOUGHT });
  });

  it('sets warning message if same square selected', () => {
    const { result } = renderHook(() => usePlayGame());

    act(() => {
      result.current.handleSquareClick(2);
    });

    expect(result.current.squares[2]).toEqual({ id: 2, icon: Icons.CROSS });

    act(() => {
      result.current.handleSquareClick(2);
    });

    expect(result.current.message).toEqual({
      type: 'warn',
      msgText: 'This position is not available',
    });
  });

  it('checkResult sets winning message if icon Crosses matches possibleWins', () => {
    initializeSquares.mockReturnValue(mockCrossesWin);

    const { result } = renderHook(() => usePlayGame());

    expect(result.current.message).toEqual({
      type: 'win',
      msgText: 'Congratulations Crosses - you have won the game!',
    });
  });

  it('checkResult sets winning message if icon Noughts matches possibleWins', () => {
    initializeSquares.mockReturnValue(mockNoughtsWin);

    const { result } = renderHook(() => usePlayGame());

    expect(result.current.message).toEqual({
      type: 'win',
      msgText: 'Congratulations Noughts - you have won the game!',
    });
  });

  it('checkResult sets warn message if neither icon matches possibleWins with no squares left', () => {
    initializeSquares.mockReturnValue(mockNobodyWin);

    const { result } = renderHook(() => usePlayGame());

    expect(result.current.message).toEqual({
      type: 'warn',
      msgText: 'Nobody won that game!',
    });
  });
});
