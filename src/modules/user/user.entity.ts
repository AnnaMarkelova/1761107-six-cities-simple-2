import { UserType } from '../../types/user-type.enum.js';
import { User } from '../../types/user.type.js';
import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/common.js';

const NAME_LENGTH_MIN = 1;
const NAME_LENGTH_MAX = 15;

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base { }

modelOptions({
  schemaOptions: {
    collection: 'users'
  }
});

export class UserEntity extends defaultClasses.TimeStamps implements User {

  constructor(data: User) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatarUrl = data.avatarUrl;
    this.typeUser = data.typeUser;
  }

  @prop({
    required: true,
    default: '',
    minlength: [NAME_LENGTH_MIN, 'Min length for name is 1'],
    maxlength: [NAME_LENGTH_MAX, 'Min length for name is 15'],
  })
  public name!: string;

  @prop({
    unique: true,
    required: true
  })
  public email!: string;

  @prop()
  public avatarUrl!: string;

  @prop({
    required: true
  })
  public password!: string;

  @prop({
    default: UserType.Normal,
    required: true,
    type: String,
    enum: ['Normal', 'Pro']
  })
  public typeUser!: UserType;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
