import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";

import { useAppSelector } from "../../app/store/configureStore";

export default function CartSummary() {
    const { cart } = useAppSelector(state=>state.cart);
    const subtotal = cart?.items.reduce((sum, item)=> sum+(item.quantity*item.price),0) ?? 0;
    const deliveryFee = subtotal > 1000 ? 0 : 100;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{subtotal}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{subtotal + deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{ fontStyle: 'italic' }}>*Orders over Rs 1000 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}