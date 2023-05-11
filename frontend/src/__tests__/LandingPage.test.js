import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import LandingPage from '../pages/LandingPage';

describe('Test LandingPage component', () => {
  delete window.location;
  window.location = { href: '' };

  it('renders LandingPage components', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('handles sign in click', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Sign In'));
    expect(window.location.href).toBe('http://localhost:3000/account/sign-in');
  });

/*   it('handles get started click', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Get Started'));
    expect(window.location.href).toBe('http://localhost:3000/account/sign-in');
  }); */

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
