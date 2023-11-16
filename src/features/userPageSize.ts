import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('pageSize') || '20';

const userPageSizeSlice = createSlice({
  name: 'userPageSize',
  initialState,
  reducers: {
    pageSizeUpdated(_, action) {
      return action.payload;
    }
  }
});

export const { pageSizeUpdated } = userPageSizeSlice.actions;
export default userPageSizeSlice.reducer;
