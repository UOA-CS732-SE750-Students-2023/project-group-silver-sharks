import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UsernameLandingNavBar from '../components/UsernamePageComponents/UsernameLandingNavBar';
import '@testing-library/jest-dom'
describe('Test UsernameLandingNavBar', () => {

  it('Check introduction text', () => {
    const text = 'digital marketplace';
    const { getByText } = render(<UsernameLandingNavBar />);
    expect(getByText(text)).toBeInTheDocument();
  });

});
