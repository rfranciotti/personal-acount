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


export default function FormaPage() {


    const handleChangeAtivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAtivo(event.target.checked);
    };
    const handleChangeInst = (event: React.ChangeEvent<HTMLInputElement>) => {
        setreqInst(event.target.checked);
    };
    const handleChangeDoc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setreqDoc(event.target.checked);
    };
    const handleChangeCard = (event: React.ChangeEvent<HTMLInputElement>) => {
        setstCard(event.target.checked);
    };

    const [IdForma, setIdForma] = useState<string>("");
    const [nomeForma, setNomeForma] = useState<string>("");
    const [reqInst, setreqInst] = useState<boolean>(false);
    const [reqDoc, setreqDoc] = useState<boolean>(false);
    const [stCard, setstCard] = useState<boolean>(false);
    const [ativo, setAtivo] = useState<boolean>(false);
    const [fav, setFav] = useState<boolean>(false);


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

        setIdForma("");
        setNomeForma("");
        setAtivo(false);
        setFav(false);
        setreqInst(false);
        setreqDoc(false);
        setstCard(false);

        setstatusSaved(false);
    };

    const closeModalNew = (clear: boolean, rowdata: any) => {
        setshowModal(false);
        console.log?.(rowdata);
        if (clear === true) { ClearForm(); }
    };
    const closeModalPesq = (haschoice: boolean, choiced?: any) => {
        setshowModalPesq(false);
        console.log(choiced);
        if (haschoice) {
            setIdForma(choiced[0]);
            setNomeForma(choiced[1]);

            setreqInst(choiced[2] === "S" ? true : false);
            setreqDoc(choiced[3] === "S" ? true : false);
            setstCard(choiced[4] === "S" ? true : false);

            setAtivo(choiced[5] === "S" ? true : false);
            setFav(choiced[6] === "S" ? true : false);


        } else {

        }

    };

    const handleNew = () => {

        if ((nomeForma !== "") && !statusSaved) {
            setshowModal(true);
        } else { ClearForm(); }
    };



    const handleSave = async () => {

        const saveData = {
            id_forma: IdForma,
            nome_forma: nomeForma,
            req_inst: reqInst,
            req_doc: reqDoc,
            st_card: stCard,
            fav: fav,
            ativo: ativo
        };

        console.log(saveData);

        setLoader(true);

        if (IdForma === "") {

            await axios.post('http://localhost:6001/api/forma/', saveData)
                .then((response) => {
                    if (response.status === 202) { setAlert(1); } else { setAlert(2); }
                    setLoader(false);
                })
                .catch((error) => {
                    console.log("Erro Post Forma", error);
                    setAlert(99);
                    setLoader(false);
                });
        } else {

            await axios.patch('http://localhost:6001/api/forma/', saveData)
                .then((response) => {
                    if (response.status === 202) { setAlert(1); } else { setAlert(2); }
                    console.log(response);
                    setLoader(false);
                })
                .catch((error) => {
                    console.log("Erro Patch Forma");
                    setAlert(99);
                    setLoader(false);
                });
        }
        setstatusSaved(true);
    };

    const handlePesq = async () => {
        setHeaderTablePesq(["ID", "Forma", "*ReqInst", "*ReqDoc", "*StCard", "Ativo", "*Fav"]);
        let datarow: any = [];
        await axios.get('http://localhost:6001/api/formas/')
            .then((response) => {

                let ativo = "";
                let fav = "";
                let reqinst = "";
                let reqdoc = "";
                let stcard = "";

                for (let index = 0; index < response.data.data.length; index++) {

                    const element = response.data.data[index];

                    if (element.st_ativo) { ativo = "S"; } else { ativo = "N"; }
                    if (element.st_fav) { fav = "S"; } else { fav = "N"; }
                    if (element.req_inst) { reqinst = "S"; } else { reqinst = "N"; }
                    if (element.req_doc) { reqdoc = "S"; } else { reqdoc = "N"; }
                    if (element.st_card) { stcard = "S"; } else { stcard = "N"; }


                    datarow.push([element._id,
                    element.nome_forma, reqinst,
                        reqdoc, stcard, ativo, fav]);
                }
                setDataTablePesq(datarow);
            })
            .catch((error) => {
                console.log("Erro Find Formas", error);
            });



        setshowModalPesq(true);
    };







    return (
        <FormSmall>
            <MyLoader active={loader}>

                <TitleForm>FORMAS</TitleForm>



                <CardFlexCol color={"#BCD2EE"} space={10}>
                    <Stack direction={'row'} spacing={2}>
                        <TextField id="outlined-basic" label="Nome Forma" variant="outlined" style={{ width: '100%' }} value={nomeForma} onChange={(e) => setNomeForma(e.target.value)} />
                    </Stack>
                </CardFlexCol>

                <CardFlexCol color={"#BCD2EE"} space={10} centered>
                    <Stack direction={'row'} spacing={2}>

                        <FormControlLabel
                            control={<Checkbox onChange={handleChangeAtivo} value={ativo} checked={ativo} />}
                            label="Ativo"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleChangeCard} value={stCard} checked={stCard} />}
                            label="Cartão"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleChangeInst} value={reqInst} checked={reqInst} />}
                            label="Req. Inst."
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleChangeDoc} value={reqDoc} checked={reqDoc} />}
                            label="Req. Doc"
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
