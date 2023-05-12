import React from 'react';
import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import fetchMock from 'jest-fetch-mock';
import UsernamePage from '../pages/UsernamePage';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});
// Define a custom render function that uses react-testing-library's render and wraps it in a BrowserRouter component
function render(ui, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route)

  return rtlRender(ui, { wrapper: BrowserRouter })
}

describe('Test UsernamePage component', () => {
  // Test that the UsernamePage component renders properly
  it('renders UsernamePage components', () => {
    render(<UsernamePage />);
  
    expect(screen.getByText(/Please select a username/i)).toBeInTheDocument();
  });
  

  it('handles form submission', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));

    render(<UsernamePage />);
    // Find the username input field and submit button and simulate a form submission
    const usernameInput = screen.getByPlaceholderText('Username');
    const submitButton = screen.getByRole('button', { name: /Set username/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.click(submitButton);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/account/username", expect.anything());
  });
});
