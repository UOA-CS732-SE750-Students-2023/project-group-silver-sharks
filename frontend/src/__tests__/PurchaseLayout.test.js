import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import PurchaseLayout from '../components/profile-nav/ProfileComponents/PurchaseLayout';
import fetchMock from 'jest-fetch-mock';
// mock global URL.createObjectURL function to be able to spy on it
global.URL.createObjectURL = jest.fn();

fetchMock.enableMocks();
// reset mocks and spy on console.log function before each test case
beforeEach(() => {
  fetch.resetMocks();
  URL.createObjectURL.mockReset();
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  console.log.mockRestore();
});


describe('Test PurchaseLayout component', () => {
  const purchasedAssets = [
    { _id: '1', coverImage: 'cover1.jpg', name: 'Asset1', price: 10.5, category: 'Category1' },
    { _id: '2', coverImage: 'cover2.jpg', name: 'Asset2', price: 20.5, category: 'Category2' },
    { _id: '3', coverImage: 'cover3.jpg', name: 'Asset3', price: 30.5, category: 'Services' },
  ];

  it('renders PurchaseLayout and purchased assets', () => {
    render(
      <MemoryRouter>
        <PurchaseLayout purchasedAssets={purchasedAssets} />
      </MemoryRouter>
    );
    // assert that heading and asset information is displayed correctly
    const headingElements = screen.getAllByText(/Purchased Assets/i);
    expect(headingElements.length).toBeGreaterThan(0);
  
    for (const asset of purchasedAssets) {
      expect(screen.getByText(asset.name)).toBeInTheDocument();
      expect(screen.getByText(`Price: $${asset.price.toFixed(2)}`)).toBeInTheDocument();
      expect(screen.getByText(`Category: ${asset.category}`)).toBeInTheDocument();
    }
  });
  

  it('triggers download function', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));
  
    render(
      <MemoryRouter>
        <PurchaseLayout purchasedAssets={purchasedAssets} />
      </MemoryRouter>
    );
    // simulate click on download button
    const downloadButtons = screen.getAllByText('Download files');
    await act(async () => {
      fireEvent.click(downloadButtons[0]);
    });
  
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(URL.createObjectURL).toHaveBeenCalled();
  });
  

});
