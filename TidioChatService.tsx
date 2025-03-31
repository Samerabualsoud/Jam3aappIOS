import React, { useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import WebView from 'react-native-webview';

const TidioChatService = {
  initialize: (language = 'en') => {
    // Create the Tidio chat URL with language parameter
    const tidioUrl = `https://widget-v4.tidiochat.com/1_117_1/index.html?apiKey=huyiqjttwuxdw0owlavgwuthf5yrug7s&lang=${language}`;
    
    // Open Tidio chat in a WebView or browser
    if (Platform.OS === 'web') {
      // For web (should not happen in React Native, but just in case)
      window.open(tidioUrl, '_blank');
    } else {
      // For mobile
      Linking.openURL(tidioUrl);
    }
  },
  
  // Method to open the chat
  openChat: (language = 'en') => {
    TidioChatService.initialize(language);
  }
};

export default TidioChatService;
