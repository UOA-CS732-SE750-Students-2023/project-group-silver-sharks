import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LandingNavBar from '../components/LandingPageComponents/LandingNavBar';
import '@testing-library/jest-dom'
import {BrowserRouter} from "react-router-dom";
describe('Test Ladning Nav Bar', () => {
  it('Check Text', () => {
    // Render the LandingNavBar component and retrieve the getByText function
    const { getByText } = render(
      <LandingNavBar />
    );
    expect(getByText('SHARKET')).toBeInTheDocument();
    expect(getByText('digital marketplace')).toBeInTheDocument();
  });

});
