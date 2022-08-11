import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { formatDistance, subDays } from 'date-fns';

interface IProps {
    onChangeValue?: (newValue: Date | null) => void; //diz que se nao vier function nao executa
}


export default function MaterialUIPickers(props: IProps) {
    const [value, setValue] = React.useState<Date | null>(
        new Date(),
    );

    const handleChange = (newValue: Date | null) => {
        console.log(newValue, typeof newValue);
        setValue(newValue);
        props.onChangeValue?.(newValue);
    };


    const svg = "#0300a8";
    const input = "#00027c";
    const label = "#a3a3a3";


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={0} style={{ width: '100%' }}>
                <DesktopDatePicker
                    label="Data Referência"
                    inputFormat="dd/MM/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} size={'small'}
                        sx={{
                            svg: { color: svg },
                            input: { color: input },
                            label: { color: label },
                        }}
                        style={{ marginBottom: "0px", marginTop: "15px", width: "100%", color: "blue" }} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}