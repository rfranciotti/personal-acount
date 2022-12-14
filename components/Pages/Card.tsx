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


export default function CardPage() {

    const handleChangeBandeira = (event: SelectChangeEvent) => {
        setBandeira(event.target.value as string);
    };
    const handleChangeAtivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAtivo(event.target.checked);
    };
    const handleChangeDebito = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDebito(event.target.checked);
    };
    const handleChangeCredito = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredito(event.target.checked);
    };

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


    const [statusSaved, setstatusSaved] = useState<boolean>(false);
    const [alert, setAlert] = useState<number>(0);
    const [showModal, setshowModal] = useState(false);
    const [showModalPesq, setshowModalPesq] = useState(false);
    const [loader, setLoader] = useState(false);
    const [headerTablePesq, setHeaderTablePesq] = useState<string[]>([]);
    const [dataTablePesq, setDataTablePesq] = useState<string[]>([]);


    useEffect(() => {
        if (alert !== 0) {
            setTimeout(() => {
                setAlert(0);
            }, 3500);
        }
    }, [alert]);





    const ClearForm = () => {

        setIdItem("");
        setNumCard("");
        setNome("");
        setDataVal("");
        setCodsec("");
        setBandeira("Mastercard");
        setAtivo(false);
        setFav(false);
        setDebito(false);
        setCredito(false);
        setstatusSaved(false);
    };

    const closeModalNew = (clear: boolean, rowdata: any) => {
        setshowModal(false);
        console.log?.(rowdata);
        if (clear === true) { ClearForm(); }
    };
    const closeModalPesq = (haschoice: boolean, choiced?: any) => {
        setshowModalPesq(false);
        if (haschoice) {
            setIdItem(choiced[0]);
            setBandeira(choiced[6]);
            setNumCard(choiced[1]);
            setNome(choiced[2]);
            setDataVal(choiced[3]);
            setCodsec(choiced[4]);

            setAtivo(choiced[7] === "S" ? true : false);
            setFav(choiced[8] === "S" ? true : false);

            setTipoCard(choiced[5]);

            setDebito(choiced[5] === 2 || choiced[5] === 3 ? true : false);
            setCredito(choiced[5] === 1 || choiced[5] === 3 ? true : false);

        } else {

        }

    };

    const handleNew = () => {

        if ((nome !== "" || codsec !== "" || dataval !== "") && !statusSaved) {
            setshowModal(true);
        } else { ClearForm(); }
    };



    const handleSave = async () => {

        let tipo = 0;
        if (credito) { tipo = 1; }
        if (debito) { tipo = 2; }
        if (credito && debito) { tipo = 3; }


        const saveData = {
            id_card: idItem,
            num_card: numCard,
            nome_card: nome,
            cod_sec: codsec,
            dt_val: dataval,
            bandeira: bandeira,
            tp_card: tipo,
            fav: fav,
            ativo: ativo
        };

        console.log(saveData);

        setLoader(true);

        if (idItem === "") {

            await axios.post('http://localhost:6001/api/card/', saveData)
                .then((response) => {
                    if (response.status === 202) { setAlert(1); } else { setAlert(2); }
                    setLoader(false);
                })
                .catch((error) => {
                    console.log("Erro Post Card", error);
                    setAlert(99);
                    setLoader(false);
                });
        } else {

            await axios.patch('http://localhost:6001/api/card/', saveData)
                .then((response) => {
                    if (response.status === 202) { setAlert(1); } else { setAlert(2); }
                    console.log(response);
                    setLoader(false);
                })
                .catch((error) => {
                    console.log("Erro Patch Card");
                    setAlert(99);
                    setLoader(false);
                });
        }
        setstatusSaved(true);
    };

    const handlePesq = async () => {
        setHeaderTablePesq(["ID", "Num", "Nome Card", "Data Val", "Cod Sec.", "*Tipo", "Bandeira", "Ativo", "*Fav"]);
        let datarow: any = [];
        await axios.get('http://localhost:6001/api/cards/')
            .then((response) => {

                let ativo = "";
                let fav = "";

                for (let index = 0; index < response.data.data.length; index++) {

                    const element = response.data.data[index];

                    if (element.st_ativo) { ativo = "S"; } else { ativo = "N"; }
                    if (element.st_fav) { fav = "S"; } else { fav = "N"; }

                    datarow.push([element._id, element.num_card,
                    element.nome_card, element.dt_val,
                    element.cod_sec, element.tp_card, element.bandeira, ativo, fav]);
                }
                setDataTablePesq(datarow);
            })
            .catch((error) => {
                console.log("Erro Find Cards", error);
            });



        setshowModalPesq(true);
    };







    return (
        <FormSmall>
            <MyLoader active={loader}>

                <TitleForm>CART??ES</TitleForm>

                <CardFlexCol color={"#BCD2EE"} space={10}>
                    <Stack direction={'row'} spacing={2}>
                        <Select value={bandeira} onChange={handleChangeBandeira} style={{ width: '40%' }}>
                            <MenuItem value={"Mastercard"}>Mastercard</MenuItem>
                            <MenuItem value={"Visa"}>Visa</MenuItem>
                            <MenuItem value={"Amex"}>Amex</MenuItem>
                            <MenuItem value={"Outros"}>Outros</MenuItem>
                        </Select>

                        <FormControlLabel
                            control={<Checkbox onChange={handleChangeAtivo} value={ativo} checked={ativo} />}
                            label="Ativo"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleChangeDebito} value={debito} checked={debito} />}
                            label="D??bito"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleChangeCredito} value={credito} checked={credito} />}
                            label="Credito"
                        />
                    </Stack>
                </CardFlexCol>

                <CardFlexCol color={"#BCD2EE"} space={10}>
                    <Stack direction={'row'} spacing={2}>
                        <TextField id="outlined-basic" label="Num." variant="outlined" style={{ width: '50%' }} value={numCard} onChange={(e) => setNumCard(e.target.value)} />
                        <TextField id="outlined-basic" label="Nome Card" variant="outlined" style={{ width: '50%' }} value={nome} onChange={(e) => setNome(e.target.value)} />
                    </Stack>
                </CardFlexCol>
                <CardFlexCol color={"#BCD2EE"} space={10}>
                    <Stack direction={'row'} spacing={2}>
                        <TextField id="outlined-basic" label="Data Val." variant="outlined" style={{ width: '30%' }} value={dataval} onChange={(e) => setDataVal(e.target.value)} />
                        <TextField id="outlined-basic" label="Cod. Security" variant="outlined" style={{ width: '30%' }} value={codsec} onChange={(e) => setCodsec(e.target.value)} />
                    </Stack>
                </CardFlexCol>


                <BoxBorder>
                    <DivLeft>
                        <Image src={"/icons/file2.svg"} width={50} height={50} style={{ marginRight: "10px" }} onClick={handleNew} />
                        <Image src={"/icons/Download.svg"} width={41} height={50} style={{ marginRight: "50px" }} onClick={handleSave} />
                        <Image src={"/icons/del2.svg"} width={50} height={50} />
                        {fav === true ?
                            <Image src={"/icons/love1.png"} width={50} height={50} onClick={() => setFav(!fav)} /> :
                            <Image src={"/icons/love2.svg"} width={50} height={50} onClick={() => setFav(!fav)} />
                        }

                        <Image src={"/icons/browser.svg"} width={41} height={50} onClick={handlePesq} />
                    </DivLeft>
                    <DivRight>
                        <Image src={"/icons/home.svg"} width={50} height={50} />
                    </DivRight>

                </BoxBorder>
                {showModal === true &&
                    <ModalSimple
                        open={true}
                        header={"Descartar altera????es?"}
                        content={"Campos est??o com conte??do. Descartar ?"}
                        btnYes
                        btnNo
                        onGetReturn={(clear, getret) => closeModalNew(clear, getret)} />
                }
                {showModalPesq && <ModalSimpleTable
                    open={true}
                    header={headerTablePesq}
                    rows={dataTablePesq}
                    onclose={(haschoice, row) => closeModalPesq(haschoice, row)} />}





            </MyLoader>
            {alert === 0 && <></>}
            {alert !== 0 &&
                <motion.div animate={{ y: 25 }}>
                    <div style={{
                        position: "fixed",
                        bottom: "-25px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        {alert === 1 && <Alert severity="error">Ocorreu erro!</Alert>}
                        {alert === 2 && <Alert severity="success">Opera????o Efetuada !</Alert>}
                        {alert === 99 &&
                            <Alert severity="warning">
                                <AlertTitle>Erro Geral</AlertTitle>
                                Houve erro geral <span style={{ fontStyle: "italic", fontWeight: 'bold' }}>Contate Administrador</span>
                            </Alert>}
                    </div>
                </motion.div>
            }
        </FormSmall >
    );
}
