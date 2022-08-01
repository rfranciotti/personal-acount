import styled from 'styled-components';





export const TotalAreaStyled = styled.div`
    background: url('/backgrounds/07.jpg') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    width:100%;
    height:100vh;
    display: grid;
    grid-template-rows: 6vh 94vh;
`;

export const BodyAreaStyled = styled.div`

    display: flex;
    padding-top: 40px;
    padding-left: 120px;
    padding-right: 40px;
    padding-bottom: 40px;
`;

export const ContentAreaStyled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;


export const CardFlex = styled.div<{ noborder?: boolean; space?: number; color?: any; }>`
    display:flex;
    margin-top:5px;
    margin-bottom:10px;
    margin-left:10px;
    margin-right:10px;
    border-radius: 5px;
    padding:20px;
    border: ${props => props.noborder ? `0px` : `2px solid ${props.color}`};
    font-family: 'Poppins', sans-serif !important;
    gap:${props => props.space + "px"} ;
    @media(max-width: 800px) {
        display: inline-block;
        *{
            width:100% !important;
            margin-bottom:5px
        }
    };
    @media(min-width: 801px) and (max-width: 1200px) {
        display: inline-block;
        *{
            width:100% !important;
            margin-bottom:5px
        }
    };

`;
export const CardFlexCol = styled.div<{ noborder?: boolean; space?: number; color?: any; }>`
    display:flex;
    margin-top:5px;
    margin-bottom:10px;
    margin-left:10px;
    margin-right:10px;
    border-radius: 5px;
    padding:20px;
    border: ${props => props.noborder ? `0px` : `2px solid ${props.color}`};
    font-family: 'Poppins', sans-serif !important;
    gap:${props => props.space + "px"} ;
    flex-direction:column;
`;

export const BoxBorder = styled.div`
    border:1px solid gray;
    margin:10px;
    padding:10px;
    border-radius:10px;
    display:flex;
    
`;

export const DivFlex = styled.div<{ gap: number; bottom?: number; }>`

    margin-top:20px;
    display:flex;
    gap:${props => props.gap + "px"} ;
    margin-bottom:${props => props.bottom ? props.bottom + "px" : "0px"} ;
`;

export const DivLeft = styled.div<{ bottom?: number; }>`
    flex:1;
    display:flex;
    gap:10px;
    margin-bottom:${props => props.bottom ? props.bottom + "px" : "0px"} ;
`;
export const DivRight = styled.div<{ bottom?: number; }>`
display:flex;
    flex:1;
    justify-content:right;
    margin-bottom:${props => props.bottom ? props.bottom + "px" : "0px"} ;
`;