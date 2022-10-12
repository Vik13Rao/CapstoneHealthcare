import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosagent from "../../app/api/axiosagent";
import { Cart } from "../../app/models/cart";



interface CartState {
    cart: Cart | null;
    status: string;
    
}

const initialState: CartState = {
    cart: null,
    status: 'idle'
    
}

export const addCartItemAsync = createAsyncThunk<Cart, { medicineId: number, quantity?: number }>(
    'cart/addCartItemAsync',
    async ({ medicineId, quantity =1  }) => {
        try {
            return await axiosagent.Cart.addItem(medicineId, quantity);
        } catch (error) {
            console.log(error);
        }
    }
)

export const removeCartItemAsync = createAsyncThunk<void,
    { medicineId: number, quantity: number, name?: string}>(
        'cart/removCartItemAsync',
        async ({ medicineId, quantity }) => {
            try {
                await axiosagent.Cart.removeItem(medicineId, quantity);
            } catch (error) {
                console.log(error);
            }
        }
    )


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(addCartItemAsync.pending, (state, action) => {
            
            state.status = 'pendingAddItem' + action.meta.arg.medicineId;
        });
        builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addCartItemAsync.rejected, (state) => {
            
            state.status = 'idle';
        });
        builder.addCase(removeCartItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.medicineId+ action.meta.arg.name;
        });
        builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
            const { medicineId, quantity } = action.meta.arg;
            const itemIndex = state.cart?.items.findIndex(i => i.medicineId === medicineId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.cart!.items[itemIndex].quantity -= quantity;
            if (state.cart?.items[itemIndex].quantity === 0)
                state.cart.items.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(removeCartItemAsync.rejected, (state, action) => {
            
            state.status = 'idle';
        });
    })
})

export const { setCart} = cartSlice.actions;