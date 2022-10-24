import { IsEmail, IsString, Length } from 'class-validator';
import { PASSWORD_LENGTH_MAX, PASSWORD_LENGTH_MIN } from '../consts.js';
export default class LoginUserDto {
  @IsString({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid email address' })
  public email!: string;

  @IsString({ message: 'password is required' })
  @Length(PASSWORD_LENGTH_MIN, PASSWORD_LENGTH_MAX, {message: `Min length for password is ${PASSWORD_LENGTH_MIN}, max is ${PASSWORD_LENGTH_MAX}`})
  public password!: string;
}
