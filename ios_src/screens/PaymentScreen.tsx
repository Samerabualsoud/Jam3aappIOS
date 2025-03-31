import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { Text, Button, Card, Title, RadioButton, Divider, TextInput, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import PaymentService from '../services/PaymentService';

type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;

type Props = {
  navigation: PaymentScreenNavigationProp;
  route: PaymentScreenRouteProp;
};

// Local image assets for payment logos
const paymentLogos = {
  visa: require('../../assets/visa-logo.png'),
  mastercard: require('../../assets/mastercard-logo.png'),
  mada: require('../../assets/mada-logo.png'),
  applePay: require('../../assets/apple-pay-logo.png'),
  stcPay: require('../../assets/stc-pay-logo.png'),
  tabby: require('../../assets/tabby-logo.png'),
};

const PaymentScreen: React.FC<Props> = ({ navigation, route }) => {
  const { dealId, productId } = route.params;
  const theme = useTheme();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState('en'); // Default to English

  // Get product price from service to ensure consistency with website
  const productPrice = productId ? PaymentService.getProductPrice(productId) : 799;
  
  // Apply 15% discount
  const discountPercentage = 0.15;
  const discountedPrice = Math.round(productPrice * (1 - discountPercentage));

  // Mock deal data (in a real app, this would be fetched based on dealId)
  const deal = {
    id: dealId || 'default',
    title: productId ? `${productId} Group Deal` : 'iPhone 16 Group Deal',
    description: 'Join this group to get 15% off on the latest model',
    currentMembers: 8,
    targetMembers: 15,
    discount: '15%',
    originalPrice: productPrice,
    discountedPrice: discountedPrice,
    expiresIn: '2 days',
    image: 'https://images.unsplash.com/photo-1573755069748-4686335a3577?w=800&h=600&q=80',
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to success screen or show success message
      navigation.navigate('Main');
      // In a real app, you would handle success/failure appropriately
    }, 2000);
  };

  // Translations
  const translations = {
    paymentDetails: {
      en: 'Payment Details',
      ar: 'تفاصيل الدفع'
    },
    orderSummary: {
      en: 'Order Summary',
      ar: 'ملخص الطلب'
    },
    total: {
      en: 'Total',
      ar: 'المجموع'
    },
    paymentMethod: {
      en: 'Payment Method',
      ar: 'طريقة الدفع'
    },
    creditCard: {
      en: 'Credit/Debit Card',
      ar: 'بطاقة ائتمان/خصم'
    },
    applePay: {
      en: 'Apple Pay',
      ar: 'آبل باي'
    },
    stcPay: {
      en: 'STC Pay',
      ar: 'إس تي سي باي'
    },
    tabby: {
      en: 'Tabby - Pay Later',
      ar: 'تابي - ادفع لاحقاً'
    },
    splitPayments: {
      en: 'Split into 4 interest-free payments',
      ar: 'قسّم إلى 4 دفعات بدون فوائد'
    },
    cardDetails: {
      en: 'Card Details',
      ar: 'تفاصيل البطاقة'
    },
    cardNumber: {
      en: 'Card Number',
      ar: 'رقم البطاقة'
    },
    cardholderName: {
      en: 'Cardholder Name',
      ar: 'اسم حامل البطاقة'
    },
    expiryDate: {
      en: 'Expiry Date',
      ar: 'تاريخ الانتهاء'
    },
    cvv: {
      en: 'CVV',
      ar: 'رمز التحقق'
    },
    pay: {
      en: 'Pay',
      ar: 'ادفع'
    },
    processing: {
      en: 'Processing...',
      ar: 'جاري المعالجة...'
    },
    securePayment: {
      en: 'Secure payment processed by Moyasar',
      ar: 'دفع آمن تتم معالجته بواسطة ميسر'
    }
  };

  // Helper function to get translated text
  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Title style={styles.title}>{t('paymentDetails')}</Title>
        
        <Card style={styles.orderSummaryCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>{t('orderSummary')}</Title>
            <View style={styles.orderItem}>
              <View style={styles.orderItemDetails}>
                <Text style={styles.orderItemTitle}>{deal.title}</Text>
                <Text style={styles.orderItemPrice}>SAR {deal.discountedPrice}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>{t('total')}</Text>
              <Text style={styles.totalAmount}>SAR {deal.discountedPrice}</Text>
            </View>
          </Card.Content>
        </Card>
        
        <Title style={styles.sectionTitle}>{t('paymentMethod')}</Title>
        
        <RadioButton.Group onValueChange={value => setPaymentMethod(value)} value={paymentMethod}>
          <Card style={styles.paymentMethodCard}>
            <Card.Content style={styles.paymentMethodContent}>
              <RadioButton value="credit-card" />
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodTitle}>{t('creditCard')}</Text>
                <View style={styles.paymentLogos}>
                  <Image source={paymentLogos.visa} style={styles.paymentLogo} />
                  <Image source={paymentLogos.mastercard} style={styles.paymentLogo} />
                  <Image source={paymentLogos.mada} style={styles.paymentLogo} />
                </View>
              </View>
            </Card.Content>
          </Card>
          
          {Platform.OS === 'ios' && (
            <Card style={styles.paymentMethodCard}>
              <Card.Content style={styles.paymentMethodContent}>
                <RadioButton value="apple-pay" />
                <View style={styles.paymentMethodInfo}>
                  <Text style={styles.paymentMethodTitle}>{t('applePay')}</Text>
                  <Image source={paymentLogos.applePay} style={styles.paymentLogo} />
                </View>
              </Card.Content>
            </Card>
          )}
          
          <Card style={styles.paymentMethodCard}>
            <Card.Content style={styles.paymentMethodContent}>
              <RadioButton value="stc-pay" />
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodTitle}>{t('stcPay')}</Text>
                <Image source={paymentLogos.stcPay} style={styles.paymentLogo} />
              </View>
            </Card.Content>
          </Card>
          
          <Card style={styles.paymentMethodCard}>
            <Card.Content style={styles.paymentMethodContent}>
              <RadioButton value="tabby" />
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodTitle}>{t('tabby')}</Text>
                <Text style={styles.paymentMethodSubtitle}>{t('splitPayments')}</Text>
                <Image source={paymentLogos.tabby} style={styles.paymentLogo} />
              </View>
            </Card.Content>
          </Card>
        </RadioButton.Group>
        
        {paymentMethod === 'credit-card' && (
          <Card style={styles.cardDetailsCard}>
            <Card.Content>
              <Title style={styles.cardTitle}>{t('cardDetails')}</Title>
              
              <TextInput
                label={t('cardNumber')}
                value={cardNumber}
                onChangeText={setCardNumber}
                style={styles.input}
                keyboardType="number-pad"
                placeholder="1234 5678 9012 3456"
                left={<TextInput.Icon icon="credit-card" />}
              />
              
              <TextInput
                label={t('cardholderName')}
                value={cardName}
                onChangeText={setCardName}
                style={styles.input}
                placeholder="John Doe"
                left={<TextInput.Icon icon="account" />}
              />
              
              <View style={styles.rowInputs}>
                <TextInput
                  label={t('expiryDate')}
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                  style={[styles.input, styles.halfInput]}
                  placeholder="MM/YY"
                  keyboardType="number-pad"
                  left={<TextInput.Icon icon="calendar" />}
                />
                
                <TextInput
                  label={t('cvv')}
                  value={cvv}
                  onChangeText={setCvv}
                  style={[styles.input, styles.halfInput]}
                  placeholder="123"
                  keyboardType="number-pad"
                  secureTextEntry
                  left={<TextInput.Icon icon="lock" />}
                />
              </View>
            </Card.Content>
          </Card>
        )}
        
        <Button
          mode="contained"
          style={styles.payButton}
          loading={isProcessing}
          disabled={isProcessing}
          onPress={handlePayment}
        >
          {isProcessing ? t('processing') : `${t('pay')} SAR ${deal.discountedPrice}`}
        </Button>
        
        <View style={styles.securePaymentInfo}>
          <Ionicons name="lock-closed" size={16} color="#666" />
          <Text style={styles.securePaymentText}>
            {t('securePayment')}
          </Text>
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
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  orderSummaryCard: {
    marginBottom: 24,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  orderItemDetails: {
    flex: 1,
  },
  orderItemTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  orderItemPrice: {
    fontSize: 16,
    color: '#666',
  },
  divider: {
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 16,
  },
  paymentMethodCard: {
    marginBottom: 12,
    elevation: 1,
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodInfo: {
    marginLeft: 8,
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentMethodSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  paymentLogos: {
    flexDirection: 'row',
    marginTop: 8,
  },
  paymentLogo: {
    width: 40,
    height: 25,
    resizeMode: 'contain',
    marginRight: 8,
  },
  cardDetailsCard: {
    marginTop: 16,
    marginBottom: 24,
    elevation: 2,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  payButton: {
    paddingVertical: 8,
    marginBottom: 16,
  },
  securePaymentInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  securePaymentText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
});

export default PaymentScreen;
