import { UserType } from '../../../types/user-type.enum';

export default class CreateUserDto {
  public name!: string ;
  public email!: string;
  public avatarUrl!: string;
  public password!: string;
  public typeUser!: UserType;
}
