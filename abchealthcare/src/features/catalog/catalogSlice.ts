import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axiosagent from "../../app/api/axiosagent";
import { Medicine, ProductParams } from "../../app/models/medicine";
import { MetaData } from "../../app/models/pagination";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    categories: string[];
    productParams: ProductParams;
    metaData: MetaData | null;
    
}

const productsAdapter = createEntityAdapter<Medicine>();

function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);
    if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
    if (productParams.brands?.length > 0) params.append('brands', productParams.brands.toString());
    if (productParams.categories?.length > 0) params.append('categories', productParams.categories.toString());
    return params;
}

export const fetchProductsAsync = createAsyncThunk<Medicine[], void, {state: RootState}>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
        try {
            const response = await axiosagent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
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

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        brands: [],
        categories: []

    }
}


export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        categories: [],
        productParams: initParams(),
        metaData: null

    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload, pageNumber:1 };
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload};
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetProductParams: (state) => {
            state.productParams = initParams();
        },
    },
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

export const { setProductParams, resetProductParams, setMetaData, setPageNumber} = catalogSlice.actions;