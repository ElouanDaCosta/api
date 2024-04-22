import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { User } from '../../users/user.model';

@Table({ tableName: 'friends' })
export class Friends extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  friendId: number;
}
