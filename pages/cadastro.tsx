import React, { useRef, useContext, useState, useEffect } from 'react';
import styled from 'styled-components'

//Next
import Link from 'next/link';
import { useRouter } from 'next/router';

//animate
import "animate.css";

//components 
import { Button } from 'components/elements/button';
import Input from 'components/form/input/input';

//form
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import InputMask from "react-input-mask";

//interfaces 
import { User } from 'src/interfaces/user';

//context
import { UsersContext } from 'src/contexts/userContext'

//validator
import { validateUser } from 'src/validators/User';

export default function CadastroPage() {
  const router = useRouter()
    , formRef = useRef<FormHandles>(null)
    , { state, dispatch } = useContext(UsersContext)
    , [nameInput, setName] = useState('')
    , [emailInput, setEmail] = useState('')
    , [phoneInput, setPhone] = useState('')
    , [cpfInput, setCpf] = useState('')
    , [buttonStateDisabled, setDisabled] = useState(true)

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

  useEffect(() => {
    if (nameInput && emailInput && cpfInput && phoneInput) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }

  }, [nameInput, emailInput, cpfInput, phoneInput])

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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />

          <Input
            id="email"
            type="email"
            name="email"
            label="E-mail"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />

          <InputMask mask="999.999.999-99" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)} >
            {(inputProps: any) => <Input id="cpf" type="text" name="cpf" label="CPF" {...inputProps} />}
          </InputMask>

          <InputMask mask="(99) 99999-9999" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}>
            {(inputProps: any) => <Input id="phone" type="text" name="phone" label="Telefone" {...inputProps} />}
          </InputMask>

          <Bottom>
            <Button type="submit" disabled={buttonStateDisabled} text="Cadastrar" />

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

const FlexContainer = styled.div`
    display: flex; 
    width: 100%;

    form {
      width: 100%;
    }

  .form-content {
    max-width: 400px;
    width: 100%;
  }
`

const Background = styled.div`
    min-height: inherit;
    min-height: 100vh;
    width: calc(100% - 530px);
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-blend-mode: multiply;
    background-image: url("/images/bg.jpg"), linear-gradient(to right, var(--primary-color), var(--secondary-color));
    background-blend-mode: multiply;
`

const Registration = styled.div`
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 65px 50px;
    max-width: 530px;
    width: 100%;
    
    h1 {
    font-size: clamp(2rem, 3.125vw ,2.2rem);
    line-height: clamp(2.5rem ,4vw ,4.5rem);
    margin-bottom: 40px;
    color: #383838;
    font-weight: 300;
  }

    @media only screen and (max-width: 1600px) {
      padding: 50px 40px;
  
    h1 {
      margin-bottom: 30px;
    }
  }

  @media only screen and (max-width: 1200px) {
      padding: 35px 30px;
  
    h1 {
      margin-bottom: 20px;
    }
  }

  
  @media only screen and (max-width: 865px) {
    h1 {
      text-align: center;
    }
  
    .form-content form .flex-bottom {
      flex-direction: column;
      align-items: center;
    }
  
    .form-content form .flex-bottom * + * {
      margin-top: 15px;
    }
  }
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

   a {
    display: flex;
    font-size: 14px;
    color: #686868;
    align-items: center;
    letter-spacing: 0.7px;
  }
  img {
    color: inherit;
    height: 12px;
    width: auto;
    margin-left: 15px;
  }
`