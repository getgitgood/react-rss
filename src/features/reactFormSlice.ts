import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const reactFromSlice = createSlice({
  name: 'reactForm',
  initialState,
  reducers: {
    updateReactFormState(_, action) {
      return action.payload;
    }
  }
});

export default reactFromSlice.reducer;
