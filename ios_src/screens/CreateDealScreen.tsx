import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, TextInput, Title, Paragraph, useTheme, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type CreateDealScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateDeal'>;

type Props = {
  navigation: CreateDealScreenNavigationProp;
};

const CreateDealScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [targetMembers, setTargetMembers] = useState('10');
  const [discount, setDiscount] = useState('15');
  const [category, setCategory] = useState('Electronics');
  const [isLoading, setIsLoading] = useState(false);

  // Categories
  const categories = ['Electronics', 'Fashion', 'Gaming', 'Home', 'Beauty', 'Sports', 'Other'];

  const handleCreateDeal = () => {
    setIsLoading(true);
    
    // Simulate deal creation process
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Main');
    }, 1500);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Title style={styles.title}>Create New Deal</Title>
        <Paragraph style={styles.subtitle}>Start a group buying deal and invite others to join</Paragraph>
        
        <TextInput
          label="Deal Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="e.g. iPhone 13 Pro Group Deal"
        />
        
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
          numberOfLines={4}
          placeholder="Describe the product and deal details"
        />
        
        <View style={styles.rowInputs}>
          <TextInput
            label="Original Price (SAR)"
            value={price}
            onChangeText={setPrice}
            style={[styles.input, styles.halfInput]}
            keyboardType="numeric"
            placeholder="e.g. 4999"
          />
          
          <TextInput
            label="Target Members"
            value={targetMembers}
            onChangeText={setTargetMembers}
            style={[styles.input, styles.halfInput]}
            keyboardType="numeric"
            placeholder="e.g. 10"
          />
        </View>
        
        <TextInput
          label="Discount Percentage"
          value={discount}
          onChangeText={setDiscount}
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 15"
          right={<TextInput.Affix text="%" />}
        />
        
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.categoriesContainer}>
          {categories.map(cat => (
            <Chip
              key={cat}
              selected={category === cat}
              onPress={() => setCategory(cat)}
              style={styles.categoryChip}
              mode={category === cat ? 'flat' : 'outlined'}
            >
              {cat}
            </Chip>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Upload Product Images</Text>
        <View style={styles.uploadContainer}>
          <Button 
            mode="outlined" 
            icon="camera" 
            style={styles.uploadButton}
          >
            Take Photo
          </Button>
          <Button 
            mode="outlined" 
            icon="image" 
            style={styles.uploadButton}
          >
            Choose from Gallery
          </Button>
        </View>
        
        <View style={styles.previewImagesContainer}>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="add" size={32} color="#ccc" />
          </View>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="add" size={32} color="#ccc" />
          </View>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="add" size={32} color="#ccc" />
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Deal Duration</Text>
        <View style={styles.durationContainer}>
          <Chip
            selected={true}
            style={styles.durationChip}
            mode="flat"
          >
            7 Days
          </Chip>
          <Chip
            selected={false}
            style={styles.durationChip}
            mode="outlined"
          >
            14 Days
          </Chip>
          <Chip
            selected={false}
            style={styles.durationChip}
            mode="outlined"
          >
            30 Days
          </Chip>
        </View>
        
        <View style={styles.summaryContainer}>
          <Title style={styles.summaryTitle}>Deal Summary</Title>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Original Price:</Text>
            <Text style={styles.summaryValue}>
              SAR {price ? parseFloat(price).toFixed(2) : '0.00'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount:</Text>
            <Text style={styles.summaryValue}>
              {discount}%
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discounted Price:</Text>
            <Text style={styles.summaryValue}>
              SAR {price && discount ? (parseFloat(price) * (1 - parseFloat(discount) / 100)).toFixed(2) : '0.00'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Target Members:</Text>
            <Text style={styles.summaryValue}>
              {targetMembers}
            </Text>
          </View>
        </View>
        
        <Button 
          mode="contained" 
          style={styles.createButton}
          loading={isLoading}
          disabled={isLoading || !title || !description || !price || !targetMembers || !discount}
          onPress={handleCreateDeal}
        >
          Create Deal
        </Button>
        
        <Paragraph style={styles.termsText}>
          By creating a deal, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Community Guidelines</Text>
        </Paragraph>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryChip: {
    margin: 4,
  },
  uploadContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  uploadButton: {
    flex: 1,
    marginRight: 8,
  },
  previewImagesContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  durationChip: {
    marginRight: 8,
  },
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  createButton: {
    paddingVertical: 8,
    marginBottom: 16,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  linkText: {
    color: '#6200ee',
  },
});

export default CreateDealScreen;
