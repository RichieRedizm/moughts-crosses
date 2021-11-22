import { render, fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';

import { Board } from './Board';
import { usePlayGame } from './hooks';
import { Message } from '../Message';
import { Square } from '../Square';
import { Icons } from '../Board/constants';

jest.mock('./hooks');

describe('<Board>', () => {
  const mockMessage = { type: 'foo', msgText: 'Bar' };
  const mockSquares = [
    { id: 1, icon: Icons.CROSS },
    { id: 2, icon: Icons.NOUGHT },
    { id: 3, icon: undefined },
  ];
  const mockHandleReset = jest.fn();

  beforeEach(() => {
    usePlayGame.mockReturnValue({
      message: mockMessage,
      squares: mockSquares,
      handleReset: mockHandleReset,
    });
  });

  it('renders the main board', () => {
    const { getByTitle } = render(<Board />);

    expect(getByTitle(/Game Board/i)).toBeInTheDocument();
    expect(getByTitle(/Game Board/i)).toHaveClass('board');
  });

  it('renders child components', () => {
    const wrapper = shallow(<Board />);

    expect(wrapper.find(Message)).toHaveLength(1);

    expect(wrapper.find(Square)).toHaveLength(3);
    expect(wrapper.find(Square).at(0).props()).toEqual({
      id: 1,
      icon: Icons.CROSS,
    });
    expect(wrapper.find(Square).at(1).props()).toEqual({
      id: 2,
      icon: Icons.NOUGHT,
    });
    expect(wrapper.find(Square).at(2).props()).toEqual({
      id: 3,
      icon: undefined,
    });
  });

  it('renders s reset button', () => {
    const { getByText } = render(<Board />);

    expect(getByText(/Restart Game/i)).toHaveClass('board__reset');

    fireEvent.click(getByText(/Restart Game/i));
    expect(mockHandleReset).toHaveBeenCalled();
  });
});
