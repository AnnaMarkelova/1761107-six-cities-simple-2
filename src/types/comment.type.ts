import { User } from './user.type.js';

export interface Comment {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: User
}
