import "animate.css";
import { Card } from 'components/elements/card';
import { useUsers } from 'src/contexts/userContext'
import { Button } from 'components/elements/button';
import { ListingContainer , ListRegisters , DefaultText } from 'styles/pages/home'

export default function HomePage() {
  const { state } = useUsers();

  return (
    <ListingContainer>

      <Button type="button" text="Cadastrar" href="/cadastro" />

      <ListRegisters id="list-users">
        {
          state.users.length > 0 && state.users.map(({ cpf, email, phone, name }) =>
            <Card
              key={cpf}
              name={name}
              email={email}
              phone={phone}
              cpf={cpf}
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
