import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Importamos el componente real
import Featured from '@/components/featured/FeaturedComponent';

// Simulamos productos que la API devolvería
const mockProducts = [
  { id: '1', name: 'Camiseta Deportiva', price: 49.99, image: '/img/camiseta.png' },
  { id: '2', name: 'Zapatillas Running', price: 89.99, image: '/img/zapatillas.png' },
];

// Mock global de fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      redirected: false,
      type: 'basic',
      url: '',
      clone: jest.fn(),
      body: null,
      bodyUsed: false,
      json: () => Promise.resolve(mockProducts),
      text: jest.fn(),
      blob: jest.fn(),
      arrayBuffer: jest.fn(),
      formData: jest.fn(),
  } as unknown as Response)
);

describe('FeaturedComponent', () => {
  test('renderiza productos después del fetch', async () => {
    await act(async () => {
      render(<Featured />);
    });

    // Esperamos a que aparezca el nombre del primer producto
    await waitFor(() => {
      expect(screen.getByText('Camiseta Deportiva')).toBeInTheDocument();
      expect(screen.getByText('Zapatillas Running')).toBeInTheDocument();
    });
  });
});
