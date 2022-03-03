import { render, screen } from '@testing-library/react';
import Upload from './upload';

test('renders without crashing', () => {
  render(<Upload />);
  const linkElement = screen.getByText('Upload de imagens');
  expect(linkElement).toBeInTheDocument();
});
