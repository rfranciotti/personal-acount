import React from 'react';
import { ContentAreaStyled } from 'styles/global.components';
import styles from './components.module.scss';

type Props = {
    children: any;
};

const ContentArea = (props: Props) => {
    return (
        <ContentAreaStyled>
            {props.children}
        </ContentAreaStyled>
    );
};
export default ContentArea;