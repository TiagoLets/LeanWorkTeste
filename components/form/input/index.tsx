import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { InputContainer } from './styles'

type InputProps = {
    id: string
    name: string 
    type: string
    label: string
    onChange?(e: React.ChangeEvent<HTMLInputElement>): void
}

export default function Input({ id, name, type, label, ...rest }: InputProps) {
    const inputRef = useRef(null);

    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField])

    return (
        <InputContainer>
            <label  htmlFor={id}>{label}</label>

            <input id={id}  defaultValue={defaultValue} ref={inputRef} {...rest} />

            {error && <span className="error-message" data-cy={`error-message-${id}`}>{error}</span>}
        </InputContainer>
    );
}

