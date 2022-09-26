import { UserType } from './user-type.enum';

export interface User {
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
  typeUser: UserType;
}
