import { createSlice } from '@reduxjs/toolkit';
import { SubmittedFormData } from '../types/types';

const initialState: SubmittedFormData[] = [];

const reactFormSlice = createSlice({
  name: 'reactForm',
  initialState,
  reducers: {
    updateReactFormSubmissions(state, { payload }) {
      state.push({ ...payload, isNew: true });
    }
  }
});

export const { updateReactFormSubmissions } = reactFormSlice.actions;

export default reactFormSlice.reducer;
