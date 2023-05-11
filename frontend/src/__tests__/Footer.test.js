import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Footer from '../components/Footer/Footer';
import '@testing-library/jest-dom'
describe('Test Footer', () => {
  it('Check footer name', () => {
    const text = 'SHARKET';
    const { getByText } = render(<Footer />);
    expect(getByText(text)).toBeInTheDocument();
  });

});
