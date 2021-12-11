import React, { useRef, useContext, useState, useCallback } from 'react';

import { Bottom , Registration , Background , FlexContainer  } from './styles'

import Link from 'next/link';
import { useRouter } from 'next/router';

import "animate.css";

import { Button } from 'components/elements/button';
import Input from 'components/form/input';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import InputMask from "react-input-mask";

import { User } from 'src/interfaces/user';

import { UsersContext } from 'src/contexts/userContext'

import { validateUser  } from 'src/validators/User';

export default function CadastroPage() {
  const router = useRouter()
      , formRef = useRef<FormHandles>(null)
      , { state, dispatch } = useContext(UsersContext)
      , [nameInput, setName] = useState('')
      , [emailInput, setEmail] = useState('')
      , [phoneInput, setPhone] = useState('')
      , [cpfInput, setCpf] = useState('')


  async function handleSubmit(user: User) {

    const validationResult = await validateUser(user)

    if (!validationResult.ok) {
      formRef.current?.setErrors(validationResult.fields);
    } else {
      formRef.current?.setErrors({});
      const userExist = state.users.find((cadastro: User) => cadastro.cpf === user.cpf);

      if (!userExist) {
        dispatch?.({ type: 'NewUser', payload: user })
        router.replace('/');
      } else {
        formRef.current?.setFieldError('cpf', 'Cpf já cadastrado')
      }
    }
  };

  const buttonDisabled = !(nameInput && emailInput && cpfInput && phoneInput)

  const handleChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value), [])
      , handleChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [])
      , handleChangeCpf = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setCpf(e.target.value), [])
      , handleChangePhone = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value), [])

  return (
    <FlexContainer>
      <Background />

      <Registration>
        <h1 className="animate__animated animate__fadeInDown">Lean Cadastro</h1>

        <Form method="post" ref={formRef} onSubmit={handleSubmit} className="animate__animated animate__fadeInRight ">
          <Input
            id="name"
            type="text"
            name="name"
            label="Nome Completo"
            onChange={handleChangeName}
          />

          <Input
            id="email"
            type="email"
            name="email"
            label="E-mail"
            onChange={handleChangeEmail}
          />

          <InputMask mask="999.999.999-99" onChange={handleChangeCpf} >
            {(inputProps: React.ReactNode) => <Input id="cpf" type="text" name="cpf" label="CPF" {...inputProps} />}
          </InputMask>

          <InputMask mask="(99) 99999-9999" onChange={handleChangePhone}>
            {(inputProps: React.ReactNode) => <Input id="phone" type="text" name="phone" label="Telefone" {...inputProps} />}
          </InputMask>

          <Bottom>
            <Button type="submit" disabled={buttonDisabled} text="Cadastrar" />

            <Link href="/">
              <a>
                Home
                <img src="/images/right-arrow.png" />
              </a>
            </Link>
          </Bottom>
        </Form>
      </Registration >
    </FlexContainer>
  )
};

