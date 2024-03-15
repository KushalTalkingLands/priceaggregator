import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDao } from 'src/core/dao/user.dao';
import { CreateUserDto,UserSignInDto } from 'src/core/dto/user.dto';
import { generateJwtToken,hashPassword,comparePasswords } from 'src/core/helper/user.helper';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

async signUp(createUserDto: CreateUserDto): Promise<any> {
    const { username, password,role } = createUserDto;
    
    // Check if the username already exists
    const existingUser = await this.userDao.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username already exists.');
    }

    // Hash the password
    const hashedPassword = await hashPassword(password)

    try {
      return await this.userDao.createUser({ username, password: hashedPassword,role:role });
    } catch (error) {
      throw error;
    }
  }

  async signIn(UserSignInDto: UserSignInDto): Promise<any> {
    const { username, password } = UserSignInDto;
    const user = await this.userDao.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Compare entered password with stored hashed password
    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    const token = generateJwtToken(user.username,user.role);

    return { message:"Signed in successfully",token };
  }

  async findUserByUsername(username: string): Promise<any> {
    const user = await this.userDao.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
  async changePassword(username: string, newPassword: string): Promise<any> {
    const user = await this.findUserByUsername(username);

    if (user) {
    return this.userDao.updatePassword(user.username, newPassword);
    }
    else{
        throw new NotFoundException('User not found.');
    }
  }
}