import { UserType } from './user-type.enum';

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  typeUser: UserType;
}
