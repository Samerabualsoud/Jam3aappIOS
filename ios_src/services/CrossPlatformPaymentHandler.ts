import React from 'react';
import { Platform } from 'react-native';
import { PaymentService } from './PaymentService';
import CrossPlatformUtils from '../utils/CrossPlatformUtils';

/**
 * Cross-platform payment handler that works consistently across iOS and Android
 */
export class CrossPlatformPaymentHandler {
  /**
   * Process a payment with appropriate platform-specific implementations
   * @param paymentMethod Payment method (credit-card, apple-pay, google-pay, etc.)
   * @param amount Amount to charge
   * @param currency Currency code (e.g., SAR)
   * @param description Payment description
   * @param metadata Additional payment metadata
   */
  static async processPayment(
    paymentMethod: string,
    amount: number,
    currency: string = 'SAR',
    description: string,
    metadata: any = {}
  ) {
    try {
      // Show platform-appropriate loading indicator
      CrossPlatformUtils.showFeedback('Processing payment...');
      
      // Handle platform-specific payment methods
      if (paymentMethod === 'apple-pay' && Platform.OS !== 'ios') {
        throw new Error('Apple Pay is only available on iOS devices');
      }
      
      if (paymentMethod === 'google-pay' && Platform.OS !== 'android') {
        throw new Error('Google Pay is only available on Android devices');
      }
      
      // Use STC Pay for both platforms but with platform-specific implementations
      if (paymentMethod === 'stc-pay') {
        if (Platform.OS === 'ios') {
          // iOS-specific STC Pay implementation
          return await PaymentService.processSTCPayiOS(amount, currency, description);
        } else {
          // Android-specific STC Pay implementation
          return await PaymentService.processSTCPayAndroid(amount, currency, description);
        }
      }
      
      // For credit cards, use Moyasar on both platforms
      if (paymentMethod === 'credit-card') {
        return await PaymentService.processCreditCard(amount, currency, description, metadata);
      }
      
      // For Tabby (Buy Now Pay Later), use same implementation on both platforms
      if (paymentMethod === 'tabby') {
        return await PaymentService.processTabby(amount, currency, description, metadata);
      }
      
      // For platform-specific payment methods
      if (Platform.OS === 'ios' && paymentMethod === 'apple-pay') {
        return await PaymentService.processApplePay(amount, currency, description);
      }
      
      if (Platform.OS === 'android' && paymentMethod === 'google-pay') {
        return await PaymentService.processGooglePay(amount, currency, description);
      }
      
      throw new Error(`Unsupported payment method: ${paymentMethod}`);
    } catch (error) {
      console.error('Payment processing error:', error);
      CrossPlatformUtils.showFeedback(`Payment failed: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Save payment method for future use
   * @param paymentMethod Payment method details
   * @param setAsDefault Whether to set as default payment method
   */
  static async savePaymentMethod(paymentMethod: any, setAsDefault: boolean = false) {
    try {
      // Store payment method securely based on platform
      if (Platform.OS === 'ios') {
        // Use iOS Keychain for secure storage
        // This would use a native module in a real implementation
        await CrossPlatformUtils.storeData('savedPaymentMethod', paymentMethod);
      } else {
        // Use Android secure storage
        // This would use a native module in a real implementation
        await CrossPlatformUtils.storeData('savedPaymentMethod', paymentMethod);
      }
      
      if (setAsDefault) {
        await CrossPlatformUtils.storeData('defaultPaymentMethod', paymentMethod);
      }
      
      return true;
    } catch (error) {
      console.error('Error saving payment method:', error);
      return false;
    }
  }
  
  /**
   * Get saved payment methods
   */
  static async getSavedPaymentMethods() {
    try {
      return await CrossPlatformUtils.getData('savedPaymentMethod');
    } catch (error) {
      console.error('Error retrieving payment methods:', error);
      return null;
    }
  }
  
  /**
   * Get available payment methods based on platform
   */
  static getAvailablePaymentMethods() {
    const commonMethods = [
      { id: 'credit-card', name: 'Credit/Debit Card', icon: 'card' },
      { id: 'mada', name: 'Mada', icon: 'card' },
      { id: 'stc-pay', name: 'STC Pay', icon: 'phone-portrait' },
      { id: 'tabby', name: 'Tabby - Pay Later', icon: 'time' },
    ];
    
    if (Platform.OS === 'ios') {
      return [
        ...commonMethods,
        { id: 'apple-pay', name: 'Apple Pay', icon: 'logo-apple' }
      ];
    } else {
      return [
        ...commonMethods,
        { id: 'google-pay', name: 'Google Pay', icon: 'logo-google' }
      ];
    }
  }
}

export default CrossPlatformPaymentHandler;
