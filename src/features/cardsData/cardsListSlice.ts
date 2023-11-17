import { createSlice } from '@reduxjs/toolkit';

import { initialResponse } from '../../utils/initialStates';

const initialState = initialResponse;

const cardsListSlice = createSlice({
  name: 'cardsList',
  initialState,
  reducers: {
    cardListUpdated(_, action) {
      return action.payload;
    }
  }
});

export const { cardListUpdated } = cardsListSlice.actions;

export default cardsListSlice.reducer;
