import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: ''
};

const singleCardIdSlice = createSlice({
  name: 'singleCardId',
  initialState,
  reducers: {
    singleCardIdUpdated(state, action) {
      state.id = action.payload;
    }
  }
});

export const { singleCardIdUpdated } = singleCardIdSlice.actions;

export default singleCardIdSlice.reducer;
