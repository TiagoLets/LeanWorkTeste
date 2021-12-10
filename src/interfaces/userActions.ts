import { User } from 'src/interfaces/user'

export type UserAction =
    |
        {
            type: 'GetUsers',
            payload: User[]
        }
    |
        {
            type: 'NewUser',
            payload: User,
        }
    |
        {
            type: 'DeleteUser';
            payload: number,
        };
;
