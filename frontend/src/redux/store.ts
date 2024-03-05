import { configureStore } from "@reduxjs/toolkit";
import stepFormSlice from "./slices/stepFormSlice";
import searchReducer from './slices/searchSlice';
import cartReducer from './slices/cartSlice';


export const store = configureStore({
    reducer: {
        stepForm: stepFormSlice,
        search: searchReducer,
        cart: cartReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;