import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatArray: [],
        selected: null
    },
    reducers: {
        getChat: (state, action) => {
            state.chatArray = action.payload;
        },
        addChat: (state, action) => {
            state.chatArray = [...state.chatArray, ...action.payload];
        },
        removeChat: (state, action) => {
            state.chatArray = [];
        },
        updateLastMessage: (state, action) => {
            state.chatArray = state.chatArray.map(element => {
                if (element._id === action.payload.chat._id) {
                    return {...element,lastMessage:[action.payload]}
                }
                return element;
            });
        }
    }
});

export const { addChat, removeChat, getChat, updateLastMessage } = chatSlice.actions;

export default chatSlice.reducer;