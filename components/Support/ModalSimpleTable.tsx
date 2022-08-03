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
    header: string[];
    rows?: string[];
}

export default function ModalSimpleTable(props: IModal) {

    const [openMe, setopenMe] = useState(props.open);

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
                <TableSimple header={props.header} rows={props.rows} onchoiced={(row) => handleChoiced(row)} hideFirst />
            </Box>
        </Modal>

    );
}