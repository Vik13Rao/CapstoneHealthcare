
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addCartItemAsync, removeCartItemAsync } from "./cartSlice";
import { CartItem } from "../../app/models/cart";

interface Props {
    items: CartItem[];
    isCart?: boolean;
}

export default function CartTable({items, isCart = true }: Props) {
    const { status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} >
                <TableHead>
                    <TableRow>
                        <TableCell>Medicine</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">SubTotal</TableCell>
                        {isCart &&
                            <TableCell align="right"></TableCell>}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
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
                                {isCart &&
                                    <IconButton onClick={() => dispatch(removeCartItemAsync({
                                        medicineId: item.medicineId, quantity: 1, name: 'rem'
                                    }))} color='error'>
                                        <Remove />
                                    </IconButton>}
                                {item.quantity}
                                {isCart &&
                                    <IconButton onClick={() => dispatch(addCartItemAsync({ medicineId: item.medicineId }))} color='error'>
                                        <Add />
                                    </IconButton>}
                            </TableCell>
                            <TableCell align="right">Rs {(item.price * item.quantity)}</TableCell>
                            {isCart &&
                                <TableCell align="right">

                                    <IconButton onClick={() =>
                                        dispatch(removeCartItemAsync({
                                            medicineId: item.medicineId, quantity: item.quantity, name: 'del'
                                        }))} color='error'>
                                        <Delete />
                                    </IconButton>
                                </TableCell>}

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> 
    )
}