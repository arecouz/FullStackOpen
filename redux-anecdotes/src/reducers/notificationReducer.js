import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'hello!',
  reducers: {
    showNotification(state, action) {
      console.log('SHOW');
      return action.payload;
    },
    hideNotification(state, action) {
      console.log('HIDE');
      return '';
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const createNotification = (msg, length) => {
  return async (dispatch) => {
    dispatch(showNotification(msg));
    setTimeout(() => {
      console.log('called?');
      dispatch(hideNotification());
    }, length);
  };
};

export default notificationSlice.reducer;
