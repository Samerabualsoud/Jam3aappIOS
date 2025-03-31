import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Card, Button, Title, Paragraph, Searchbar, Chip, Badge, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type DealsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: DealsScreenNavigationProp;
};

const DealsScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock deals data
  const deals = [
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
      image: 'https://images.unsplash.com/photo-1573755069748-4686335a3577?w=800&h=600&q=80',
      category: 'Electronics'
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
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&q=80',
      category: 'Electronics'
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
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=600&q=80',
      category: 'Electronics'
    },
    {
      id: '4',
      title: 'Nike Air Jordan 1 Retro',
      description: 'Classic sneakers with group buying discount',
      currentMembers: 5,
      targetMembers: 12,
      discount: '10%',
      originalPrice: 899,
      discountedPrice: 809,
      expiresIn: '7 days',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&h=600&q=80',
      category: 'Fashion'
    },
    {
      id: '5',
      title: 'PlayStation 5 Console',
      description: 'Next-gen gaming with exclusive group discount',
      currentMembers: 15,
      targetMembers: 25,
      discount: '8%',
      originalPrice: 2299,
      discountedPrice: 2115,
      expiresIn: '4 days',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&q=80',
      category: 'Gaming'
    },
  ];

  // Categories
  const categories = ['All', 'Electronics', 'Fashion', 'Gaming', 'Home', 'Beauty'];

  // Filter deals based on search and category
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         deal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || selectedCategory === 'All' || deal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const renderDealCard = ({ item }: { item: typeof deals[0] }) => (
    <Card 
      style={styles.dealCard}
      onPress={() => navigation.navigate('DealDetail', { dealId: item.id })}
    >
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content style={styles.cardContent}>
        <View style={styles.discountBadge}>
          <Badge size={30}>{item.discount} OFF</Badge>
        </View>
        <Title>{item.title}</Title>
        <Paragraph style={styles.dealDescription}>{item.description}</Paragraph>
        
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>SAR {item.originalPrice}</Text>
          <Text style={styles.discountedPrice}>SAR {item.discountedPrice}</Text>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              {item.currentMembers}/{item.targetMembers} members
            </Text>
            <Text style={styles.expiryText}>
              <Ionicons name="time-outline" size={14} /> {item.expiresIn} left
            </Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { 
                  width: `${(item.currentMembers / item.targetMembers) * 100}%`,
                  backgroundColor: theme.colors.primary 
                }
              ]} 
            />
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => navigation.navigate('DealDetail', { dealId: item.id })}>
          Join This Deal
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search deals..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => (
            <Chip
              key={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category === 'All' ? null : category)}
              style={styles.categoryChip}
              mode={selectedCategory === category ? 'flat' : 'outlined'}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredDeals}
        renderItem={renderDealCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.dealsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No deals found</Text>
            <Button 
              mode="contained" 
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
            >
              Clear Filters
            </Button>
          </View>
        }
      />

      <Button 
        mode="contained" 
        icon="plus" 
        style={styles.createDealButton}
        onPress={() => navigation.navigate('CreateDeal')}
      >
        Create New Deal
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 0,
    backgroundColor: '#f0f0f0',
  },
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  categoryChip: {
    marginHorizontal: 4,
  },
  dealsList: {
    padding: 16,
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginVertical: 16,
  },
  createDealButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 28,
    paddingHorizontal: 16,
  },
});

export default DealsScreen;
