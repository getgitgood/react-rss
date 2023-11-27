import { createSlice } from '@reduxjs/toolkit';

import {
  initialResponse,
  initialSingleCardData
} from '../../utils/initialStates';

const initialState = {
  cardsList: initialResponse,
  singleCard: initialSingleCardData,
  id: '',
  cardsListLoading: false,
  detailsLoading: false
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    updateCardsList(state, { payload }) {
      state.cardsList = payload;
    },
    updateCardListLoading(state, { payload }) {
      state.cardsListLoading = payload;
    },
    updateSingleCardLoading(state, { payload }) {
      state.detailsLoading = payload;
    },
    updateSingleCardId(state, { payload }) {
      state.id = payload;
    },
    updateSingleCard(state, { payload }) {
      state.singleCard = payload;
    }
  }
});

export const {
  updateCardsList,
  updateCardListLoading,
  updateSingleCardLoading,
  updateSingleCard,
  updateSingleCardId
} = cardsSlice.actions;

export default cardsSlice.reducer;
