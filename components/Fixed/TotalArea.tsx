import * as React from 'react';
import LeftBar from './LeftBar';
import TopBar from './TopBar';
import ContentArea from './ContentArea';
import styles from './components.module.scss';
import BodyArea from './BodyArea';
import { TotalAreaStyled } from 'styles/global.components';

export interface IAppProps {
    children: any;
}

export default function TotalArea(props: IAppProps) {
    return (
        <TotalAreaStyled>
            {props.children}
        </TotalAreaStyled>
    );
}
