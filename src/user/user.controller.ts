import { Controller, Post, Body, ValidationPipe, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto,UserSignInDto } from 'src/core/dto/user.dto';
import { appConfig } from 'src/core/config/appConfig';

@Controller(appConfig.userController)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(appConfig.SignUp)
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<any> {
    return this.userService.signUp(createUserDto);
  }

  @Post(appConfig.SignIn)
  async signIn(@Body(ValidationPipe) UserSignInDto: UserSignInDto): Promise<any> {
    return this.userService.signIn(UserSignInDto);
  }

  @Get(appConfig.usernamePath)
  async findUserByUsername(@Param(appConfig.usernameParam) username: string): Promise<any> {
    return this.userService.findUserByUsername(username);
  }
  @Patch(appConfig.changePasswordPath)
  async changePassword(
    @Param(appConfig.usernameParam) username: string,
    @Body(appConfig.newPassword) newPassword: string,
  ): Promise<any> {
    return this.userService.changePassword(username,newPassword);
  }
}
