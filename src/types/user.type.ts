import { UserType } from './user-type.enum';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  typeUser: UserType;
}
