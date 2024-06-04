import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0
    },
    reducers:{
        addProduct:(state,action)=>{
        state.quantity +=1;
        state.products.push(action.payload);
        state.total +=action.payload.price * action.payload.quantity;
        console.log('State after addProduct:', state);  // Debugging log

    },
    removeItem: (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload);
        if (index !== -1) {
            state.total -= state.products[index].price * state.products[index].quantity;
            state.products.splice(index, 1);
            state.quantity -= 1;
            console.log('State after removeItem:', state);  // Debugging log

        }
    },
    }
})

export const {addProduct, removeItem} = cartSlice.actions;
export default cartSlice.reducer;