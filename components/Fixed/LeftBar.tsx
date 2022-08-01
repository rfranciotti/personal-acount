import * as React from 'react';
import styles from './components.module.scss';
import { FaBeer } from 'react-icons/fa';
import { useState } from 'react';
import { AiFillDashboard, AiTwotoneBank, AiFillIdcard } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import { BsBank2, BsAppIndicator } from 'react-icons/bs';
import { SiPicpay } from 'react-icons/si';
import { MdTimer, MdToday } from 'react-icons/md';
import { GrCatalog } from 'react-icons/gr';
import { useRouter } from 'next/router';






export interface IAppProps {
}

export default function LeftBar(props: IAppProps) {
    const router = useRouter();

    const [barOpen, setbarOpen] = useState(false);

    const handleClickBank = (e: any, target: string) => {
        e.preventDefault();
        router.push(target);
    };
    const handleClickCard = (e: any, target: string) => {
        e.preventDefault();
        router.push(target);
    };

    return (
        <div className={styles.leftBar} onMouseEnter={() => setbarOpen(true)} onMouseLeave={() => setbarOpen(false)}>
            <div className={`${barOpen ? styles.open : styles.closed}`}>
                <div className={styles.titleSector} style={{ marginTop: "10px" }}>MAIN</div>

                <div className={styles.divItem} >
                    <AiFillDashboard className={styles.icon} />
                    <span>Dashboard</span>
                </div>
                <div className={styles.divItem}>
                    <MdDashboard className={styles.icon} />
                    <span>Principal</span>
                </div>

                <div className={styles.divisor}></div>
                <div className={styles.titleSector}>Cad. Inst.</div>

                <a onClick={(e) => handleClickBank(e, './banks')} >
                    <div className={styles.divItem}>
                        <BsBank2 className={styles.icon} />
                        <span>Bancos</span>
                    </div>
                </a>
                <a onClick={(e) => handleClickCard(e, './cards')} >
                    <div className={styles.divItem}>
                        <AiFillIdcard className={styles.icon} />
                        <span>Cartões</span>
                    </div>
                </a>
                <div className={styles.divisor}></div>
                <div className={styles.titleSector}>Cad. Básico</div>
                <div className={styles.divItem}>
                    <SiPicpay className={styles.icon} />
                    <span>Formas</span>
                </div>
                <div className={styles.divItem}>
                    <MdTimer className={styles.icon} />
                    <span>Períodos</span>
                </div>
                <div className={styles.divItem}>
                    <BsAppIndicator className={styles.icon} />
                    <span>Categorias</span>
                </div>
                <div className={styles.divItem}>
                    <MdToday className={styles.icon} />
                    <span>Feriados</span>
                </div>
            </div>
        </div >
    );
}
