import { Controller, Post, Body, ValidationPipe, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto,UserSignInDto } from 'src/core/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<any> {
    return this.userService.signUp(createUserDto);
  }

  @Post('signin')
  async signIn(@Body(ValidationPipe) UserSignInDto: UserSignInDto): Promise<any> {
    return this.userService.signIn(UserSignInDto);
  }

  @Get(':username')
  async findUserByUsername(@Param('username') username: string): Promise<any> {
    return this.userService.findUserByUsername(username);
  }
  @Patch(':username/change-password')
  async changePassword(
    @Param('username') username: string,
    @Body('newPassword') newPassword: string,
  ): Promise<any> {
    return this.userService.changePassword(username,newPassword);
  }
}
