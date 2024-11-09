import { createSlice } from "@reduxjs/toolkit";

const groupChatSlice = createSlice({
  name: "group",
  initialState: {
    chatArray: [],
    selectedGroup: null,
    chatInGroup: [],
  },
  reducers: {
    addChatList: (state, action) => {
      state.chatArray?.push(...action.payload);
    },
    addSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    addChatInGroup: (state, action) => {
      state.chatInGroup = action.payload;
    },

    removeAll: (state) => {
      state.chatArray = [];
      state.selectedGroup = null;
      state.chatInGroup = [];
    },
  },
});

    
export const {
  addChatInGroup,
  addChatList,
  addSelectedGroup,
  removeAll,
  addMoreChat,
} = groupChatSlice.actions;

export default groupChatSlice.reducer;
