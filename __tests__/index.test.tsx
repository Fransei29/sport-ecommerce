import { render, screen } from '@testing-library/react';
import React from 'react';
import Banner from '@/components/banner/BannerComponent';
import '@testing-library/jest-dom';

test('renderiza el banner correctamente', () => {
  render(<Banner />);
  const banner = screen.getByTestId('banner');
  expect(banner).toBeInTheDocument();
});
