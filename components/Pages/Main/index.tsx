import * as React from 'react';
import { BarraSuperior, DivData, DivDataMiddle, MainForm, MiniTitle } from './components';
import { useState, useEffect } from 'react';
import zIndex from '@mui/material/styles/zIndex';
import Image from 'next/image';
import { DivFlex, DivLeft } from 'styles/global.components';
import MaterialUIPickers from '@components/Support/DatePicker';
import { getFullDate } from 'Support/functions';
import styles from './main.module.scss';
import { TextField } from '@mui/material';
import TableLeft from './TableLeft';


interface Size {
    width: number | undefined;
    height: number | undefined;
}

// Hook


function ResizeMe(): Size {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<Size>({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state

            let box = document.getElementById('MainContainer');

            setWindowSize({
                width: box?.clientWidth,
                height: box?.clientHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => document.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

export default function Main() {

    const [barraTitle, setbarraTitle] = useState<boolean>(false);
    const [diasemana, setDiaSemana] = useState<string>("");
    const [tipodia, setTipoDia] = useState<string>(" ");

    const size: Size = ResizeMe();

    function getTypeDevice(width: any) {
        if (width <= sizeModel.mobileS) {
            return 'mobileS';
        }
        if (width <= sizeModel.mobileS) {
            return 'mobileS';
        }
        if (width > sizeModel.mobileS && width <= sizeModel.mobileM) {
            return 'mobileM';
        }
        if (width > sizeModel.mobileM && width <= sizeModel.mobileL) {
            return 'mobileL';
        }
        if (width > sizeModel.mobileL && width <= sizeModel.tablet) {
            return 'tablet';
        }
        if (width > sizeModel.tablet && width <= sizeModel.laptop) {
            return 'laptop';
        }
        if (width > sizeModel.laptop && width <= sizeModel.laptopL) {
            return 'laptopL';
        }
        if (width > sizeModel.laptopL && width <= sizeModel.desktop) {
            return 'desktop';
        }
        if (width > sizeModel.desktop) {
            return 'desktopL';
        }
    }

    const sizeModel = {
        mobileS: 320 - 80,
        mobileM: 375 - 80,
        mobileL: 425 - 80,
        tablet: 768 - 80,
        laptop: 1100 - 80,
        laptopL: 1440 - 80,
        desktop: 1664 - 80,
        desktopL: 2560 - 80
    };



    function getDatePicker(mydate: Date) {
        console.log(mydate, "🗓️");
        console.log(getFullDate(mydate), "🗓️");
        setDiaSemana(getFullDate(mydate));
    }


    return (
        <MainForm id={"MainContainer"} >
            {barraTitle && <MiniTitle>
                <span>{size.width}px / {size.height}px</span>
                <p>{getTypeDevice(size.width)}</p>
            </MiniTitle>}
            <BarraSuperior height={6}>
                <img src='/icons/add.svg' className={styles.icons}></img>
                <img src='/icons/del2.svg' className={styles.iconsMinus}></img>
                <img src='/icons/7424 - Content Planning.svg' className={styles.iconsMinusPlus}></img>
                <img src='/icons/refresh.svg' className={styles.icons}></img>
                <img src='/icons/11040 - Investigate Data.svg' className={styles.icons}></img>
                <img src='/icons/add.svg' className={styles.icons}></img>
                <img src='/icons/add.svg' className={styles.icons}></img>
            </BarraSuperior>
            <DivFlex gap={0} nomargin >
                <DivData padding={10} margin={5} >
                    <MaterialUIPickers onChangeValue={(myDate) => getDatePicker(myDate ? myDate : new Date())} />
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        style={{ width: '100%' }}
                        value={diasemana}
                        size={'small'}
                        disabled />
                    <TextField
                        id="outlined-basic"
                        variant="standard"
                        style={{ width: '50%', marginLeft: "15px" }}
                        value={diasemana}
                        size={'small'}
                        disabled />
                    <span className={`${styles["mt-10"]} ${styles["ml-5"]} `}>{tipodia}</span>
                </DivData>
                <DivData padding={10} margin={5}>

                </DivData>
                <DivData padding={10} margin={5}>

                </DivData>
            </DivFlex>
            <DivFlex gap={0} nomargin >
                <DivDataMiddle padding={10} margin={5} >
                    <TableLeft/>
                </DivDataMiddle>
                <DivDataMiddle padding={10} margin={5}>

                </DivDataMiddle>
            </DivFlex>

        </MainForm>
    );
}
