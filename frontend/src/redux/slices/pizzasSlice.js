import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ sort, currentPage, categoryId, search }, thunkAPI) => {
    let url =
      categoryId === 0
        ? `${api}/pizzas?sortBy=${sort.sortType}&page=${currentPage}&search=${search}`
        : `${api}/pizza-categories/${categoryId}/pizzas?sortBy=${sort.sortType}&page=${currentPage}&search=${search}`;

    let response;
    try {
      response = await axios.get(url);
    } catch (e) {
      return thunkAPI.rejectWithValue([]);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    if (response.data.pizzas.length === 0) {
      return thunkAPI.rejectWithValue([]);
    }

    return response.data;
  }
);

const initialState = {
  items: [],
  status: "",
  totalPages: 0,
  isEmpty: false,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.isEmpty = action.payload.pizzas.length === 0;
        state.totalPages = action.payload["total_pages"];
        state.items = action.payload.pizzas;
        state.status = "fulfiled";
      })
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "pending";
        state.items = [];
        state.isEmpty = false;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.isEmpty = true;
        state.status = "error";
        state.items = action.payload;
        state.totalPages = 0;
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
