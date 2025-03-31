import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import { AndroidUtils } from '../utils/AndroidSpecificUtils';

/**
 * Cross-platform utilities for consistent functionality across iOS and Android
 */
export const CrossPlatformUtils = {
  /**
   * Show a notification to the user (works on both iOS and Android)
   * @param title Notification title
   * @param body Notification body
   */
  showNotification: async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: null, // Show immediately
    });
  },

  /**
   * Store data in device storage
   * @param key Storage key
   * @param value Value to store
   */
  storeData: async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (e) {
      console.error('Error storing data:', e);
      return false;
    }
  },

  /**
   * Retrieve data from device storage
   * @param key Storage key
   */
  getData: async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Error retrieving data:', e);
      return null;
    }
  },

  /**
   * Share content with other apps
   * @param message Message to share
   * @param url Optional URL to share
   */
  shareContent: async (message: string, url?: string) => {
    try {
      const shareMessage = url ? `${message}\n${url}` : message;
      
      if (Platform.OS === 'ios') {
        await Sharing.shareAsync(shareMessage);
      } else {
        // Use Android-specific sharing
        if (url) {
          await Linking.openURL(`whatsapp://send?text=${encodeURIComponent(shareMessage)}`);
        } else {
          AndroidUtils.showToast('Sharing content...', 'SHORT');
          // Implement Android sharing
          await Sharing.shareAsync(shareMessage);
        }
      }
      return true;
    } catch (e) {
      console.error('Error sharing content:', e);
      return false;
    }
  },

  /**
   * Show feedback to user in a platform-appropriate way
   * @param message Message to show
   */
  showFeedback: (message: string) => {
    if (Platform.OS === 'android') {
      AndroidUtils.showToast(message, 'SHORT');
      AndroidUtils.vibrate([0, 50]);
    } else {
      // On iOS, we'll use a notification since there's no direct Toast equivalent
      CrossPlatformUtils.showNotification('Jam3a', message);
    }
  },

  /**
   * Open URL in browser
   * @param url URL to open
   */
  openURL: async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
        return true;
      } else {
        console.error(`Cannot open URL: ${url}`);
        return false;
      }
    } catch (e) {
      console.error('Error opening URL:', e);
      return false;
    }
  },

  /**
   * Get platform-specific styling
   * @param iosStyle iOS style object
   * @param androidStyle Android style object
   */
  getPlatformStyle: (iosStyle: any, androidStyle: any) => {
    return Platform.OS === 'ios' ? iosStyle : androidStyle;
  },

  /**
   * Get device information
   */
  getDeviceInfo: () => {
    return {
      platform: Platform.OS,
      version: Platform.Version,
      isTV: Platform.isTV,
    };
  }
};

export default CrossPlatformUtils;
