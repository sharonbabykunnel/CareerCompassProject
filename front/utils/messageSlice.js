import { createSlice } from "@reduxjs/toolkit";

const messageReducer = createSlice({
    name: 'message',
    initialState: {
        chat: null,
        messages:[]
    },
    reducers: {
        setMessage: (state, action) => {
            console.log(action.payload)
            state.chat = action.payload.chat;
            state.messages = action.payload.messages
        },
        removeMessage: (state, action) => {
            state.chat = null
            state.messages = []
        },
        addMessage: (state, action) => {
            state.chat = action.payload.update
            state.messages.push(action.payload.response);
        },
        addMoreMessage: (state, action) => {
            state.messages = [...action.payload,...state.messages, ];
        }
    }
})

export const { setMessage, removeMessage, addMessage, addMoreMessage } =
  messageReducer.actions;

export default  messageReducer.reducer; 