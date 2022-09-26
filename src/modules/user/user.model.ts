import mongoose from 'mongoose';
import { UserType } from '../../types/user-type.enum.js';
import { User } from '../../types/user.type.js';

const USER_MIN_LENGTH = 1;
const USER_MAX_LENGTH = 15;

export interface UserDocument extends User, mongoose.Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [USER_MIN_LENGTH, 'Min length for name is 1'],
    maxLength: [USER_MAX_LENGTH, 'Max length for name is 15']
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  },
  avatarUrl: String,
  typeUser: UserType,
}, {
  timestamps: true,
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
