import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TableSimple from './TableSimple';
import { useState } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IModal {
    open: boolean,
    onclose?: (choiced: boolean, row: any) => void; //diz que se nao vier function nao executa
}

export default function ModalSimpleTable(props: IModal) {

    const [openMe, setopenMe] = useState(props.open);

    const header = ["ID", "Num. Banco", "Nome Banco", "Agencia", "Conta", "Chave", "Pix", "Ativo", "*Fav"];
    const rows = [
        ["00001", "1", "Itau", "001", "010001.111", "CPF", "123456", "S", "N"],
        ["00002", "2", "Bradesco", "002", "010001.112", "CNPJ", "456789", "N", "S"]];

    const handleClose = () => {
        setopenMe(false);
        props.onclose?.(false, []);
    };

    const handleChoiced = (rowclicked: any) => {
        setopenMe(false);
        props.onclose?.(true, rowclicked);
    };


    return (


        <Modal
            open={openMe}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} style={{ backgroundColor: "#E7ECEF", width: "60%", maxWidth: "800px" }}>
                <TableSimple header={header} rows={rows} onchoiced={(row) => handleChoiced(row)} hideFirst />
            </Box>
        </Modal>

    );
}