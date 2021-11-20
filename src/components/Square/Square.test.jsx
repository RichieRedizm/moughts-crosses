import { render, fireEvent } from '@testing-library/react';

import { Square } from './Square';
import { Icons } from '../Board/constants';

describe('<Square>', () => {
  let props;

  beforeEach(() => {
    props = { id: 1, icon: Icons.CROSS, handleSquareClick: jest.fn() };
  });

  it('renders Square with title attribute', () => {
    const { queryByTitle } = render(<Square {...props} />);

    expect(queryByTitle(/square position 1/i)).toBeInTheDocument();
    expect(queryByTitle(/square position 1/i)).toHaveClass('square');
  });

  it('calls handleSquareClick onClick event', () => {
    const { queryByTitle } = render(<Square {...props} />);

    fireEvent.click(queryByTitle(/square position 1/i));
    expect(props.handleSquareClick).toHaveBeenCalled();
  });
});
