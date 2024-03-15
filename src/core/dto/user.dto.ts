import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';

export enum ROLE_TYPE {
  PARTNER = 'PARTNER',
  CUSTOMER = 'CUSTOMER',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLE_TYPE)
  role: ROLE_TYPE
}

export class UserSignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}