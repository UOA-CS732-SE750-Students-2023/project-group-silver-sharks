import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import ErrorPage from '../pages/misc/ErrorPage';

// Mock react-router-dom hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteError: () => ({
    message: 'Mock error message',
    status: 404,
  }),
}));

describe('Test ErrorPage component', () => {
  it('renders ErrorPage and displays error message', () => {
    render(
      // Wrap ErrorPage component in MemoryRouter to simulate routing
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Resource Not Found')).toBeInTheDocument();
    expect(screen.getByText('Mock error message')).toBeInTheDocument();
  });
});
