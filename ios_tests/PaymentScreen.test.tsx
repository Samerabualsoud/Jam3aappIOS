import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PaymentScreen from '../src/screens/PaymentScreen';
import CrossPlatformPaymentHandler from '../src/services/CrossPlatformPaymentHandler';

// Mock the CrossPlatformPaymentHandler
jest.mock('../src/services/CrossPlatformPaymentHandler', () => ({
  processPayment: jest.fn(),
  getAvailablePaymentMethods: jest.fn().mockReturnValue([
    { id: 'credit-card', name: 'Credit/Debit Card', icon: 'card' },
    { id: 'mada', name: 'Mada', icon: 'card' },
    { id: 'stc-pay', name: 'STC Pay', icon: 'phone-portrait' },
    { id: 'tabby', name: 'Tabby - Pay Later', icon: 'time' },
    { id: 'apple-pay', name: 'Apple Pay', icon: 'logo-apple' }
  ])
}));

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn()
};

// Mock route with params
const mockRoute = {
  params: {
    dealId: 'test-deal-123'
  }
};

describe('PaymentScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock successful payment
    CrossPlatformPaymentHandler.processPayment.mockResolvedValue({
      success: true,
      transactionId: 'test-transaction-123'
    });
  });

  it('renders correctly with all payment methods', () => {
    const { getByText, getAllByRole } = render(
      <PaymentScreen navigation={mockNavigation} route={mockRoute} />
    );
    
    // Check title is rendered
    expect(getByText('Select Payment Method')).toBeTruthy();
    
    // Check all payment methods are rendered
    expect(getByText('Credit/Debit Card')).toBeTruthy();
    expect(getByText('Mada')).toBeTruthy();
    expect(getByText('STC Pay')).toBeTruthy();
    expect(getByText('Tabby - Pay Later')).toBeTruthy();
    expect(getByText('Apple Pay')).toBeTruthy();
  });

  it('processes payment when a payment method is selected and pay button is pressed', async () => {
    const { getByText } = render(
      <PaymentScreen navigation={mockNavigation} route={mockRoute} />
    );
    
    // Select a payment method
    fireEvent.press(getByText('Credit/Debit Card'));
    
    // Press the pay button
    fireEvent.press(getByText('Pay Now'));
    
    // Check if payment processing was called
    await waitFor(() => {
      expect(CrossPlatformPaymentHandler.processPayment).toHaveBeenCalledWith(
        'credit-card',
        expect.any(Number),
        'SAR',
        expect.any(String),
        expect.any(Object)
      );
    });
    
    // Check if navigation occurred after successful payment
    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('PaymentSuccess', {
        transactionId: 'test-transaction-123'
      });
    });
  });

  it('shows error message when payment fails', async () => {
    // Mock failed payment
    CrossPlatformPaymentHandler.processPayment.mockRejectedValue(
      new Error('Payment failed')
    );
    
    const { getByText } = render(
      <PaymentScreen navigation={mockNavigation} route={mockRoute} />
    );
    
    // Select a payment method
    fireEvent.press(getByText('Credit/Debit Card'));
    
    // Press the pay button
    fireEvent.press(getByText('Pay Now'));
    
    // Check if error message is displayed
    await waitFor(() => {
      expect(getByText('Payment failed. Please try again.')).toBeTruthy();
    });
    
    // Check that navigation did not occur
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });
});
