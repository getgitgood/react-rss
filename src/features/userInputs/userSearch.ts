import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('searchStr') || '';

const userSearchSlice = createSlice({
  name: 'userSearch',
  initialState,
  reducers: {
    searchStrUpdated(_, action) {
      return action.payload;
    }
  }
});

export const { searchStrUpdated } = userSearchSlice.actions;

export default userSearchSlice.reducer;
