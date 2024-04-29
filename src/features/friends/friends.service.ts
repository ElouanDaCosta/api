import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Friends } from './models/friend.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friends)
    private friendModel: typeof Friends,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Friends[]> {
    return this.friendModel.findAll();
  }

  async addFriend(userId: number, userEmailToAdd: string): Promise<Friends> {
    try {
      const findUser = await this.usersService.findOne(userId);
      if (!findUser)
        throw new HttpException(
          'Error while sending request',
          HttpStatus.BAD_REQUEST,
        );
      const findUserToAdd = await this.usersService.findOneByEmail(
        userEmailToAdd,
      );
      if (!findUserToAdd)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      if (userId === findUserToAdd.id)
        throw new HttpException(
          'You cannot add yourself as a friend...',
          HttpStatus.CONFLICT,
        );
      const isRequestAlreadySend = await this.friendModel.findOne({
        where: { friendId: findUserToAdd.id },
      });
      if (
        isRequestAlreadySend?.userId === findUser.id &&
        isRequestAlreadySend?.friendId === findUserToAdd.id
      )
        throw new HttpException('Request already send', HttpStatus.CONFLICT);
      const newFriendRequest = await this.friendModel.create({
        userId: findUser.id,
        friendId: findUserToAdd.id,
      });
      return newFriendRequest;
    } catch (error) {
      throw error;
    }
  }
}
