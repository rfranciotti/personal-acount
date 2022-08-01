import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Stack, TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import { BoxBorder, CardFlex, CardFlexCol, DivLeft, DivRight } from 'styles/global.components';
import { FormSmall, TitleForm } from './pages.components';
import { useState } from 'react';
import { ButtonNav } from './functional.components';
import Image from 'next/image';


export interface IAppProps {
}

export default function CardPage(props: IAppProps) {

    const [chave, setChave] = useState("CPF");

    const handleChangeChave = (event: SelectChangeEvent) => {
        setChave(event.target.value as string);
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <FormSmall>
            <TitleForm>CARTOES</TitleForm>
            <CardFlexCol color={"#BCD2EE"} space={10}>
                <Stack direction={'row'} spacing={2}>
                    <TextField id="outlined-basic" label="Nome Cartão" variant="outlined" style={{ width: '50%' }} />
                    <TextField id="outlined-basic" label="Num. Cartão" variant="outlined" style={{ width: '50%' }} />
                </Stack>
            </CardFlexCol>
            <CardFlexCol color={"#BCD2EE"} space={10}>
                <Stack direction={'row'} spacing={2}>
                    <TextField id="outlined-basic" label="Data Val." variant="outlined" style={{ width: '30%' }} />
                    <TextField id="outlined-basic" label="Cod. Sec." variant="outlined" style={{ width: '30%' }} />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Ativo" />
                </Stack>
            </CardFlexCol>
            <BoxBorder>
                <DivLeft>
                    <Image src={"/icons/file2.svg"} width={50} height={50} style={{ marginRight: "10px" }} />
                    <Image src={"/icons/Download.svg"} width={41} height={50} style={{ marginRight: "50px" }} />
                    <Image src={"/icons/del2.svg"} width={50} height={50} />
                    <Image src={"/icons/love2.svg"} width={50} height={50} />
                    <Image src={"/icons/browser.svg"} width={41} height={50} />
                </DivLeft>
                <DivRight>
                    <Image src={"/icons/home.svg"} width={50} height={50} />
                </DivRight>
            </BoxBorder>


        </FormSmall >
    );
}
