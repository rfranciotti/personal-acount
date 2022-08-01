import * as React from 'react';

export interface IAppProps {
    elements: JSX.Element[] | JSX.Element;
}

export default function LetTableRows(props: IAppProps) {
    return (
        <>
            {props.elements}
        </>
    );
}
