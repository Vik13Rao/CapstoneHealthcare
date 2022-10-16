import { fetchFilters, fetchProductsAsync, productSelectors } from "../../features/catalog/catalogSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { useEffect, useState } from "react";

export default function useMedcines() {
    const medicines = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, status, filtersLoaded, brands, categories, metaData } = useAppSelector(state => state.catalog)
    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());

    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded])

    return {
        medicines,
        productsLoaded,
        filtersLoaded,
        brands,
        categories,
        metaData

    }
}