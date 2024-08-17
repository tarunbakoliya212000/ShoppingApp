import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../actions/cartActions';
import ProductItem from '../components/ProductItem';
import ProductModal from '../components/ProductModal';

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddToCart = product => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    setSelectedProduct(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem product={item} onPress={setSelectedProduct} />
        )}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          visible={true}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default ProductListScreen;