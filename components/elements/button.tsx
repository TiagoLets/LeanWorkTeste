import styled from 'styled-components'

type ButtonProps = {
    disabled?: boolean
    type?: "button" | "submit" | "reset" | undefined
    text?: string
    href?: string
}

export function Button({ type, disabled, text, href, ...rest }: ButtonProps) {
    return (
        <>
            {
                href ? 
                <a href={href} {...rest}><ButtonStyle>{text}</ButtonStyle></a> :
                <button type={type} disabled={disabled} {...rest}><ButtonStyle>{text}</ButtonStyle></button> 
            }
        </>

    )
}

const ButtonStyle = styled.div`
    background-color: #40c8f4;
    color: #fff;
    border: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    padding: 0 70px;
    border-radius: 50px;
    transition: 0.3s;

    &:hover {
        transition: 0.3s;
        background-color: rgba(64, 200, 244, 0.7);
        color: #fff;
    }
    &:disabled {
        color: #dddcdc;
        background-color: #f6f6f6;
    }
`