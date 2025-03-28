import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        // Si l'article existe déjà, augmenter la quantité
        existingItem.quantity++;
      } else {
        // Sinon, ajouter un nouvel article au panier
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    
    removeItem: (state, action) => {
      // Supprimer l'article du panier en fonction de son nom
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        // Mettre à jour la quantité de l'article
        itemToUpdate.quantity = quantity;
        
        // Supprimer l'article si la quantité est 0
        if (quantity === 0) {
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
  },
});

// Exporter les actions pour utilisation dans d'autres composants
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Exporter le réducteur comme exportation par défaut pour le store
export default CartSlice.reducer;