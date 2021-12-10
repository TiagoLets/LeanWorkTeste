import styled from 'styled-components'
import Link from 'next/link'
import "animate.css";
import { Card } from 'components/elements/card';
import { useContext } from 'react'
import { UsersContext } from 'src/contexts/userContext'
import { Button } from 'components/elements/button';

export default function HomePage() {
  const { state } = useContext(UsersContext);

  return (
    <ListingContainer>

      <Link href="/cadastro" passHref >
        <Button type="button" text="Cadastrar" href="replace" />
      </Link>

      <ListRegisters id="list-users">
        {
          state.users.length > 0 && state.users.map(({ cpf, email, phone, name }, userIndex) =>
            <Card
              key={cpf}
              name={name}
              email={email}
              phone={phone}
              cpf={cpf}
              userIndex={userIndex}
            />
          )
        }
      </ListRegisters>

      {state.users.length == 0 && (<DefaultText>
       <span>😴</span>  <strong>Nenhum cadastro registrado.</strong>
        </DefaultText>)}
    </ListingContainer>
  )
};

const ListingContainer = styled.section`
  max-width: 85%;
  width: 100%;
  margin: 0 auto;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media only screen and (max-width: 1080px) {
    max-width: 90%;
  }
  @media only screen and (max-width: 768px) {
    max-width: 95%;
  }
`

const ListRegisters = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-columns: minmax(290px, auto);
  grid-gap: 30px;
  margin-top: 40px;

  @media only screen and (max-width: 1080px) {
    grid-template-columns: repeat(2,1fr);
    grid-gap: 20px;
    margin-top: 30px;
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1,1fr);
    grid-auto-columns: minmax(220px, auto);
    grid-gap: 15px;
    margin-top: 20px;
  }
`
const DefaultText = styled.p`
     font-size: 27px;
     margin: 0;
     text-align: center;
     display: flex;
     align-items: center;
     justify-content: center;
     flex-direction: column;
     flex: 1;
     span {
       font-size: 40px;
     }

`