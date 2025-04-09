import React, { useState } from 'react';
import { StyleSheet, View, Image, Dimensions, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

const ImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
    if (slideIndex !== activeIndex) {
      setActiveIndex(slideIndex);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image 
        source={{ uri: item }} 
        style={styles.image} 
        resizeMode="cover"
      />
    </View>
  );

  const renderDot = (index) => (
    <View
      key={index}
      style={[
        styles.dot,
        { backgroundColor: index === activeIndex ? '#007BFF' : '#ccc' }
      ]}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.pagination}>
        {images.map((_, index) => renderDot(index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  slide: {
    width,
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default ImageCarousel;