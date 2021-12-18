import { useReducer, createContext, ReactNode, useEffect, Dispatch , useContext} from 'react'
import { User } from 'src/interfaces/user'
import { UserAction } from 'src/interfaces/userActions'

interface ProvidersProps { children: ReactNode }

type UserState = {
    users: User[],
}
const initialState: UserState = {
    users: [],
};

function reducer(state: UserState, action: UserAction): UserState {
    const payload = action.payload

    function storeData(value: User[]) {
        localStorage.setItem('storage_users', JSON.stringify(value))
    }

    switch (action.type) {
        case 'NewUser':
            const newListUsers: User[] = [payload as User, ...state.users]

            storeData(newListUsers)

            return {
                users: newListUsers
            }
        case 'DeleteUser':

            const newUserList = state.users.filter((user: User) => user.cpf !== (payload as string))

            storeData(newUserList)

            return {
                users: newUserList,
            };
        case 'GetUsers':
            return {
                users: payload as User[],
            };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

// const UsersContext = createContext<{ state: UserState; dispatch: Dispatch<UserAction> } | undefined>({ state: initialState, dispatch: () => null });

const UsersContext = createContext<{ state: UserState; dispatch: Dispatch<UserAction> } | undefined>(undefined);

function UserProvider({ children }: ProvidersProps) {

    const [state, dispatch] = useReducer(reducer, initialState)

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

function useUsers() {
    const context = useContext(UsersContext)
    
    if (context === undefined) {
      throw new Error('useCount must be used within a CountProvider')
    }
    return context
  }
  
  export { UserProvider , useUsers }