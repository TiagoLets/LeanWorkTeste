import { User } from 'src/interfaces/user'

export type UserAction = {
        type: 'GetUsers' | 'NewUser' | 'DeleteUser',
        payload:  User[] | string | User
};
