import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import { combineReducers, configureStore } from "@reduxjs/toolkit";
  import storage from "redux-persist/lib/storage";
  import stepFormSlice from "./slices/stepFormSlice";
  import searchReducer from "./slices/searchSlice";
  import cartReducer from "./slices/cartSlice";
  
  const persistConfig = {
    key: "root",
    storage,
  };
  
  const rootReducer = combineReducers({
    stepForm: stepFormSlice,
    search: searchReducer,
    cart: cartReducer,
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  export default store;  