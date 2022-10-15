import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axiosagent from "../../app/api/axiosagent";
import { Cart } from "../../app/models/cart";
import { getCookie } from "../../app/utility/util";



interface CartState {
    cart: Cart | null;
    status: string;
    
}

const initialState: CartState = {
    cart: null,
    status: 'idle'
    
}

export const fetchCartAsync = createAsyncThunk<Cart>(
    'basket/fetchCartAsync',
    async (_, thunkAPI) => {
        try {
            return await axiosagent.Cart.get();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            if (!getCookie('buyerId')) return false;
        }
    }
)

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
        },
        clearCart: (state) => {
            state.cart = null;
        }
    },
    extraReducers: (builder => {
        builder.addCase(addCartItemAsync.pending, (state, action) => {
            
            state.status = 'pendingAddItem' + action.meta.arg.medicineId;
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
        builder.addMatcher(isAnyOf(addCartItemAsync.fulfilled, fetchCartAsync.fulfilled), (state, action) => {
            state.cart = action.payload;
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(addCartItemAsync.rejected, fetchCartAsync.rejected) ,(state) => {

            state.status = 'idle';
        });
    })
})

export const { setCart, clearCart} = cartSlice.actions;