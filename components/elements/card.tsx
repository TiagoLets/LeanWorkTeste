//react
import { useContext } from 'react'
//context
import { UsersContext } from 'src/contexts/userContext'
//interfaces
import { User } from 'src/interfaces/user'
//styled-components
import styled, {
    keyframes
} from 'styled-components'

 export function Card(user: User) {
    const phoneReplaced = user.phone ? parseInt(user.phone.replace(/[^0-9\.]+/g, "")) : ''
    const { dispatch } = useContext(UsersContext);

    const opacity = keyframes` from {
        opacity: 0;
        transform: ${ user.userIndex && user.userIndex % 2 ? 'translateY(100%) translateX(-100%)' : 'translateY(100%) translateX(100%)'} ;
    }
    
    to {
        opacity: 1;
        transform: translateY(0%) translateX(0%);
    }
    `
    const CardStyle = styled.div`
     opacity: 0;
     animation: ${opacity} 0.5s ease-out forwards;
     animation-delay: ${user.userIndex + 's'};
     background-color: #f8f8f8;
     border-radius: 10px;
     padding: 15px 20px;

     .properties {
        width: 100%;
        display: flex;
        margin-bottom: 10px;
        flex-direction: column;
        font-size: 15px;
        span {
            font-weight: bold;
        }
        span + span {
            font-weight: 400;
        }
        span + a {
            transition: 0.2s;
            color: var(--primary-color);
        }
        span + a:visited {
            color: var(--secondary-color);
        }
        span + a:hover {
            transition: 0.2s;
            color: var(--secondary-color);
        }
     }
     .excluir {
        max-width: 20px;
        margin: 0 0 0 auto;

         svg {
            cursor: pointer;
            width: 100%;
            fill: var(--error);
         }
     }
    `

    return (
        <CardStyle>
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
                <a href={`tel:${phoneReplaced}`}>
                    <span>{user.phone}</span>
                </a>
            </div>

            <div className="properties">
                <span>CPF:</span>
                <span className="cpf">{user.cpf}</span>
            </div>

            <div className="excluir" onClick={() => {
                dispatch(
                    {
                        type: 'DeleteUser',
                        payload: user.userIndex as number
                    }
                )
            }}>
                <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
            </div>
        </CardStyle>
    )
}

