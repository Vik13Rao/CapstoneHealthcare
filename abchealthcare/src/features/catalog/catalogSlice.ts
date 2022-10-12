import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axiosagent from "../../app/api/axiosagent";
import { Medicine } from "../../app/models/medicine";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Medicine>();

export const fetchProductsAsync = createAsyncThunk<Medicine[]>(
    'catalog/fetchProductsAsync',
    async () => {
        /*const params = getAxiosParams(thunkAPI.getState().catalog.productParams);*/
        try {
            return await axiosagent.Catalog.list();
        } catch (error) {
            console.log(error)
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Medicine, number>(
    'catalog/fetchProductAsync',
    async (medicineId) => {
        /*const params = getAxiosParams(thunkAPI.getState().catalog.productParams);*/
        try {
            return await axiosagent.Catalog.details(medicineId);
        } catch (error) {
            console.log(error)
        }
    }
)

export const fetchFilters = createAsyncThunk(

    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return axiosagent.Catalog.fetchFilters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        categories: []

    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.categories = action.payload.categories;
            state.filtersLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        })
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);