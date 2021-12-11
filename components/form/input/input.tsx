import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import styled from 'styled-components'

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

            {error && <span className="error-message">{error}</span>}
        </InputContainer>
    );
}

const InputContainer = styled.div`
    margin-bottom: 40px;
    
    input {
        display: flex;
        height: 35px;
        border-width: 0 0 1px 0;
        border-style: solid;
        border-color: #dbdbdb;
        width: 100%;
        color: #efeeed;

        &:focus {
            color: #555555;
        }
    }

    label {
        color: #999999;
        margin-bottom: 5px;
    }

    .error-message {
        color: #A91919;
        font-size: 0.85rem;
    }

    @media only screen and (max-width: 865px) {
        label {
        margin-bottom: 3px;
        }
        input {
        height: 25px;
        }
    }
`