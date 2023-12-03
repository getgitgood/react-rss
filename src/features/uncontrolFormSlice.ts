import { createSlice } from '@reduxjs/toolkit';
import { SubmittedFormData } from '../types/types';

const initialState: SubmittedFormData[] = [];

const uncontrolFormSlice = createSlice({
  name: 'uncontrolForm',
  initialState,
  reducers: {
    updateUncontrolFormsSubmissions(state, { payload }) {
      state.push(payload);
    }
  }
});

export const { updateUncontrolFormsSubmissions } = uncontrolFormSlice.actions;

export default uncontrolFormSlice.reducer;
