import axios from "axios";
import {Customer} from "../assets/Model/Customer.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState={
    customers:[]
}
const api =axios.create({
    baseURL: "http://localhost:3000/customers",
})
export const saveCustomer=createAsyncThunk(
    'customer/saveCustomer',
    async (customer:Customer)=>{
        try {
            const response = await api.post('add',customer);
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)
export const updatedCustomer=createAsyncThunk(
    'customer/updateCustomer',
    async (customer:Customer)=>{
        try {
            const response = await api.put(`update/${customer.CustomerID}`,customer);
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)
export const deletedCustomer=createAsyncThunk(
    'customer/deleteCustomer',
    async (customer:Customer)=>{
        try {
            const response = await api.delete(`delete/${customer.CustomerID}`,customer);
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)
// Fetch all customers
export const fetchCustomers = createAsyncThunk(
    "customer/fetchCustomers",
    async () => {
        try {
            const response = await api.get("/");
            return response.data as Customer[];
        } catch (err) {
            console.error("Error fetching customers:", err);
            throw err;
        }
    }
)


const CustomerSlice = createSlice({
    name:'customer',
    initialState:initialState,
    reducers:{
        addCustomer: (state, action)=>{
            state.customers.push(action.payload)
        },
        updateCustomer:(state, action)=>{
            state.customers.map((customer:Customer,index)=>{
                if(customer.CustomerID == action.payload.email && index!=-1){
                    state.customers[index]=action.payload
                }
            })
        },
        deleteCustomer: (state, action)=>{
            state.customers =state.customers.filter((customer:Customer) => customer.CustomerID !== action.payload.email)
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(saveCustomer.pending, (state, action) => {
                console.log("save customer pending")

            })
            .addCase(saveCustomer.rejected, (state, action) => {
                console.log("save customer rejected")
            })
            .addCase(saveCustomer.fulfilled, (state, action) => {
                state.customers.push(action.payload)

                console.log("save customer fulfilled")
            })
            .addCase(updatedCustomer.pending, (state) => {
                console.log("Update customer pending");
            })
            .addCase(updatedCustomer.rejected, (state) => {
                console.log("Update customer rejected");
            })
            .addCase(updatedCustomer.fulfilled, (state, action) => {
                console.log(action.payload)
                state.customers.map((customer:Customer,index)=>{
                    if(customer.CustomerID == action.payload.CustomerId && index!=-1){
                        state.customers[index]=action.payload
                    }
                })
                console.log("Update customer fulfilled");


            })
            .addCase(deletedCustomer.pending, (state,action) => {
                console.log("Delete customer pending");
            })
            .addCase(deletedCustomer.rejected, (state,action) => {
                console.log("Delete customer rejected");
            })
            .addCase(deletedCustomer.fulfilled, (state, action) => {
                state.customers =state.customers.filter((customer:Customer) => customer.CustomerID !== action.payload.CustomerID)
            })
            .addCase(fetchCustomers.pending, (state) => {
                console.log("customer loading");
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.customers = action.payload; // Update customers in the state

            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                console.log("customer loading rejected");
            });



    }
})
export const {addCustomer, updateCustomer,deleteCustomer} = CustomerSlice.actions;
export default CustomerSlice.reducer;