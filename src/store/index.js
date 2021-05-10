import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
//calling all slices
import themeSlice from "./theme-slice";
import fileSlice from "./file-slice";
import userSlice from "./user-slice";

//combining all reducers
const rootReducers = combineReducers({
  theme: themeSlice.reducer,
  file: fileSlice.reducer,
  user: userSlice.reducer
});

// setting redux-persist
const persistConfig = {
  storage,
  key: "root"
};

//connecting reducers to redux-persit
const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer
});

//exporting persisted store
const persistor = persistStore(store);

export { store, persistor };
