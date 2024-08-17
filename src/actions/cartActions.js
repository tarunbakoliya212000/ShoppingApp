export const addToCart = product => ({
  type: 'ADD_TO_CART',
  payload: product,
});

export const incrementQuantity = productId => ({
  type: 'INCREMENT_QUANTITY',
  productId,
});

export const decrementQuantity = productId => ({
  type: 'DECREMENT_QUANTITY',
  productId,
});

export const removeFromCart = productId => ({
  type: 'REMOVE_FROM_CART',
  productId,
});