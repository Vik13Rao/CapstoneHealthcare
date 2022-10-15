import {  Grid } from "@mui/material";
import { Medicine } from "../../app/models/medicine";
import MedicineGrid from "./MedicineGrid";

interface Props {
    medicines: Medicine[];
}

export default function MedicineList({medicines }: Props) {
    return (
        <Grid container spacing={4}>
            {medicines.map(medicine => (
                <Grid item xs={4} key={medicine.id}>
                    <MedicineGrid  medicine={medicine} />
                </Grid>
                
            ))}
        </Grid>
     )
}