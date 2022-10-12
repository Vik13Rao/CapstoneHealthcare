import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { stat } from "fs";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosagent from "../../app/api/axiosagent";


import { Medicine } from "../../app/models/medicine";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addCartItemAsync, setCart } from "../cart/cartSlice";

interface Props {
    medicine: Medicine;
}

export default function MedicineGrid({ medicine }: Props) {
    const { status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

   
    return (
        <Card >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: '#00bcd4'} }>
                        {medicine.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={medicine.name}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color:'primary.main'}
                } }
            />
            <CardMedia
                component="img"
                sx={{height:140, backgroundSize: 'contain', bgcolor: 'primary.light'} }
                image={medicine.pictureUrl}
                title={medicine.name }
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5" >
                    Rs {medicine.price }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {medicine.brand} / {medicine.category }
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={status.includes('pendingAddItem' + medicine.id)}
                    onClick={() => dispatch(addCartItemAsync({ medicineId: medicine.id }))}
                    size="small">Add to cart</LoadingButton>
                <Button component={Link} to={`/catalog/${medicine.id}`} size="small">View Info</Button>
            </CardActions>
        </Card>  
    )
}