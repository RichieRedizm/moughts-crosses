import { render } from '@testing-library/react';
import { Message } from './Message';

describe('<Message>', () => {
  let props;

  beforeEach(() => {
    props = { type: 'foo', msgText: 'Bar' };
  });

  it('renders message text and type as class', () => {
    const { getByText } = render(<Message {...props} />);

    expect(getByText(/Bar/i)).toBeInTheDocument();
    expect(getByText(/Bar/i)).toHaveClass('message');
    expect(getByText(/Bar/i)).toHaveClass('foo');
  });
});
