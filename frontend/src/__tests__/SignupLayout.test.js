import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignupLayout from '../components/SignupLayout';
import '@testing-library/jest-dom'
import {BrowserRouter} from "react-router-dom";
describe('Test SignupLayout', () => {


  it('Check Sign In Link', () => {
    const text = 'Sign in';
    const { getByText } = render(
      <BrowserRouter>
        <SignupLayout />
      </BrowserRouter>
    );
    expect(getByText(text)).toBeInTheDocument();
  });

  it('Check Sign In tips', () => {
    const text = 'Already have an account?';
    const { getByText } = render(
      <BrowserRouter>
        <SignupLayout />
      </BrowserRouter>
    );
    expect(getByText(text)).toBeInTheDocument();
  });

});
