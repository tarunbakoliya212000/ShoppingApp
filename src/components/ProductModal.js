import React from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity, removeFromCart } from '../actions/cartActions';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductModal = ({ product, visible, onClose }) => {
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

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <Text style={styles.description}>
            <Text style={styles.descriptionTitle}>Description: </Text>
            {product.description}
          </Text>
          <View style={styles.buttonContainer}>
            {cartItem ? (
              <View style={styles.cartActions}>
                <TouchableOpacity onPress={handleDecrement} style={styles.cartButton}>
                  <Icon name="minus" size={14} color="#000" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{cartItem.quantity}</Text>
                <TouchableOpacity onPress={handleIncrement} style={styles.cartButton}>
                  <Icon name="plus" size={14} color="#000" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                <Icon name="shopping-cart" size={14} color="#fff" style={styles.cartIcon} />
                <Text style={styles.addButtonText}>Add To Cart</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  descriptionTitle: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cartActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f4511e',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  cartIcon: {
    marginRight: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#aaa',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductModal;