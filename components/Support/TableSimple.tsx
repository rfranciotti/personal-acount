import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LetTableRows from './LetTableRows';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



interface IAppProps {
    header: string[],
    rows: any[];
    hideFirst?: boolean,
    onchoiced?: (row: any) => void; //diz que se nao vier function nao executa
}

export default function TableSimple(props: IAppProps) {

    const handleDoubleClick = (row: any) => {
        props.onchoiced?.(row);
    };


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {props.header.map((index, key) => {

                            console.log(index);


                            if (key === 0 && props.hideFirst) {
                                return (<StyledTableCell key={key} align="left" style={{ display: "none" }}>{index}</StyledTableCell>);

                            } else {
                                if (index.startsWith("*")) {
                                    return (<StyledTableCell key={key} align="left" style={{ display: "none" }}>{index}</StyledTableCell>);
                                } else {
                                    return (<StyledTableCell key={key} align="left" >{index}</StyledTableCell>);
                                }
                            }



                        })}
                    </TableRow>
                </TableHead>
                <TableBody>


                    {props.rows.map((row, key) => {

                        let pushMeRows: any[] = [];

                        for (let i = 0; i < row.length; i++) {
                            console.log("PROPS HEADER", props.header[i]);
                            if (i === 0) {


                                if (props.hideFirst) {
                                    pushMeRows.push(
                                        <StyledTableCell component="th" scope="row" key={i} style={{ display: "none" }} >
                                            {row[0]}
                                        </StyledTableCell>
                                    );
                                } else {
                                    pushMeRows.push(
                                        <StyledTableCell component="th" scope="row" key={i} >
                                            {row[0]}
                                        </StyledTableCell>
                                    );
                                }


                            } else {
                                if (props.header[i].startsWith("*")) {
                                    pushMeRows.push(<StyledTableCell style={{ display: "none" }} align="left" key={i}>{row[i]}</StyledTableCell>);
                                } else {
                                    pushMeRows.push(<StyledTableCell align="left" key={i}>{row[i]}</StyledTableCell>);
                                }

                            }
                        }



                        return (
                            <StyledTableRow key={key}
                                onDoubleClick={() => { handleDoubleClick(row); }}
                                style={{ cursor: "pointer" }}>
                                <LetTableRows elements={pushMeRows} />
                            </StyledTableRow>
                        );

                    })}


                </TableBody>
            </Table>
        </TableContainer >
    );
}