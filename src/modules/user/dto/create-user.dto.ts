import { UserType } from '../../../types/user-type.enum.js';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { NAME_LENGTH_MAX, NAME_LENGTH_MIN, PASSWORD_LENGTH_MAX, PASSWORD_LENGTH_MIN } from '../consts.js';
export default class CreateUserDto {

  @IsString({ message: 'name is required' })
  @Length(NAME_LENGTH_MIN, NAME_LENGTH_MAX, { message: `Minimum name length is ${NAME_LENGTH_MIN}, maximum is ${NAME_LENGTH_MAX}` })
  public name!: string ;

  @IsString({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid email address' })
  public email!: string;

  @IsString({ message: 'avatarPath is required' })
  public avatarUrl!: string;

  @IsString({ message: 'password is required' })
  @Length(PASSWORD_LENGTH_MIN, PASSWORD_LENGTH_MAX, {message: `Min length for password is ${PASSWORD_LENGTH_MIN}, max is ${PASSWORD_LENGTH_MAX}`})
  public password!: string;

  @IsEnum(UserType, { message: 'User type must be Default or Pro' })
  public typeUser!: UserType;
}
