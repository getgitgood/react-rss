import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardsListLoading: false,
  detailsLoading: false
};

const loadingsSlice = createSlice({
  name: 'loadings',
  initialState,
  reducers: {
    cardsListLoadingUpdated(state, action) {
      state.cardsListLoading = action.payload;
    },
    detailsLoadingUpdated(state, action) {
      state.detailsLoading = action.payload;
    }
  }
});

export const { cardsListLoadingUpdated, detailsLoadingUpdated } =
  loadingsSlice.actions;

export default loadingsSlice.reducer;
