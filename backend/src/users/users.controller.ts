import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signUp')
  async signUp(@Body() user: User): Promise<void> {
    await this.usersService.addUser(user);
  }

  @Post('/signIn')
  async signIn(
    @Body() authCredentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.signIn(authCredentials);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async user(@Param('id') id: string): Promise<Omit<User, 'password'> | void> {
    const userData = await this.usersService.findUserById(id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = userData.dataValues;

    return rest;
  }
}
