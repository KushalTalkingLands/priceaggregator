import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { appConfig } from '../config/appConfig';

const jwtSecretKey = appConfig.jwtToken;

export const generateJwtToken = (username: string,role: string): string => {
  return jwt.sign({ username,role }, jwtSecretKey, { expiresIn: '1h' }); // Set token expiration as needed
};

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePasswords = async (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(plainTextPassword, hashedPassword);
};
 // Import your user entity

export const Roles = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: CreateUserDto = request.user; // Assuming you have a user object attached during authentication
    return data ? user && user[data] : user;
  },
);