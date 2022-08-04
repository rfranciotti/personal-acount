import { Alert, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Stack, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import { BoxBorder, CardFlex, CardFlexCol, DivLeft, DivRight } from 'styles/global.components';
import { FormSmall, TitleForm } from './pages.components';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import ModalSimpleTable from '@components/Support/ModalSimpleTable';
import ModalSimple from '@components/Support/ModalSimple';
import AlertTitle from '@mui/material/AlertTitle';
import { motion } from "framer-motion";
import MyLoader from '@components/Support/Loader';
import TableSimple from '@components/Support/TableSimple';


export default function CategPage() {



    const [nome, setNome] = useState<string>("");
    const [numCard, setNumCard] = useState<string>("");
    const [dataval, setDataVal] = useState<string>("");
    const [codsec, setCodsec] = useState<string>("");
    const [bandeira, setBandeira] = useState<string>("Mastercard");
    const [fav, setFav] = useState<boolean>(false);
    const [ativo, setAtivo] = useState<boolean>(true);
    const [idItem, setIdItem] = useState<string>("");
    const [tipoCard, setTipoCard] = useState<number>(0);
    const [debito, setDebito] = useState<boolean>(false);
    const [credito, setCredito] = useState<boolean>(false);


    return (
        <FormSmall>


            <TitleForm>CATEGORIAS</TitleForm>

            <CardFlexCol color={"#BCD2EE"} space={10}>
                <Stack direction={'row'} spacing={2}>
                    <TextField
                        id="outlined-basic"
                        label="Categoria"
                        variant="outlined"
                        style={{ width: '50%' }}
                        value={numCard}
                        size={'small'}
                        onChange={(e) => setNumCard(e.target.value)} />

                    <FormControlLabel
                        control={<Checkbox checked={ativo} size={'small'} style={{ fontSize: "10px !important", color: "green" }} />}
                        label="Ativo"
                        style={{ fontSize: "10px !important" }}
                    />
                </Stack>
                <TableSimple
                    header={["A", "B", "C"]}
                    rows={[["1", "A", "A"], ['2', "A", "A"], ['3', "A", "A"], ['2', "A", "A"], ['3', "A", "A"]]}
                    shrink />
            </CardFlexCol>

            <BoxBorder>
                <DivLeft>
                    <Image src={"/icons/file2.svg"} width={35} height={35} style={{ marginRight: "10px" }} />
                    <Image src={"/icons/Download.svg"} width={29} height={35} style={{ marginRight: "50px" }} />
                    <Image src={"/icons/del2.svg"} width={35} height={35} />
                </DivLeft>


            </BoxBorder>


            <CardFlexCol color={"#BCD2EE"} space={10}>
                <Stack direction={'row'} spacing={2}>
                    <TextField
                        id="outlined-basic"
                        label="SubCategoria"
                        variant="outlined"
                        style={{ width: '50%' }}
                        size={'small'}
                        value={numCard}
                        onChange={(e) => setNumCard(e.target.value)} />
                    <FormControlLabel
                        control={<Checkbox checked={ativo} size={'small'} />}
                        label="Ativo"
                    />
                </Stack>
                <TableSimple
                    header={["A", "B", "C"]}
                    rows={[["1", "A", "A"], ['2', "A", "A"], ['3', "A", "A"]]} shrink />
            </CardFlexCol>


            <BoxBorder>
                <DivLeft>
                    <Image src={"/icons/file2.svg"} width={35} height={35} style={{ marginRight: "10px" }} />
                    <Image src={"/icons/Download.svg"} width={29} height={35} style={{ marginRight: "50px" }} />
                    <Image src={"/icons/del2.svg"} width={35} height={35} />
                </DivLeft>
                <DivRight>
                    <Image src={"/icons/home.svg"} width={35} height={35} />
                </DivRight>

            </BoxBorder>


        </FormSmall>
    );
}
