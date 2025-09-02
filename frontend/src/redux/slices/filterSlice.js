import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "პოპულარობით",
    sortType: "rating",
  },
  search: "",
  updated: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilter: (state, action) => {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.search = action.payload.search;
      state.sort = action.payload.sort;
      state.updated = true;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilter, setSearch } =
  filterSlice.actions;

export default filterSlice.reducer;
