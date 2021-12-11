import { ButtonStyle } from './styles'
import Link from 'next/link'

type ButtonProps = {
    disabled?: boolean
    type?: "button" | "submit" | "reset" | undefined
    text?: string
    href?: string
}

export function Button({ type, disabled, text, href, ...rest }: ButtonProps) {

    
    if (href) {
      return <Link href={href} passHref >
        <ButtonStyle>{text}</ButtonStyle>
      </Link>
    }

    return (
        <button type={type} disabled={disabled} {...rest}>
            <ButtonStyle disabled={disabled}>{text}</ButtonStyle>
        </button>
    )
}

