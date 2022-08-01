
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import React from 'react';

import '../styles/reset.css';
import '../styles/globals.scss';
import '../styles/colors.scss';
import TotalArea from '@components/Fixed/TotalArea';
import TopBar from '@components/Fixed/TopBar';
import BodyArea from '@components/Fixed/BodyArea';
import LeftBar from '@components/Fixed/LeftBar';
import ContentArea from '@components/Fixed/ContentArea';




function MyApp({ Component, pageProps }: AppProps) {

  return (
    <React.StrictMode>
      <RecoilRoot>
        <TotalArea>
          <TopBar />
          <BodyArea>
            <LeftBar />
            <ContentArea>
              <Component {...pageProps} />
            </ContentArea>
          </BodyArea>
        </TotalArea>
      </RecoilRoot>
    </React.StrictMode >
  );
}

export default MyApp;
