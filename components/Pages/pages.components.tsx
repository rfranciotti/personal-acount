import styled from 'styled-components';



const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1100px',
  laptopL: '1440px',
  laptopX: '1640px',
  desktop: '2560px'
};


const devicemin = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};

const devicemax = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`
};


export const FormSmall = styled.div`
  width:40%;
  height:auto;
  background-color:white;
  border-radius:20px;
  
    -webkit-box-shadow: 0px 0px 7px -3px #000000; 
    box-shadow: 7px 2px 7px -3px #000000;
    


@media (min-width: ${size.mobileS}) and (max-width: ${size.tablet}){
  background-color:red;
  width:70%
}
@media (min-width: ${size.tablet}) and (max-width: ${size.laptop}){
  background-color:yellow;
  width:70%
}
@media (min-width: ${size.laptop}) and (max-width: ${size.laptopX}){
  width:50%
}
@media (min-width: ${size.laptopX}) and (max-width: ${size.desktop}){
  
}
`;
export const FormLarge = styled.div<{ padding?: number; }>`
  width:100%;
  height:100%;
  background-color:white;
  border-radius:20px;
  
    -webkit-box-shadow: 0px 0px 7px -3px #000000; 
    box-shadow: 7px 2px 7px -3px #000000;
    
    overflow-y:scroll;
    overflow-x:hidden;

    padding: ${props => props.padding && props.padding + "px"};

`;

export const TitleForm = styled.div`
    top:0;
    background-color:#003180;
    width:100%;
    height:50px;

    box-shadow: 7px 2px 7px -3px #000000;
    -webkit-box-shadow: 0px 0px 7px -3px #000000; 
    border-top-left-radius:18px;
    border-top-right-radius:18px;
    
    display:flex;
    justify-content:center;
    align-items:center;
    margin-bottom:20px;
    color:white;
    font-family: 'Righteous', cursive;

    font-size: 1.5rem;
    letter-spacing:2px;
    z-index:3;
`;