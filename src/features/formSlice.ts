import { createSlice } from '@reduxjs/toolkit';
import { SubmittedFormData } from '../types/types';

export type FormsSlice = {
  uncontrolledFormSubmissions: SubmittedFormData[];
  controlledFormSubmissions: SubmittedFormData[];
};
const initialState = <FormsSlice>{
  uncontrolledFormSubmissions: [],
  controlledFormSubmissions: []
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateControlledFormSubmissions(state, { payload }) {
      state.controlledFormSubmissions.push({ ...payload, isNew: true });
    },
    updateUncontrolledFormSubmissions(state, { payload }) {
      state.uncontrolledFormSubmissions.push({ ...payload, isNew: true });
    }
  }
});

export const {
  updateControlledFormSubmissions,
  updateUncontrolledFormSubmissions
} = formSlice.actions;

export default formSlice.reducer;
