import { TextField } from "@mui/material";
import { UseControllerProps , useController} from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    multiline?: boolean;
    rows?: number;
}

export default function AppTextInput(props: Props) {
    const { fieldState, field } = useController({...props, defaultValue:''})
    return (
        <TextField
            {...props}
            {...field}
            multiline={props.multiline}
            rows={props.rows }
            fullWidth
            variant='outlined'
            error={!!fieldState.error}
            helperText={fieldState.error?.message }
            />
     )

}