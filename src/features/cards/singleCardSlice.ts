import { createSlice } from '@reduxjs/toolkit';

import { initialSingleCardData } from '../../utils/initialStates';

const initialState = initialSingleCardData;

const singleCardSlice = createSlice({
  name: 'singleCard',
  initialState,
  reducers: {
    singleCardUpdated(_, action) {
      return action.payload;
    }
  }
});

export const { singleCardUpdated } = singleCardSlice.actions;

export default singleCardSlice.reducer;
