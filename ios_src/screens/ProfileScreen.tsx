import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, Card, Title, Avatar, Divider, List, Switch, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Mock user data
  const user = {
    id: '1',
    name: 'Mohammed Al-Qahtani',
    email: 'mohammed@example.com',
    phone: '+966 50 123 4567',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    joinedDate: 'March 2023',
    activeDeals: 3,
    completedDeals: 12,
    savedAmount: 2450,
  };

  // Mock active deals
  const activeDeals = [
    {
      id: '1',
      title: 'iPhone 13 Pro Group Deal',
      status: 'In Progress',
      members: '8/15',
      expiresIn: '2 days',
      image: 'https://images.unsplash.com/photo-1573755069748-4686335a3577?w=800&h=600&q=80',
    },
    {
      id: '2',
      title: 'Samsung Galaxy S22 Ultra',
      status: 'In Progress',
      members: '12/20',
      expiresIn: '5 days',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&q=80',
    },
    {
      id: '3',
      title: 'Sony WH-1000XM4 Headphones',
      status: 'In Progress',
      members: '6/10',
      expiresIn: '3 days',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=600&q=80',
    },
  ];

  const handleLogout = () => {
    // In a real app, implement logout logic
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Avatar.Image source={{ uri: user.avatar }} size={80} />
          <View style={styles.userInfo}>
            <Title style={styles.userName}>{user.name}</Title>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.userJoined}>Member since {user.joinedDate}</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.activeDeals}</Text>
            <Text style={styles.statLabel}>Active Deals</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.completedDeals}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>SAR {user.savedAmount}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>My Active Deals</Title>
        {activeDeals.map(deal => (
          <Card 
            key={deal.id} 
            style={styles.dealCard}
            onPress={() => navigation.navigate('DealDetail', { dealId: deal.id })}
          >
            <Card.Content style={styles.dealCardContent}>
              <Image source={{ uri: deal.image }} style={styles.dealImage} />
              <View style={styles.dealInfo}>
                <Text style={styles.dealTitle}>{deal.title}</Text>
                <View style={styles.dealStatusContainer}>
                  <Text style={styles.dealStatus}>{deal.status}</Text>
                  <Text style={styles.dealMembers}>
                    <Ionicons name="people-outline" size={14} /> {deal.members}
                  </Text>
                  <Text style={styles.dealExpiry}>
                    <Ionicons name="time-outline" size={14} /> {deal.expiresIn}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
        <Button 
          mode="outlined" 
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('Deals')}
        >
          View All Deals
        </Button>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Account Settings</Title>
        <Card style={styles.settingsCard}>
          <List.Item
            title="Personal Information"
            left={props => <List.Icon {...props} icon="account" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Payment Methods"
            left={props => <List.Icon {...props} icon="credit-card" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Address Book"
            left={props => <List.Icon {...props} icon="map-marker" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Notifications"
            left={props => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                color={theme.colors.primary}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Dark Mode"
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                color={theme.colors.primary}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Language"
            description="English"
            left={props => <List.Icon {...props} icon="translate" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </Card>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Support</Title>
        <Card style={styles.settingsCard}>
          <List.Item
            title="Help Center"
            left={props => <List.Icon {...props} icon="help-circle" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Contact Us"
            left={props => <List.Icon {...props} icon="message" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Terms & Conditions"
            left={props => <List.Icon {...props} icon="file-document" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </Card>
      </View>

      <Button 
        mode="outlined" 
        style={styles.logoutButton}
        icon="logout"
        onPress={handleLogout}
      >
        Log Out
      </Button>

      <View style={styles.versionInfo}>
        <Text style={styles.versionText}>Jam3a v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    color: 'white',
    fontSize: 22,
    marginBottom: 4,
  },
  userEmail: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  userJoined: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  dealCard: {
    marginBottom: 12,
  },
  dealCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dealImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  dealInfo: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dealStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dealStatus: {
    fontSize: 12,
    color: '#6200ee',
    marginRight: 8,
  },
  dealMembers: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  dealExpiry: {
    fontSize: 12,
    color: '#666',
  },
  viewAllButton: {
    marginTop: 8,
  },
  settingsCard: {
    marginBottom: 16,
  },
  logoutButton: {
    margin: 16,
    borderColor: '#f44336',
    borderWidth: 1,
  },
  versionInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  versionText: {
    color: '#999',
    fontSize: 12,
  },
});

export default ProfileScreen;
