import { createSlice } from "@reduxjs/toolkit";

const communityChat = createSlice({
  name: "community",
  initialState: {
    chatArray: [],
    selectedGroup: null,
    chatInGroup: [],
  },
  reducers: {
    addChatListInCommunity: (state, action) => {
      state.chatArray = [action.payload,...state.chatArray];
    },
    chatListInCommunity: (state, action) => {
      state.chatArray = action.payload;
    },
    addSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    addChatIncommunity: (state, action) => {
      state.chatInGroup = action.payload;
    },
    removeChatFromCommunity: (state, action) => {
      state.chatArray = [];
      state.selectedGroup = null;
      state.chatInGroup = [];
    },
    addMoreChat: (state, action) => {
      state.chatInGroup.push(action.payload);
    },
    updateCommunityLastMessage: (state, action) => {
      state.chatArray = state.chatArray.map((element) => {
        if (element._id === action.payload.chat) {
          return { ...element, lastMessage: [action.payload] };
        }
        return element;
      });
    },
  },
});

export const {
  addChatListInCommunity,
  chatListInCommunity,
  addSelectedGroup,
  addChatIncommunity,
  removeChatFromCommunity,
  addMoreChat,
  updateCommunityLastMessage,
} = communityChat.actions;

export default communityChat.reducer