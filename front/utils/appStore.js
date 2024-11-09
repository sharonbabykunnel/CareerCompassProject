import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
import postSlice from "./postSlice";
import messageSlice from "./messageSlice";
import notificationSlice from "./notificationSlice";
import chatSlice from "./chatSlice";
import groupChatSlice from './groupChatSlice';
import communityChat from "./communityChat";
import profileSlice from "./profileSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "post", "admin", "message", "notification",'chat','group','community','profile'],
};

const reducer = combineReducers({
  user: userSlice,
  admin: adminSlice,
  post: postSlice,
  message: messageSlice,
  notification: notificationSlice,
  chat: chatSlice,
  group: groupChatSlice,
  community: communityChat,
  profile: profileSlice
});

const persistedReducer = persistReducer(persistConfig, reducer);

const appStore = configureStore({
  reducer: {
    presisted:persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(appStore);
export default appStore;
