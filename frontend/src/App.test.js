import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderForm from './OrderForm';  // Adjust the path if necessary

// Mocking the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ OrderId: '1234' }),
  })
);

describe('OrderForm Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    fetch.mockClear();
  });

  test('renders form elements correctly', () => {
    render(<OrderForm />);

    // Check that all form fields and button are rendered
    expect(screen.getByLabelText(/Product ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Customer Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Place Order/i })).toBeInTheDocument();
  });

  test('allows the form to be submitted and displays the success message', async () => {
    render(<OrderForm />);

    // Simulate typing into the form fields
    fireEvent.change(screen.getByLabelText(/Product ID/i), { target: { value: 'P001' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Customer Email/i), { target: { value: 'test@example.com' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Place Order/i }));

    // Wait for the success message and the order number
    await waitFor(() => {
      expect(screen.getByText(/Order placed successfully/i)).toBeInTheDocument();
      expect(screen.getByText(/Order Number: 1234/i)).toBeInTheDocument();
    });

    // Ensure the form fields are cleared after submission
    expect(screen.getByLabelText(/Product ID/i).value).toBe('');
    expect(screen.getByLabelText(/Quantity/i).value).toBe('1');  // Default value for quantity
    expect(screen.getByLabelText(/Customer Email/i).value).toBe('');
  });

  test('displays error message when order fails to submit', async () => {
    // Mock fetch to simulate a failed submission
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Failed to place order' }),
      })
    );

    render(<OrderForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Product ID/i), { target: { value: 'P001' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Customer Email/i), { target: { value: 'test@example.com' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Place Order/i }));

    // Wait for the failure message
    await waitFor(() => {
      expect(screen.getByText(/Failed to place order/i)).toBeInTheDocument();
    });
  });

  test('renders current time at the top', () => {
    render(<OrderForm />);

    // Check if the current time is being displayed
    const currentTime = new Date().toLocaleString();
    expect(screen.getByText(currentTime)).toBeInTheDocument();
  });

  test('renders social media links with icons', () => {
    render(<OrderForm />);

    // Check if social media links and icons are rendered
    expect(screen.getByText(/Website/i)).toBeInTheDocument();
    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument();
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
    expect(screen.getByText(/YouTube/i)).toBeInTheDocument();
    expect(screen.getByText(/Medium/i)).toBeInTheDocument();
    expect(screen.getByText(/Dev.to/i)).toBeInTheDocument();
  });
});
