import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TidioChatService from '../services/TidioChatService';

const ChatbotButton = ({ language = 'en' }) => {
  const handlePress = () => {
    TidioChatService.openChat(language);
  };

  return (
    <TouchableOpacity 
      style={styles.chatButton} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Icon name="chat" size={24} color="#FFFFFF" />
      <Text style={styles.buttonText}>Support</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4A6CF7',
    borderRadius: 30,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: 'bold',
  }
});

export default ChatbotButton;
