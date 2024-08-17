import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // 使用 FontAwesome 图标来显示评分

const ProductItem = ({ product, onPress }) => {
  const renderStars = rating => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <View style={styles.starsContainer}>
        {[...Array(fullStars)].map((_, index) => (
          <Icon key={`full-${index}`} name="star" size={14} color="#FFD700" />
        ))}
        {halfStar === 1 && <Icon name="star-half-empty" size={14} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, index) => (
          <Icon key={`empty-${index}`} name="star-o" size={14} color="#FFD700" />
        ))}
      </View>
    );
  };

  return (
    <TouchableOpacity onPress={() => onPress(product)} style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.ratingContainer}>
          {renderStars(product.rating.rate)}
          <Text style={styles.ratingCount}>({product.rating.count})</Text>
        </View>
        <Text style={styles.price}>Rs. {product.price}</Text>
        <Text style={styles.category}>Category: {product.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  ratingCount: {
    marginLeft: 5,
    fontSize: 12,
    color: '#555',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  category: {
    fontSize: 12,
    color: '#555',
  },
});

export default ProductItem;