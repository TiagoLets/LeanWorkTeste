import { useReducer, createContext, ReactNode, useEffect, Dispatch } from 'react'
import { User } from 'src/interfaces/user'
import { UserAction } from 'src/interfaces/userActions'

interface ProvidersProps { children: ReactNode }

type UserState = {
    users: User[],
}
const initialState: UserState = {
    users: [],
};

function Actions(State: UserState, Action: UserAction): UserState {
    const payload = Action.payload

    function storeData(value: User[]) {
        localStorage.setItem('storage_users', JSON.stringify(value))
    }

    switch (Action.type) {
        case 'NewUser':
            const newListUsers: User[] = [payload as User, ...State.users]
            storeData(newListUsers)

            return {
                users: newListUsers
            }
        case 'DeleteUser':

            const listClone = State.users
            listClone.splice(payload as number, 1) // O(n)

            // const deleteItemList = State.users.filter((userStorage: User) => { // O(n²)
            //     return userStorage.cpf !== (payload as User).cpf
            // })

            storeData(listClone)

            return {
                users: listClone,
            };
        case 'GetUsers':
            return {
                users: payload as User[],
            };

        default:
            return State;
    }
}

export const UsersContext = createContext<{ state: UserState; dispatch: Dispatch<UserAction>; }>({ state: initialState, dispatch: () => null });

export function UserProvider({ children }: ProvidersProps) {

    const [state, dispatch] = useReducer(Actions, initialState)

    useEffect(() => {
        const jsonValue = localStorage.getItem('storage_users')
        const users: User[] = jsonValue && jsonValue.length > 0 ? JSON.parse(jsonValue) : [];

        dispatch(
            {
                type: 'GetUsers',
                payload: users
            }
        )
    }, [])

    return (
        <UsersContext.Provider value={{ state, dispatch }} >
            {children}
        </UsersContext.Provider>
    )
}