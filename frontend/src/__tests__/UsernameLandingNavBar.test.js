import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UsernameLandingNavBar from '../components/UsernamePageComponents/UsernameLandingNavBar';
import '@testing-library/jest-dom'
describe('Test UsernameLandingNavBar', () => {
  // This test checks whether the introduction text is displayed
  it('Check introduction text', () => {
    const text = 'digital marketplace';
    const { getByText } = render(<UsernameLandingNavBar />);
    expect(getByText(text)).toBeInTheDocument();
  });

});
