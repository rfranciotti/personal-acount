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


export default function BankPage() {

    const handleChangeChave = (event: SelectChangeEvent) => {
        setChave(event.target.value as string);
    };

    const [nome, setNome] = useState<string>("");
    const [numBanco, setNumBanco] = useState<string>("");
    const [agencia, setAgencia] = useState<string>("");
    const [conta, setConta] = useState<string>("");
    const [chave, setChave] = useState<string>("CPF");
    const [pix, setPix] = useState<string>("");
    const [fav, setFav] = useState<boolean>(false);
    const [ativo, setAtivo] = useState<boolean>(true);
    const [idItem, setIdItem] = useState<string>("");


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

    const handleChangeAtivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        //console.log(event.target.checked);
        setAtivo(event.target.checked);
    };



    const ClearForm = () => {

        setIdItem("");
        setNumBanco("");
        setNome("");
        setAgencia("");
        setConta("");
        setChave("CPF");
        setPix("");
        setAtivo(false);
        setFav(false);

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
            setNumBanco(choiced[1]);
            setNome(choiced[2]);
            setAgencia(choiced[3]);
            setConta(choiced[4]);
            setChave(choiced[5]);
            setPix(choiced[6]);
            setAtivo(choiced[7] === "S" ? true : false);
            setFav(choiced[8] === "S" ? true : false);



        } else {
            //console.log("no choice");
        }

    };

    const handleNew = () => {

        if ((nome !== "" || agencia !== "" || conta !== "") && !statusSaved) {
            setshowModal(true);
        } else { ClearForm(); }
    };

    const handleSave = async () => {
        const saveData = {
            id_banco: idItem,
            num_banco: numBanco,
            nome_banco: nome,
            agencia: agencia,
            conta: conta,
            chave: chave,
            pix: pix,
            fav: fav,
            ativo: ativo
        };
        console.log("DATA SAVED:", saveData);
        setLoader(true);

        if (idItem === "") {

            await axios.post('http://localhost:6001/api/banco/', saveData)
                .then((response) => {
                    if (response.status === 202) {
                        setAlert(1);
                        console.log(response.data.message);
                    } else {
                        setAlert(2);
                    }
                    setLoader(false);
                })
                .catch((error) => {
                    console.log("Erro Post Banco", error);
                    setAlert(99);
                    setLoader(false);
                });
            setstatusSaved(true);
        } else {
            //console.log("PATH");
            console.log(saveData);

            await axios.patch('http://localhost:6001/api/banco/', saveData)
                .then((response) => {
                    if (response.status === 202) {
                        setAlert(1);
                        console.log(response.data.msg);
                    } else {
                        setAlert(2);
                    }
                })
                .catch((error) => {
                    console.log("Erro Patch Banco");
                    setLoader(false);
                });
            setstatusSaved(true);
            setLoader(false);
        }
    };

    const handlePesq = async () => {
        setHeaderTablePesq(["ID", "Num.2", "Nome Banco", "Agencia", "Conta", "Chave", "Pix", "Ativo", "*Fav"]);
        let datarow: any = [];
        await axios.get('http://localhost:6001/api/bancos/')
            .then((response) => {

                let ativo = "";
                let fav = "";

                for (let index = 0; index < response.data.data.length; index++) {

                    const element = response.data.data[index];

                    if (element.st_ativo) { ativo = "S"; } else { ativo = "N"; }
                    if (element.st_fav) { fav = "S"; } else { fav = "N"; }

                    datarow.push([element._id, element.num_banco,
                    element.nome_banco, element.agencia,
                    element.conta, element.tp_chave, element.pix, ativo, fav]);
                }
                setDataTablePesq(datarow);
            })
            .catch((error) => {
                console.log('2  ');

                console.log("Erro Find Bancos");
            });



        setshowModalPesq(true);
    };







    return (
        <FormSmall>
            <MyLoader active={loader}>

                <TitleForm>BANCOS</TitleForm>

                <CardFlexCol color={"#BCD2EE"} space={10}>
                    <Stack direction={'row'} spacing={2}>
                        <TextField id="outlined-basic" label="Num." variant="outlined" style={{ width: '18%' }} value={numBanco} onChange={(e) => setNumBanco(e.target.value)} />
                        <TextField id="outlined-basic" label="Nome Banco" variant="outlined" style={{ width: '90%' }} value={nome} onChange={(e) => setNome(e.target.value)} />
                    </Stack>
                </CardFlexCol>
                <CardFlexCol color={"#BCD2EE"} space={10}>
                    <Stack direction={'row'} spacing={2}>
                        <TextField id="outlined-basic" label="Agencia" variant="outlined" style={{ width: '30%' }} value={agencia} onChange={(e) => setAgencia(e.target.value)} />
                        <TextField id="outlined-basic" label="Conta" variant="outlined" style={{ width: '70%' }} value={conta} onChange={(e) => setConta(e.target.value)} />
                    </Stack>
                </CardFlexCol>
                <CardFlexCol color={"#BCD2EE"} space={10}>
                    <Stack direction={'row'} spacing={2}>
                        <Select value={chave} onChange={handleChangeChave} style={{ width: '20%' }}>
                            <MenuItem value={"CPF"}>CPF</MenuItem>
                            <MenuItem value={"Celular"}>Celular</MenuItem>
                            <MenuItem value={"CNPJ"}>CNPJ</MenuItem>
                            <MenuItem value={"Outros"}>Outros</MenuItem>
                        </Select>
                        <TextField id="outlined-basic" label="Pix" variant="outlined" style={{ width: '60%' }} value={pix} onChange={(e) => setPix(e.target.value)} />
                        <FormControlLabel
                            control={<Checkbox onChange={handleChangeAtivo} value={ativo} checked={ativo} />}
                            label="Ativo"
                        />

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
                        header={"Descartar alterações?"}
                        content={"Campos estão com conteúdo. Descartar ?"}
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
                        {alert === 2 && <Alert severity="success">Operação Efetuada !</Alert>}
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
