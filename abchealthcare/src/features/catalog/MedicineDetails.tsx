import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axiosagent from "../../app/api/axiosagent";

import { Medicine } from "../../app/models/medicine";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {  addCartItemAsync, removeCartItemAsync, setCart } from "../cart/cartSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function MedicineDetails() {
    const { cart, status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const medicine = useAppSelector(state => productSelectors.selectById(state, id));
    
    const [quantity, setQuantity] = useState(0);

    const item = cart?.items.find(i => i.medicineId === medicine?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!medicine) dispatch(fetchProductAsync(parseInt(id)));
    }, [id, item, dispatch,medicine])


    function handleInputChange(event: any) {
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {

        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addCartItemAsync({ medicineId: medicine?.id!, quantity: updatedQuantity }))
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeCartItemAsync({ medicineId: medicine?.id!, quantity: updatedQuantity }))
        }
    }
        

        if (!medicine) return <h3> no medicine</h3>

        return (
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <img src={medicine.pictureUrl} alt={medicine.name} style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h3'>{medicine.name}</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant='h4' color='secondary'>Rs {(medicine.price).toFixed(2)}</Typography>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{medicine.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{medicine.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell>{medicine.category}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Seller</TableCell>
                                    <TableCell>{medicine.brand}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Quantity in stock</TableCell>
                                    <TableCell>{medicine.quantityStock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                variant='outlined'
                                type='number'
                                label='Quantity in Cart'
                                fullWidth
                                value={quantity}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LoadingButton
                                disabled={item?.quantity === quantity}
                                loading={status.includes('pending')}
                                onClick={handleUpdateCart}
                                sx={{ height: '55px' }}
                                color='primary'
                                size='large'
                                variant='contained'
                                fullWidth
                            >
                                {item ? 'Update Quantity' : 'Add to Cart'}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
