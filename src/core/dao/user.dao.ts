import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { hashPassword } from '../helper/user.helper';
import { dbConfig } from '../config/dbConfig';
import { appConstant } from '../constants/appConstant';

@Injectable()
export class UserDao {
  constructor(@Inject(dbConfig.userModel) private readonly userModel: Model<any>) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { username, password,role } = createUserDto;

    const createdUser = new this.userModel({
      username,
      password,
      role
    });

    let data = await createdUser.save();
    return {
        message: appConstant.UserCreated,
        id: data._id
    }
  }

  async findByUsername(username: string): Promise<any> {
    return this.userModel.findOne({ username }).exec();
  }
  async updatePassword(username: string, newPassword: string): Promise<any> {
    const hashedPassword = await hashPassword(newPassword)
    return this.userModel.findOneAndUpdate({ username }, { password: hashedPassword }, { new: true });
  }
}