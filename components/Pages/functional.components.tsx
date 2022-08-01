


import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { CardFlex } from 'styles/global.components';


/********************************************************************************************** */


interface btnProps {
    imagename: string,
    width: number,
    height: number;
    marginLeft?: number,
    marginRight?: number,
    onClick?: () => void; //diz que se nao vier function nao executa
}

export function ButtonNav(prop: btnProps) {

    return (
        <>
            <div style={{ marginRight: prop.marginRight + "px" }}>

                <Image
                    src={prop.imagename}
                    width={prop.width}
                    height={prop.height}
                    alt=""
                    onClick={() => prop.onClick?.()} //diz que se nao vier function nao executa
                    style={{ cursor: "pointer" }}
                ></Image>

            </div>
        </>
    );
}