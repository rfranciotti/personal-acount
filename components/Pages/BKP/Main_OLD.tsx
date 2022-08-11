import * as React from 'react';
import { FormLarge } from './pages.components';
import styles from './main.module.scss';
import MainTable from './MainTable';
import MaterialUIPickers from '@components/Support/DatePicker';
import { Checkbox, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { getDateFormat, getFullDate } from 'Support/functions';
import Image from 'next/image';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioButtom from '@components/Support/RadioButtom';
import { CardFlexCol, DivFlex } from 'styles/global.components';
import CheckBox from '@components/Support/CheckBox';




export interface IAppProps {
}

export default function Main(props: IAppProps) {


    const [diasemana, setDiaSemana] = useState<string>("");
    const [tipodia, setTipoDia] = useState<string>(" ");

    useEffect(() => {
        console.log(getDateFormat(new Date(), "ExtendBR", true));
        setDiaSemana(getFullDate(new Date()));
    }, []);

    function getDatePicker(mydate: Date) {
        console.log(mydate, "🗓️");
        console.log(getFullDate(mydate), "🗓️");
        setDiaSemana(getFullDate(mydate));
    }


    const [selectedfilter, setSelectedfilter] = React.useState('a');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedfilter(event.target.value);
        console.log(event.target.value);
    };

    return (
        <FormLarge>
            <div className={styles.sectorGrid}>
                <div className={`${styles.sectorTop} ${styles.colls}`}>
                    <div className={`${styles.topLeft}`}>
                        <MaterialUIPickers onChangeValue={(myDate) => getDatePicker(myDate ? myDate : new Date())} />
                        <TextField
                            id="outlined-basic"
                            label="Dia Extenso"
                            variant="outlined"
                            style={{ width: '100%' }}
                            value={diasemana}
                            disabled />
                        <span className={`${styles["mt-10"]} ${styles["ml-5"]} `}>{tipodia}</span>
                    </div>
                    <div className={styles.topMiddle}>
                        <RadioButtom />
                    </div>
                    <div className={styles.topRight}>
                        <CardFlexCol color={"#BCD2EE"} space={5} noborder nomargin>
                            <label style={{ fontSize: '14px', marginBottom: '5px', marginTop: '5px' }}>Personalizado</label>
                            <Stack direction={'row'} spacing={2}>
                                <TextField id="outlined-basic" label="Inicio" variant="outlined" style={{ width: '50%' }} size={'small'} value={""} onChange={(e) => console.log(e)} />
                                <TextField id="outlined-basic" label="Fim" variant="outlined" style={{ width: '50%' }} size={'small'} value={""} onChange={(e) => console.log(e)} />
                                <Image src={"/icons/Refresh.svg"} width={41} height={40} style={{ paddingLeft: "10px" }} />
                            </Stack>
                            <Select style={{ width: '100%', marginTop: '10px' }} size={"small"}>
                                <MenuItem value={"CPF"}>CPF</MenuItem>
                                <MenuItem value={"Celular"}>Celular</MenuItem>
                                <MenuItem value={"CNPJ"}>CNPJ</MenuItem>
                                <MenuItem value={"Outros"}>Outros</MenuItem>
                            </Select>
                        </CardFlexCol>
                        <DivFlex gap={0} nomargin left={10} >
                            <CheckBox />
                        </DivFlex>
                    </div>
                    <div className={styles.topMostRight}>

                    </div>
                </div>


                <div className={styles.sectorMiddle}>
                    <div className={styles.btnSector}></div>
                    <div className={styles.tableSector}>
                        <MainTable />
                    </div>
                </div>
                <div className={styles.sectorBottom}>

                </div>
            </div>
        </FormLarge >
    );
}
