import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TableSimple from './TableSimple';
import { useState } from 'react';
import { DivFlex, DivLeft, DivRight } from 'styles/global.components';
import { ButtonNav } from '@components/Pages/functional.components';
import ContentArea from '@components/Fixed/ContentArea';
import { relative } from 'path';

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
    header: string,
    content: string,
    btnYes?: boolean,
    btnNo?: boolean,
    onGetReturn?: (clear: boolean, getReturn: any) => void;
}

export default function ModalSimple(props: IModal) {

    const [openMe, setopenMe] = useState(props.open);

    const handleClose = () => {
        setopenMe(false);
        props.onGetReturn?.(false, null);
    };

    const handleChoiced = (getReturn: any) => {
        let clear = true;
        if (getReturn === 'btnNo') {
            clear = false;
        }
        props.onGetReturn?.(clear, getReturn);
    };

    return (

        <ContentArea>
            <Modal
                open={openMe}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}
                    style={{ position: "relative", top: "50%", left: "53%", backgroundColor: "#E7ECEF", width: "60%", maxWidth: "600px", minWidth: "400px" }}>
                    <div style={{ fontSize: "24px" }}>
                        {props.header}
                    </div>
                    <hr style={{ marginTop: "20px" }} />
                    <div style={{ fontSize: "18px" }}>
                        {props.content}
                    </div>

                    <DivFlex gap={0}>
                        {props.btnYes &&
                            <>
                                <DivLeft>
                                    <Button
                                        fullWidth
                                        style={{ minWidth: "50px", maxWidth: "150px", width: "20rem" }}
                                        variant="contained" color='success' onClick={() => handleChoiced('btnYes')}>
                                        Yes, Please!
                                    </Button>
                                </DivLeft>
                            </>
                        }
                        {props.btnNo &&
                            <>
                                <DivRight>
                                    <Button
                                        fullWidth
                                        style={{ minWidth: "50px", maxWidth: "150px", width: "20rem" }}
                                        variant="contained" color='error' onClick={() => handleChoiced('btnNo')}>
                                        No...!
                                    </Button>
                                </DivRight>
                            </>
                        }

                    </DivFlex>

                </Box>
            </Modal>
        </ContentArea>

    );
}