import styled from 'styled-components'

type StyleProps = {
    disabled?: boolean
}

export const ButtonStyle = styled.div<StyleProps>`
    background-color: ${(props) => props.disabled ? '#f6f6f6' : '#40c8f4'} ;
    color: ${(props) => props.disabled ? '#dddcdc' : '#fff'};
    border: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    width: 220px;
    border-radius: 50px;
    transition: 0.3s;
    cursor: ${(props) => props.disabled ? 'no-drop' : 'pointer'};
    &:hover {
        transition: 0.3s;
        background-color: ${(props) => props.disabled ? '#f6f6f6' : 'rgba(64, 200, 244, 0.7)'} ;
        color: ${(props) => props.disabled ? '#dddcdc' : '#fff'};
    }
`