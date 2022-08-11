import styled from 'styled-components';

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1100px',
  laptopL: '1440px',
  desktop: '1640px',
  desktopL: '2560px'
};


const devicemin = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktopL})`
};

const devicemax = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktopL})`
};


export const MainForm = styled.div`

    
  width:100%;
  height:100%;
  background-color:white;
  border-radius:20px;
  
    -webkit-box-shadow: 0px 0px 7px -3px #000000; 
    box-shadow: 7px 2px 7px -3px #000000;
    
    overflow-y:auto;
    overflow-x:hidden;

    min-width:240px;


@media (${devicemax.mobileS}) {
  background-color:red;
}


`;

export const MiniTitle = styled.div`
    width:100%;
    height:30px;
    background-color:#3e8eb93b;
    font-size:10px;
    font-family:'Monospace';
    display: flex;
    justify-content:center;
    align-items:center;
    padding-top:2px;
    flex-direction: column;
    
    top: 0;
    z-index: -1
    
`;

export const BarraSuperior = styled.div<{ height?: number; }>`
  display: flex;
  border: 1px solid #b8b6b5;
  width: auto;
  height: ${props => props.height ? props.height + "%" : "auto"} ;
  margin:5px;
  border-radius:12px;
  gap:4px;
  padding-left:10px

`;



export const DivData = styled.div<{ padding?: number, margin?: number; }>`
  flex:1;
  display:flex;
  flex-direction:column;
  border:1px solid #b8b6b5;
  height:auto;
  padding: ${props => props.padding && props.padding + "px"};
  margin: ${props => props.margin && props.margin + "px"};
  border-radius:10px;
  gap:5px;
  justify-content:center;
  align-items:center;
  overflow:hidden
`;
export const DivDataMiddle = styled.div<{ padding?: number, margin?: number; }>`
  flex:1;
  display:flex;
  flex-direction:column;
  border:1px solid #b8b6b5;
  height:50vh;
  padding: ${props => props.padding && props.padding + "px"};
  margin: ${props => props.margin && props.margin + "px"};
  border-radius:10px;
  gap:5px;
  justify-content:center;
  align-items:center;
  overflow:hidden
`;