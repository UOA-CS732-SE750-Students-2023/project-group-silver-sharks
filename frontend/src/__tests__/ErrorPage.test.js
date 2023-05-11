import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ErrorPage from '../pages/misc/ErrorPage';
import '@testing-library/jest-dom'
describe('Test ErrorPage', () => {
  it('Check error message', () => {
    const text = 'Error has occurred';
    const { getByText } = render(<ErrorPage />);
    expect(getByText(text)).toBeInTheDocument();
  });

  it('Check error message', () => {
    const text = 'Describe what the error is';
    const { getByText } = render(<ErrorPage />);
    expect(getByText(text)).toBeInTheDocument();
  });

});
