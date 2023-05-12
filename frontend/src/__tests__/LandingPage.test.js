import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import LandingPage from '../pages/LandingPage';

describe('Test LandingPage component', () => {
  delete window.location;
  window.location = { href: '' };
  // This test ensures that the LandingPage component is rendered successfully
  it('renders LandingPage components', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
  // This test checks if clicking the "Sign In" button triggers the correct URL change
  it('handles sign in click', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Sign In'));
    expect(window.location.href).toBe('http://localhost:3000/account/sign-in');
  });
  // This test checks if the LandingCard components are rendered successfully
  it('renders LandingCard components', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Images')).toBeInTheDocument();
    expect(screen.getByText('Videos')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
  });
});
