import { UserType } from '../../../types/user-type.enum';

export default class UpdateUserDto {
  public id?: number;
  public name?: string ;
  public email?: string;
  public avatarUrl?: string;
  public password?: string;
  public typeUser?: UserType;
}
