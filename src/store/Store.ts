
import {configureStore} from "@reduxjs/toolkit";
import customerSlice from "../reducers/CustomerSlice.ts";
import itemSlice from "../reducers/ItemSlice.ts";

// export const store =createStore(customerReducer)
export const store = configureStore({
    reducer: {
        customer: customerSlice,
        item: itemSlice,
    }
})
export type AppDispatch = typeof store.dispatch;
