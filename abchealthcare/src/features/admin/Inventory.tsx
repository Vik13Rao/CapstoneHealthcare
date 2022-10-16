import { Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import useMedicines from "../../app/hooks/useMedicines";
import { useAppDispatch } from "../../app/store/configureStore";
import AppPagination from "../../app/components/AppPagination";
import { removeProduct, setPageNumber } from "../catalog/catalogSlice";
import { useState } from "react";
import MedicineForm from "./MedicineForm";
import { Medicine } from "../../app/models/medicine";
import axiosagent from "../../app/api/axiosagent";
import { LoadingButton } from "@mui/lab";


export default function Inventory() {
    const { medicines, metaData } = useMedicines();
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);

    function handleSelectMedicine(medicine: Medicine) {
        setSelectedMedicine(medicine);
        setEditMode(true);
    }

    function handleDeleteMedicine(id: number) {
        setLoading(true);
        setTarget(id);
        axiosagent.Admin.deleteProduct(id)
            .then(() => dispatch(removeProduct(id)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    function cancelEdit() {
        if (selectedMedicine) setSelectedMedicine(undefined);
        setEditMode(false);
    }

    if (editMode) return <MedicineForm medicine={selectedMedicine} cancelEdit={cancelEdit } />


    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Inventory</Typography>
                <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Medicine</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Brand</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {medicines.map((medicine) => (
                            <TableRow
                                key={medicine.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {medicine.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={medicine.pictureUrl} alt={medicine.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{medicine.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{(medicine.price)}</TableCell>
                                <TableCell align="center">{medicine.category}</TableCell>
                                <TableCell align="center">{medicine.brand}</TableCell>
                                <TableCell align="center">{medicine.quantityStock}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleSelectMedicine(medicine)} startIcon={<Edit />} />
                                    <LoadingButton loading={loading && target === medicine.id}
                                        startIcon={<Delete />} color='error'
                                        onClick={()=> handleDeleteMedicine(medicine.id) }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {metaData &&
                <Box sx={{ pt: 2 }}>
                    <AppPagination metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))} />
                </Box>}
        </>
    )
}