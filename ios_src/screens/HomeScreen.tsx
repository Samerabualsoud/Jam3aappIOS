import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Title, Paragraph, Chip, Badge, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  // Mock featured deals data
  const featuredDeals = [
    {
      id: '1',
      title: 'iPhone 13 Pro Group Deal',
      description: 'Join this group to get 15% off on the latest iPhone model',
      currentMembers: 8,
      targetMembers: 15,
      discount: '15%',
      originalPrice: 4999,
      discountedPrice: 4249,
      expiresIn: '2 days',
      image: 'https://images.unsplash.com/photo-1573755069748-4686335a3577?w=800&h=600&q=80'
    },
    {
      id: '2',
      title: 'Samsung Galaxy S22 Ultra',
      description: 'Premium Android experience with 20% group discount',
      currentMembers: 12,
      targetMembers: 20,
      discount: '20%',
      originalPrice: 4599,
      discountedPrice: 3679,
      expiresIn: '5 days',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&q=80'
    },
    {
      id: '3',
      title: 'Sony WH-1000XM4 Headphones',
      description: 'Premium noise cancelling headphones with group discount',
      currentMembers: 6,
      targetMembers: 10,
      discount: '12%',
      originalPrice: 1299,
      discountedPrice: 1143,
      expiresIn: '3 days',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=600&q=80'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <Text style={styles.heroTitle}>Group Buying. Real Discounts.</Text>
        <Text style={styles.heroSubtitle}>
          Join a Jam3a (group) to unlock wholesale discounts that increase with each new member.
        </Text>
        <Button 
          mode="contained" 
          style={styles.heroButton}
          onPress={() => navigation.navigate('CreateDeal')}
        >
          Start a Deal
        </Button>
      </View>

      {/* Featured Deals Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Deals</Text>
          <Button 
            mode="text" 
            onPress={() => navigation.navigate('Deals')}
            style={{ marginRight: -8 }}
          >
            View All
          </Button>
        </View>

        {featuredDeals.map(deal => (
          <Card 
            key={deal.id} 
            style={styles.dealCard}
            onPress={() => navigation.navigate('DealDetail', { dealId: deal.id })}
          >
            <Card.Cover source={{ uri: deal.image }} />
            <Card.Content style={styles.cardContent}>
              <View style={styles.discountBadge}>
                <Badge size={30}>{deal.discount} OFF</Badge>
              </View>
              <Title>{deal.title}</Title>
              <Paragraph style={styles.dealDescription}>{deal.description}</Paragraph>
              
              <View style={styles.priceContainer}>
                <Text style={styles.originalPrice}>SAR {deal.originalPrice}</Text>
                <Text style={styles.discountedPrice}>SAR {deal.discountedPrice}</Text>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressText}>
                    {deal.currentMembers}/{deal.targetMembers} members
                  </Text>
                  <Text style={styles.expiryText}>
                    <Ionicons name="time-outline" size={14} /> {deal.expiresIn} left
                  </Text>
                </View>
                <View style={styles.progressBarBackground}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { 
                        width: `${(deal.currentMembers / deal.targetMembers) * 100}%`,
                        backgroundColor: theme.colors.primary 
                      }
                    ]} 
                  />
                </View>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={() => navigation.navigate('DealDetail', { dealId: deal.id })}>
                Join This Deal
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>

      {/* How It Works Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        
        <View style={styles.stepContainer}>
          <View style={[styles.stepIcon, { backgroundColor: theme.colors.primary + '20' }]}>
            <Ionicons name="people-outline" size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Join a Group</Text>
            <Text style={styles.stepDescription}>
              Browse active deals or create your own group purchase
            </Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={[styles.stepIcon, { backgroundColor: theme.colors.primary + '20' }]}>
            <Ionicons name="share-social-outline" size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Invite Friends</Text>
            <Text style={styles.stepDescription}>
              Share with friends via WhatsApp to increase group size and discounts
            </Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={[styles.stepIcon, { backgroundColor: theme.colors.primary + '20' }]}>
            <Ionicons name="pricetag-outline" size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Get Discounts</Text>
            <Text style={styles.stepDescription}>
              Once the group target is reached, everyone gets the discount
            </Text>
          </View>
        </View>
      </View>

      {/* Payment Methods Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        <View style={styles.paymentMethodsContainer}>
          <Chip style={styles.paymentChip} mode="outlined">Visa</Chip>
          <Chip style={styles.paymentChip} mode="outlined">Mastercard</Chip>
          <Chip style={styles.paymentChip} mode="outlined">Mada</Chip>
          <Chip style={styles.paymentChip} mode="outlined">Apple Pay</Chip>
          <Chip style={styles.paymentChip} mode="outlined">STC Pay</Chip>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  heroContainer: {
    padding: 20,
    backgroundColor: '#6200ee',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  heroButton: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  sectionContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dealCard: {
    marginBottom: 16,
    elevation: 2,
  },
  cardContent: {
    position: 'relative',
    paddingTop: 16,
  },
  discountBadge: {
    position: 'absolute',
    top: -15,
    right: 16,
  },
  dealDescription: {
    marginBottom: 12,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  expiryText: {
    fontSize: 12,
    color: '#666',
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepDescription: {
    color: '#666',
  },
  paymentMethodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  paymentChip: {
    margin: 4,
  },
});

export default HomeScreen;
