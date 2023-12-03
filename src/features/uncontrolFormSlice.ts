import { createSlice } from '@reduxjs/toolkit';

export type UncontrolFormData = {
  username: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  userAgreement: boolean;
  file: string;
  country: string;
};

const initialState: UncontrolFormData[] = [];

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
