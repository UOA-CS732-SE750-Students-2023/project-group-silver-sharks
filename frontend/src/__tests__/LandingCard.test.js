import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LandingCard from '../components/LandingPageComponents/LandingCard';
import '@testing-library/jest-dom'
import {BrowserRouter} from "react-router-dom";
//Check that the text content of the LandingCard component is displayed correctly.
describe('Test Landing Card', () => {
  it('Check texts', () => {

    const { getByText } = render(
      <BrowserRouter>
        <LandingCard path={''} src={''} title={'hello-title'} text={'hello-text'}/>
      </BrowserRouter>
    );
    expect(getByText('hello-title')).toBeInTheDocument();
    expect(getByText('hello-text')).toBeInTheDocument();
  });

});
