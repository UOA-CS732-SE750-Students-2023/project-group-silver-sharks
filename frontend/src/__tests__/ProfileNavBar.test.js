import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProfileNavBar from '../components/ProfileNavBar';
import '@testing-library/jest-dom'
import {BrowserRouter} from "react-router-dom";
//Tests that the ProfileNavBar component displays the correct path label
describe('Test Profile Nav Bar', () => {
  it('Check paths', () => {
    const labels = ['DASHBOARD', 'PURCHASED', 'SELLING', 'MESSAGES'];

    const { getByText } = render(
      <BrowserRouter>
        <ProfileNavBar />
      </BrowserRouter>
    );

    for (const text of labels) {
      expect(getByText(text)).toBeInTheDocument();
    }
  });

});
