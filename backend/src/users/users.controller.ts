import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {User} from "./user.model";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {
  }

  @Post('/signUp')
  async signUp(@Body() user: User): Promise<User> {
    return this.usersService.addUser(user);
  }

  @Post('/signIn')
  async signIn(@Body() authCredentials: AuthCredentialsDto): Promise<string> {
    return this.usersService.signIn(authCredentials);
  }

  @Get()
  async users(): Promise<User[] | void> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async user(@Param('id') id: string): Promise<User | void> {
    console.log('>>>>>>>', id);
    return this.usersService.findUserById(id);
  }
}
