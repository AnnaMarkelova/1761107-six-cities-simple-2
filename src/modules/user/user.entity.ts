import { UserType } from '../../types/user-type.enum.js';
import { User } from '../../types/user.type.js';
import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/common.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

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

  @prop({required: true, default: '', minlength: 1, maxlength: 15})
  public name!: string;

  @prop({ unique: true, required: true, match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'] })
  public email!: string;

  @prop()
  public avatarUrl!: string;

  @prop({required: true, minlength: 6, maxlength: 12})
  public password!: string;

  @prop({required: true})
  public typeUser!: UserType;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
