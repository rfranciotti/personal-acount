import * as React from 'react';
import { FormLarge } from './pages.components';
import styles from './main.module.scss';

export interface IAppProps {
}

export default function Main(props: IAppProps) {
    return (
        <FormLarge>
            <div className={styles.sectorGrid}>
                <div className={`${styles.sectorTop} ${styles.colls}`}>
                    <div className={styles.topLeft}></div>
                    <div className={styles.topMiddle}></div>
                    <div className={styles.topRight}></div>
                </div>
                <div className={styles.sectorMiddle}>

                </div>
                <div className={styles.sectorBottom}>

                </div>
            </div>
        </FormLarge>
    );
}
