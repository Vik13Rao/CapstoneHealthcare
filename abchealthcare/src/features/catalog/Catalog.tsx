import {   Grid,  Paper  } from "@mui/material";
import { useEffect, useState } from "react";
import axiosagent from "../../app/api/axiosagent";
import { Medicine } from "../../app/models/medicine";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import MedicineList from "./MedicineList";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

import ProductSearch from "./ProductSearch";
import RadioButton from "../../app/components/RadioButton";
import CheckboxButton from "../../app/components/CheckboxButton";
import AppPagination from "../../app/components/AppPagination";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to Low' },
    { value: 'price', label: 'Price - Low to High' },
]

export default function Catalog() {
    const medicines = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const {productsLoaded, status, filtersLoaded, brands, categories,productParams, metaData } = useAppSelector(state => state.catalog)
    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
       
    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [ dispatch, filtersLoaded])

    if (!metaData) return <h1>Loading product</h1>
    
    return (
        <Grid container columnSpacing={4} sx={{mb:2} }>
            <Grid item xs={3}>
                <Paper sx={{mb: 2} }>
                  <ProductSearch />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <RadioButton
                        selectedValue={productParams.orderBy}
                        options={sortOptions}
                        onChange={(e) => dispatch(setProductParams({orderBy: e.target.value})) }
                    />
                </Paper>

               
                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButton
                        items={categories}
                        checked={productParams.categories}
                        onChange={(items: string[]) => dispatch(setProductParams({ categories: items }))}
                    />
                </Paper>

                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButton
                        items={brands}
                        checked={productParams.brands}
                        onChange={(items: string[]) => dispatch(setProductParams({brands: items})) }
                    />
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <MedicineList medicines={medicines} />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9}>
                <AppPagination
                    metaData={metaData}
                    onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page})) }
                />
            </Grid>
            
            
        </Grid> 
       
    )
}