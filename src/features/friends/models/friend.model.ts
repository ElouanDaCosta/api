import { Table, Model, ForeignKey } from 'sequelize-typescript';
import { User } from '../../users/user.model';

@Table({ tableName: 'friends' })
export class Friends extends Model {
  @ForeignKey(() => User)
  userId: number;

  @ForeignKey(() => User)
  friendId: number;
}
