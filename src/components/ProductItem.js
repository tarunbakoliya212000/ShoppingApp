import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity, removeFromCart } from '../actions/cartActions';

const ProductItem = ({ product, onPress }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(state =>
    state.cart.items.find(item => item.id === product.id)
  );

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = () => {
    if (cartItem.quantity === 1) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(decrementQuantity(product.id));
    }
  };

  const renderStars = rating => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <View style={styles.starsContainer}>
        {[...Array(fullStars)].map((_, index) => (
          <Icon key={`full-${index}`} name="star" size={14} color="#FFD700" />
        ))}
        {halfStar === 1 && <Icon key="half" name="star-half-empty" size={14} color="#FFD700" />}
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
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Rs. {product.price}</Text>
          <View style={styles.cartActions}>
            {cartItem ? (
              <>
                <TouchableOpacity onPress={handleDecrement} style={styles.cartButton}>
                  <Icon name="minus" size={14} color="#000" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{cartItem.quantity}</Text>
                <TouchableOpacity onPress={handleIncrement} style={styles.cartButton}>
                  <Icon name="plus" size={14} color="#000" />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
                <Icon name="shopping-cart" size={14} color="#fff" style={styles.cartIcon} />
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
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
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
  category: {
    fontSize: 12,
    color: '#555',
  },
  cartActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f4511e',
    borderRadius: 5,
    justifyContent: 'center',
  },
  cartIcon: {
    marginRight: 5,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductItem;