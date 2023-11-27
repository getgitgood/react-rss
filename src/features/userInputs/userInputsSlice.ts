import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageSize: '20',
  searchStr: ''
};

const userInputsSlice = createSlice({
  name: 'userInputs',
  initialState,
  reducers: {
    updatePageSize(state, action) {
      state.pageSize = action.payload;
    },
    updateSearchStr(state, action) {
      state.searchStr = action.payload;
    }
  }
});

export const { updateSearchStr, updatePageSize } = userInputsSlice.actions;

export default userInputsSlice.reducer;
