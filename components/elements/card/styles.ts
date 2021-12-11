import styled, { keyframes } from 'styled-components'

type CardProps = {
    userIndex: number | undefined
}

const opacity = (props: CardProps) => keyframes` 
from {
    opacity: 0;
    transform: ${props.userIndex && props.userIndex % 2 ? 'translateY(100%) translateX(-100%)' : 'translateY(100%) translateX(100%)'} ;
}

to {
    opacity: 1;
    transform: translateY(0%) translateX(0%);
}
`
export const CardStyle = styled.div<CardProps>`
 opacity: 0;
 animation: ${opacity} 0.5s ease-out forwards;
 animation-delay: ${(props) => props.userIndex + 's'};
 background-color: #f8f8f8;
 border-radius: 10px;
 padding: 15px 20px;

 .properties {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
    font-size: 15px;
    span {
        font-weight: bold;
    }
    span + span {
        font-weight: 400;
    }
    span + a {
        transition: 0.2s;
        color: var(--primary-color);
    }
    span + a:visited {
        color: var(--secondary-color);
    }
    span + a:hover {
        transition: 0.2s;
        color: var(--secondary-color);
    }
 }
 .delete {
    max-width: 20px;
    margin: 0 0 0 auto;

     svg {
        cursor: pointer;
        width: 100%;
        fill: var(--error);
     }
 }
`