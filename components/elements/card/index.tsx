import { useContext } from 'react'
import { UsersContext } from 'src/contexts/userContext'
import { User } from 'src/interfaces/user'
import { CardStyle } from './styles'

export function Card(user: User) {
    const phoneFormatted = user.phone ? parseInt(user.phone.replace(/[^0-9\.]+/g, "")) : ''
    const { dispatch, state } = useContext(UsersContext);

    const userIndex = state.users.findIndex(item => item.cpf === user.cpf)

    function deleteUser() {
        dispatch(
            {
                type: 'DeleteUser',
                payload: user.cpf
            }
        )
    }

    return (
        <CardStyle userIndex={userIndex} data-cy="userCard">
            <div className="properties">
                <span>Nome:</span>
                <span>{user.name}</span>
            </div>

            <div className="properties">
                <span>Email:</span>
                <a href={`mailto:${user.email}`}>
                    <span>{user.email}</span>
                </a>
            </div>

            <div className="properties">
                <span>Telefone:</span>
                <a href={`tel:${phoneFormatted}`}>
                    <span>{user.phone}</span>
                </a>
            </div>

            <div className="properties">
                <span>CPF:</span>
                <span className="cpf">{user.cpf}</span>
            </div>

            <div className="delete" data-cy="deleteButton" onClick={deleteUser}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
            </div>
        </CardStyle>
    )
}

