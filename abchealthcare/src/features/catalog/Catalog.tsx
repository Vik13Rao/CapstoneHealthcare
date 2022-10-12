import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import axiosagent from "../../app/api/axiosagent";
import { Medicine } from "../../app/models/medicine";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import MedicineList from "./MedicineList";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Filter } from "@mui/icons-material";


export default function Catalog() {
    const medicines = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const {productsLoaded, status, filtersLoaded } = useAppSelector(state => state.catalog)
    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
       
    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [ dispatch, filtersLoaded])

    
    return (
        <>
            <MedicineList medicines={medicines } />
            
        </> 
       
    )
}