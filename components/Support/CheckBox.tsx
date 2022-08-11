import * as React from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Checkbox } from '@mui/material';



const theme = createTheme({
    typography: {
        body1: {
            fontSize: '14px',
            fontFamily: 'Poppins',
            margin: '0px'
        },
        caption: {
            color: 'red'
        },
    },

});


export default function CheckBox() {
    return (
        <ThemeProvider theme={theme}>
            <FormControlLabel
                control={<Checkbox />}
                label="Pendentes"
            />
            <FormControlLabel
                control={<Checkbox />}
                label="Efetivados"
            />
            <FormControlLabel
                control={<Checkbox />}
                label="Todos"
            />
        </ThemeProvider>
    );
}