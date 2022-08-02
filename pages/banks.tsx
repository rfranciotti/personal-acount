import * as React from 'react';
import { useEffect } from 'react';

import BankPage from '@components/Pages/Bank';
export interface IAppProps {
}

export default function Banks(props: IAppProps) {

    const myFunction = () => {
        // your logic here
        console.log('pressed Esc ✅ 😀');
    };

    useEffect(() => {
        const keyDownHandler = (event: any) => {
            console.log('User pressed: ', event.key);

            if (event.key === 'Escape') {
                event.preventDefault();

                // 👇️ your logic here
                myFunction();
            }
        };
        document.addEventListener('keydown', keyDownHandler);

        // 👇️ clean up event listener
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    return (
        <BankPage />
    );
}
