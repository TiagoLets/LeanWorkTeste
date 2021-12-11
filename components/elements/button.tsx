import styled from 'styled-components'

type ButtonProps = {
    disabled?: boolean
    type?: "button" | "submit" | "reset" | undefined
    text?: string
    href?: string
}
type StyleProps ={
    disabled?: boolean
}

export function Button({ type, disabled, text, href, ...rest }: ButtonProps) {
    console.log(disabled)
    return (
        <>
            {
                href ? 
                <a href={href} {...rest}><ButtonStyle>{text}</ButtonStyle></a> :
                <button type={type} disabled={disabled} {...rest}><ButtonStyle disabled={disabled}>{text}</ButtonStyle></button> 
            }
        </>

    )
}

const ButtonStyle = styled.div<StyleProps>`
    background-color: ${(props) => props.disabled ? '#f6f6f6' : '#40c8f4'} ;
    color: ${(props) => props.disabled ? '#dddcdc' : '#fff'};
    border: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    padding: 0 70px;
    border-radius: 50px;
    transition: 0.3s;
    cursor: ${(props) => props.disabled ? 'no-drop' : 'pointer'};
    &:hover {
        transition: 0.3s;
        background-color: ${(props) => props.disabled ? '#f6f6f6' : 'rgba(64, 200, 244, 0.7)'} ;
        color: ${(props) => props.disabled ? '#dddcdc' : '#fff'};
    }
`