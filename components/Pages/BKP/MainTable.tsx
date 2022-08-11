import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styles from './main.module.scss';
import Image from 'next/image';


interface Column {
    id: 'id1' | 'data' | 'forma' | 'descr' | 'valor' | 'status';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
    image?: string;
}
var formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
const columns: Column[] = [
    { id: 'id1', label: 'ID', minWidth: 70 },
    { id: 'data', label: 'Data Vcto', minWidth: 140 },
    {
        id: 'forma',
        label: 'Forma',
        minWidth: 160,
        align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'descr',
        label: 'Descrição',
        minWidth: 260,
        align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'valor',
        label: 'Valor',
        minWidth: 100,
        align: 'right',
        format: (value: number) => value.toLocaleString('pt-br', formato)
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'center',
        image: "./Atrasado.png"
    },
];

interface Data {
    id1: string;
    data: string;
    forma: string;
    descr: string;
    valor: number;
    status: string;
}

function createData(
    id1: string,
    data: string,
    forma: string,
    descr: string,
    valor: number,
    status: string,
): Data {
    //const density = population / size;
    return { id1, data, forma, descr, valor, status };
}

const rows = [
    createData('1111', '23/06/2022 - QUI', "Cheque Pré Datado", "Caixa Habitação (Parcela 06/570)", 5475.55, '/icons/Atrasado.png'),

];

export default function ColumnGroupingTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%' }} >
            <TableContainer sx={{ minHeight: 320, maxHeight: 320 }} >
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead >
                        <TableRow>
                            <TableCell align="center" colSpan={2} className={styles.masterTitle}>
                                Data
                            </TableCell >
                            <TableCell align="center" colSpan={4} className={styles.masterTitle}>
                                Detalhes
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    className={styles.tableTitle}
                                    align={column.align}
                                    style={{ top: 10, minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id1} className={styles.tableRow}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align} className={styles.tableCell}>
                                                    {column.format && typeof value === 'number'
                                                        && column.format(value)
                                                    }
                                                    {column.image && typeof value === 'string'
                                                        && <Image src={value} width={50} height={30} style={{ paddingTop: "5px" }}></Image>
                                                    }
                                                    {typeof value === 'string' && !column.image && value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className={styles.tablePagination}
            />
        </Paper>
    );
}