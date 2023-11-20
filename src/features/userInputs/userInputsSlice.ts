import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageSize: localStorage.getItem('pageSize') || '20',
  searchStr: localStorage.getItem('searchStr') || ''
};

const userInputsSlice = createSlice({
  name: 'userInputs',
  initialState,
  reducers: {
    pageSizeUpdated(state, action) {
      state.pageSize = action.payload;
    },
    searchStrUpdated(state, action) {
      state.searchStr = action.payload;
    }
  }
});

export const { searchStrUpdated, pageSizeUpdated } = userInputsSlice.actions;

export default userInputsSlice.reducer;
