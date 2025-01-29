import axios from "axios";
import { Item } from "../assets/Model/Item"; // Assuming you have an Item model
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const api = axios.create({
    baseURL: "http://localhost:3000/items",
});

// Async thunk to save an item
export const saveItem = createAsyncThunk(
    "item/saveItem",
    async (item: Item) => {
        try {
            const response = await api.post("add", item);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
);

// Async thunk to update an item
export const updatedItem = createAsyncThunk(
    "item/updateItem",
    async (item: Item) => {
        try {
            const response = await api.put(`update/${item.ItemID}`, item);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
);

// Async thunk to delete an item
export const deletedItem = createAsyncThunk(
    "item/deleteItem",
    async (item: Item) => {
        try {
            const response = await api.delete(`delete/${item.ItemID}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
);
export const fetchItems = createAsyncThunk(
    "item/fetchItems",
    async () => {
        try {
            const response = await api.get("/"); // Endpoint for fetching all items
            return response.data as Item[];
        } catch (err) {
            console.error("Error fetching items:", err);
            throw err;
        }
    }
);

const ItemSlice = createSlice({
    name: "item",
    initialState: initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        updateItem: (state, action) => {
            state.items.map((item: Item, index) => {
                if (item.ItemID === action.payload.itemID && index !== -1) {
                    state.items[index] = action.payload;
                }
            });
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter(
                (item: Item) => item.ItemID !== action.payload.ItemID
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveItem.pending, (state) => {
                console.log("Save item pending");
            })
            .addCase(saveItem.rejected, (state) => {
                console.log("Save item rejected");
            })
            .addCase(saveItem.fulfilled, (state, action) => {
                console.log(action.payload);
                state.items.push(action.payload);
                console.log("Save item fulfilled");
            })
            .addCase(updatedItem.pending, (state) => {
                console.log("Update item pending");
            })
            .addCase(updatedItem.rejected, (state) => {
                console.log("Update item rejected");
            })
            .addCase(updatedItem.fulfilled, (state, action) => {
                state.items.map((item: Item, index) => {
                    if (item.ItemID === action.payload.itemID && index !== -1) {
                        state.items[index] = action.payload;
                    }
                });
                console.log("Update item fulfilled");
            })
            .addCase(deletedItem.pending, (state) => {
                console.log("Delete item pending");
            })
            .addCase(deletedItem.rejected, (state) => {
                console.log("Delete item rejected");
            })
            .addCase(deletedItem.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item: Item) => item.ItemID !== action.payload.itemID
                );
                console.log("Delete item fulfilled");
            })
            .addCase(fetchItems.pending, (state) => {
                console.log("Items loading");
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.items = action.payload; // Update items in the state
            })
            .addCase(fetchItems.rejected, (state) => {
                console.log("Items loading rejected");
            });

    },
});

export const { addItem, updateItem, deleteItem } = ItemSlice.actions;
export default ItemSlice.reducer;
