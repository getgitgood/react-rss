import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const uncontrolFormSlice = createSlice({
  name: 'uncontrolForm',
  initialState,
  reducers: {
    updateFormState(_, action) {
      return action.payload;
    }
  }
});

export const { updateFormState } = uncontrolFormSlice.actions;

export default uncontrolFormSlice.reducer;
