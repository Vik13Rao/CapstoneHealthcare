import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Button, Grid, IconButton,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {  addCartItemAsync, removeCartItemAsync} from "./cartSlice";
import CartSummary from "./CartSummary";

export default function CartPage() {
    const { cart, status} = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    

   

    if (!cart) return <Typography variant='h3'>Your cart is empty</Typography>
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell>Medicine</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">SubTotal</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.items.map(item => (
                            <TableRow
                                key={item.medicineId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                        <span> {item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">Rs {item.price}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => dispatch(removeCartItemAsync({
                                        medicineId: item.medicineId, quantity: 1, name: 'rem'
                                    }))} color='error'>
                                        <Remove />
                                    </IconButton>
                                    {item.quantity}
                                    <IconButton onClick={() => dispatch(addCartItemAsync({medicineId:item.medicineId}))} color='error'>
                                        <Add />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">Rs {(item.price * item.quantity)}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() =>
                                        dispatch(removeCartItemAsync({
                                            medicineId: item.medicineId, quantity: item.quantity, name: 'del'
                                        }))} color='error'>
                                        <Delete />
                                    </IconButton>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> 
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <CartSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth>
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
        
    )
}