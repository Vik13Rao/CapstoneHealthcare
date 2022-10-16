import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { Medicine } from "../../app/models/medicine";
import { useEffect, useState } from "react";
import useMedicines from "../../app/hooks/useMedicines";
import AppSelectList from "../../app/components/AppSelectList";
import AppDropzone from "../../app/components/AppDropzone";
import axiosagent from "../../app/api/axiosagent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setProduct } from "../catalog/catalogSlice";
import { LoadingButton } from "@mui/lab";

interface Props {
    medicine?: Medicine;
    cancelEdit: () => void;
}


export default function MedicineForm({medicine,  cancelEdit }: Props) {
    const { control, reset, handleSubmit, watch, formState: { isDirty, isSubmitting } } = useForm();
    const { brands, categories } = useMedicines();
    const watchFile = watch('file', null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (medicine && !watchFile && !isDirty) reset(medicine);
        return () => {
            if (watchFile) URL.revokeObjectURL(watchFile.preview);
        }

    }, [medicine, reset, watchFile, isDirty])


    async function handleSubmitData(data: FieldValues) {
        try {
            let response: Medicine;
            if (medicine) {
                response = await axiosagent.Admin.updateMedicine(data);
            } else {
                response = await axiosagent.Admin.createMedicine(data);
            }
            dispatch(setProduct(response));
            cancelEdit();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Product Details
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData) }>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='name' label='Medicine name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppSelectList control={control} items={brands} name='brand' label='Brand' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppSelectList control={control} items={categories} name='category' label='Category' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='price' label='Price' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='quantityStock' label='Quantity Stock' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput multiline={true} rows={4} control={control} name='description' label='Description' />
                </Grid>
                    <Grid item xs={12}>
                        <Box display ='flex' justifyContent='space-between' alignItems='center'>
                            <AppDropzone control={control} name='file' />
                            {watchFile ? (
                                <img src={watchFile.preview} alt="preview" style={{maxHeight:200} }/>
                            ) : (
                                    <img src={medicine?.pictureUrl} alt={medicine?.name} style={{ maxHeight: 200 }} />    
                              )}
                        </Box>
                    
                </Grid>
            </Grid>
            <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                <Button onClick={cancelEdit}  variant='contained' color='inherit'>Cancel</Button>
                    <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
                </Box>
            </form>
        </Box>
    )
}