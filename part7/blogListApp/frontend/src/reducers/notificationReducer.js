import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { type: '', message: '' },
  reducers: {
    createNotification(state, action) {
      const type = action.payload.type;
      const message = action.payload.message;
      return { type, message };
    },
    removeNotification(state, action) {
      return { type: 'hidden', message: '' };
    },
  },
});

export const { createNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
