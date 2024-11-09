import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: [],
    reducers: {
        setNotification: (state, action) => {
            state.unshift(action.payload);
        },
        unstNotification: (state, action) => {
            return []
        },
        removeOneNotification: (state, action) => {
            return state.filter(not => not._id != action.payload._id);
        }
    }
})

export const { setNotification, unstNotification, removeOneNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;