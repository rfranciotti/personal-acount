import * as React from 'react';
import { BodyAreaStyled } from 'styles/global.components';
import styles from './components.module.scss';

export interface IAppProps {
    children: any;
}

export default function BodyArea(props: IAppProps) {
    return (
        <BodyAreaStyled>
            {props.children}
        </BodyAreaStyled>
    );
}
