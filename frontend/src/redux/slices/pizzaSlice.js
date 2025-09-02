import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const fetchPizza = createAsyncThunk(
  "CurrentPizza/fetchPizzaStatus",
  async ({ slug, params }) => {
    let url = `${api}/pizzas/${slug}`;

    const { data } = await axios.get(url);

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (params) data.isParams = true;

    return data;
  }
);

const initialState = {
  pizza: {},
  status: "",
  found: null,
  pizzaType: 0,
  pizzaSize: null,
  currentTab: 1,
  count: 1,
  currentCal: null,
  currentProteins: null,
};

export const CurrentPizzaSlice = createSlice({
  name: "CurrentPizza",
  initialState,
  reducers: {
    setPizzaProperty: (state, action) => {
      state.pizzaType = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setPizzaType: (state, action) => {
      state.pizzaType = action.payload;
    },
    setPizzaSize: (state, action) => {
      state.pizzaSize = action.payload;
    },
    setPizzaAmount: (state, action) => {
      if (action.payload === "increase") {
        state.count += 1;
      } else if (action.payload === "decrease" && state.count !== 1) {
        state.count -= 1;
      }
    },
    clearCurrentPizza: (state) => {
      state.pizza = {};
      state.status = "";
      state.found = null;
      state.pizzaType = 0;
      state.pizzaSize = null;
      state.currentTab = 1;
      state.count = 1;
      state.currentCal = null;
      state.currentProteins = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.pizza = action.payload;
        state.status = "fulfiled";
        state.found = action.payload.message ? true : false;
        if (!action.payload.isParams) {
          state.pizzaSize =
            action.payload["pizza_sizes"][
              Math.floor(action.payload["pizza_sizes"].length / 2)
            ];
        }
      })
      .addCase(fetchPizza.pending, (state) => {
        state.status = "pending";
        state.pizza = {};
        state.found = false;
      })
      .addCase(fetchPizza.rejected, (state, action) => {
        state.found = false;
        state.status = "error";
        state.pizza = action.payload;
      });
  },
});

export const {
  setPizzaProperty,
  setCurrentTab,
  clearCurrentPizza,
  setPizzaType,
  setPizzaSize,
  setPizzaAmount,
} = CurrentPizzaSlice.actions;

export default CurrentPizzaSlice.reducer;
