import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, TextInput, Card, Title, Paragraph, Divider, Chip, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type DealDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DealDetail'>;
type DealDetailScreenRouteProp = RouteProp<RootStackParamList, 'DealDetail'>;

type Props = {
  navigation: DealDetailScreenNavigationProp;
  route: DealDetailScreenRouteProp;
};

const DealDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { dealId } = route.params;
  const theme = useTheme();
  const [quantity, setQuantity] = useState('1');

  // Mock deal data (in a real app, this would be fetched based on dealId)
  const deal = {
    id: dealId,
    title: 'iPhone 13 Pro Group Deal',
    description: 'Join this group to get 15% off on the latest iPhone model. The iPhone 13 Pro features a stunning Super Retina XDR display with ProMotion, A15 Bionic chip, pro camera system, and all-day battery life.',
    currentMembers: 8,
    targetMembers: 15,
    discount: '15%',
    originalPrice: 4999,
    discountedPrice: 4249,
    expiresIn: '2 days 5 hours',
    image: 'https://images.unsplash.com/photo-1573755069748-4686335a3577?w=800&h=600&q=80',
    category: 'Electronics',
    features: [
      '6.1-inch Super Retina XDR display with ProMotion',
      'A15 Bionic chip with 5-core GPU',
      'Pro camera system with 12MP cameras',
      'Up to 22 hours video playback',
      '5G capable'
    ],
    organizer: {
      name: 'Ahmed Al-Saud',
      rating: 4.8,
      deals: 12
    },
    members: [
      { id: '1', name: 'Ahmed', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: '2', name: 'Sara', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { id: '3', name: 'Mohammed', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
      { id: '4', name: 'Fatima', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
      { id: '5', name: 'Ali', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
      { id: '6', name: 'Nora', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
      { id: '7', name: 'Khalid', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
      { id: '8', name: 'Layla', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
    ]
  };

  const handleJoinDeal = () => {
    navigation.navigate('Payment', { dealId });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: deal.image }} style={styles.image} />
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Title style={styles.title}>{deal.title}</Title>
          <Chip mode="outlined" style={styles.categoryChip}>{deal.category}</Chip>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>SAR {deal.originalPrice}</Text>
          <Text style={styles.discountedPrice}>SAR {deal.discountedPrice}</Text>
          <Chip style={styles.discountChip} mode="flat">{deal.discount} OFF</Chip>
        </View>
        
        <Paragraph style={styles.description}>{deal.description}</Paragraph>
        
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Group Progress</Text>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              {deal.currentMembers}/{deal.targetMembers} members joined
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
          <Text style={styles.progressHint}>
            {deal.targetMembers - deal.currentMembers} more members needed for maximum discount
          </Text>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Product Features</Text>
          {deal.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.organizerSection}>
          <Text style={styles.sectionTitle}>Deal Organizer</Text>
          <View style={styles.organizerInfo}>
            <View style={styles.organizerDetails}>
              <Text style={styles.organizerName}>{deal.organizer.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{deal.organizer.rating} • {deal.organizer.deals} deals</Text>
              </View>
            </View>
          </View>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.membersSection}>
          <Text style={styles.sectionTitle}>Group Members ({deal.currentMembers})</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.membersScroll}>
            {deal.members.map(member => (
              <View key={member.id} style={styles.memberItem}>
                <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
                <Text style={styles.memberName}>{member.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.quantitySection}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantitySelector}>
            <Button 
              mode="outlined" 
              onPress={() => setQuantity(prev => Math.max(1, parseInt(prev) - 1).toString())}
              style={styles.quantityButton}
            >
              <Ionicons name="remove" size={16} />
            </Button>
            <TextInput
              style={styles.quantityInput}
              keyboardType="number-pad"
              value={quantity}
              onChangeText={setQuantity}
            />
            <Button 
              mode="outlined" 
              onPress={() => setQuantity(prev => (parseInt(prev) + 1).toString())}
              style={styles.quantityButton}
            >
              <Ionicons name="add" size={16} />
            </Button>
          </View>
        </View>
        
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>SAR {(deal.discountedPrice * parseInt(quantity)).toFixed(2)}</Text>
        </View>
        
        <View style={styles.actionButtons}>
          <Button 
            mode="contained" 
            style={styles.joinButton}
            onPress={handleJoinDeal}
          >
            Join This Deal
          </Button>
          <Button 
            mode="outlined" 
            style={styles.shareButton}
            icon="share"
          >
            Share with Friends
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 24,
    marginRight: 8,
  },
  categoryChip: {
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    marginRight: 8,
    fontSize: 16,
  },
  discountedPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    marginRight: 8,
  },
  discountChip: {
    backgroundColor: '#e8f5e9',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  progressSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  expiryText: {
    fontSize: 14,
    color: '#666',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressHint: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  divider: {
    marginVertical: 20,
  },
  featuresSection: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 16,
  },
  organizerSection: {
    marginBottom: 20,
  },
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  organizerDetails: {
    marginLeft: 8,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
  },
  membersSection: {
    marginBottom: 20,
  },
  membersScroll: {
    marginTop: 8,
  },
  memberItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 4,
  },
  memberName: {
    fontSize: 12,
  },
  quantitySection: {
    marginBottom: 20,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    borderRadius: 4,
  },
  quantityInput: {
    textAlign: 'center',
    width: 60,
    marginHorizontal: 8,
    height: 40,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  actionButtons: {
    marginBottom: 20,
  },
  joinButton: {
    marginBottom: 12,
    paddingVertical: 8,
  },
  shareButton: {
    paddingVertical: 8,
  },
});

export default DealDetailScreen;
