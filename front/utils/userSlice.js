import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setCredentials: (state, action) => {
            return action.payload;
        },
        removeCredentials: (state, action) => {
            return null;
        }
    }
})

export const { setCredentials, removeCredentials } = userSlice.actions;

export default userSlice.reducer