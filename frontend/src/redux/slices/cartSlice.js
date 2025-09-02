import { createSlice } from "@reduxjs/toolkit";

function getCartData() {
  const json = window.localStorage.getItem("cart");
  const items = json ? JSON.parse(json) : [];
  const totalPrice = items
    .reduce((sum, item) => {
      if (item.discount === 0) {
        return sum + item.pizzaPrice * item.count;
      } else {
        return sum + item.pizzaPrice * item.count * (1 - item.discount / 100);
      }
    }, 0)
    .toFixed(2);
  return {
    items,
    totalPrice,
  };
}

const cartData = getCartData();

const initialState = {
  totalPrice: cartData.totalPrice,
  items: cartData.items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, type, size, count } = action.payload;
      const existsItem = state.items.find(
        (item) => item.id === id && item.type === type && item.size === size
      );

      if (existsItem) {
        existsItem.count += count;
      } else {
        state.items.push(action.payload);
      }

      state.totalPrice = state.items
        .reduce((sum, item) => {
          if (item.discount === 0) {
            return sum + item.pizzaPrice * item.count;
          } else {
            return (
              sum + item.pizzaPrice * item.count * (1 - item.discount / 100)
            );
          }
        }, 0)
        .toFixed(2);
    },
    removeItem: (state, action) => {
      const { id, type, size } = action.payload;
      const existsItem = state.items.find(
        (item) => item.id === id && item.type === type && item.size === size
      );

      if (existsItem && existsItem.count !== 1) {
        existsItem.count -= 1;
      } else {
        const itemIndex = state.items.findIndex(
          (item) => item.id !== id && item.type !== type && item.size !== size
        );

        state.items.splice(itemIndex, 1);
      }

      state.totalPrice = state.items
        .reduce((sum, item) => {
          if (item.discount === 0) {
            return sum + item.pizzaPrice * item.count;
          } else {
            return (
              sum + item.pizzaPrice * item.count * (1 - item.discount / 100)
            );
          }
        }, 0)
        .toFixed(2);
    },

    deleteItem: (state, action) => {
      const { id, type, size } = action.payload;

      const itemIndex = state.items.findIndex(
        (item) => item.id !== id && item.type !== type && item.size !== size
      );

      state.items.splice(itemIndex, 1);

      state.totalPrice = state.items
        .reduce((sum, item) => {
          if (item.discount === 0) {
            return sum + item.pizzaPrice * item.count;
          } else {
            return (
              sum + item.pizzaPrice * item.count * (1 - item.discount / 100)
            );
          }
        }, 0)
        .toFixed(2);
    },

    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, deleteItem } =
  cartSlice.actions;

export default cartSlice.reducer;
