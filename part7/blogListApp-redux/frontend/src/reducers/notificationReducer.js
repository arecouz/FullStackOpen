import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { type: 'hidden', message: 'hidden' },
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    hideNotification(state, action) {
      return { type: '', message: '' };
    },
  },
});

export const { createNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
