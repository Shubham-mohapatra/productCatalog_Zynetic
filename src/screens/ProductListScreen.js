import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  FlatList, 
  SafeAreaView, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text,
  Animated,
  ActivityIndicator
} from 'react-native';
import { fetchProducts, searchProducts } from '../api/productApi';
import AnimatedProductCard from '../components/ProductCard';
import AnimatedLoadingIndicator from '../components/LoadingIndicator';
import ErrorView from '../components/ErrorView';
import { Ionicons } from '@expo/vector-icons';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadProducts();
      return;
    }
    
    try {
      setSearching(true);
      setError(null);
      const results = await searchProducts(searchQuery);
      setProducts(results);
    } catch (err) {
      setError('Failed to search products. Please try again.');
      console.error(err);
    } finally {
      setSearching(false);
    }
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleProductPress = (productId) => {
    navigation.navigate('ProductDetails', { productId });
  };
  
  // Header animation based on scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });
  
  const headerElevation = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 5],
    extrapolate: 'clamp',
  });

  if (loading) {
    return <AnimatedLoadingIndicator message="Loading products..." />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={loadProducts} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: headerOpacity,
            elevation: headerElevation,
            shadowOpacity: headerElevation.interpolate({
              inputRange: [0, 5],
              outputRange: [0, 0.1],
            }),
          }
        ]}
      >
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => {
                setSearchQuery('');
                loadProducts();
              }}
            >
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Ionicons name="search" size={24} color="#007BFF" />
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      {searching && (
        <View style={styles.searchingContainer}>
          <ActivityIndicator size="small" color="#007BFF" />
          <Text style={styles.searchingText}>Searching...</Text>
        </View>
      )}
      
      <Animated.FlatList
        data={products}
        renderItem={({ item, index }) => (
          <AnimatedProductCard 
            product={item} 
            onPress={() => handleProductPress(item.id)}
            index={index}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No products found matching your search.' : 'No products available.'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  clearButton: {
    position: 'absolute',
    right: 50,
    padding: 8,
  },
  searchButton: {
    marginLeft: 8,
    padding: 8,
  },
  searchingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
  },
  searchingText: {
    marginLeft: 8,
    color: '#007BFF',
    fontSize: 14,
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ProductListScreen;