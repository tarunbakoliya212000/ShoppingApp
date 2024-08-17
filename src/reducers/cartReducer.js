const initialState = {
    items: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          items: [...state.items, action.product],
        };
      case 'INCREMENT_QUANTITY':
        return {
          ...state,
          items: state.items.map(item => 
            item.id === action.productId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      case 'DECREMENT_QUANTITY':
        return {
          ...state,
          items: state.items.map(item => 
            item.id === action.productId ? { ...item, quantity: item.quantity - 1 } : item
          ),
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;