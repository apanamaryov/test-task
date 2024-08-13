import {Body, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async addUser(user: User): Promise<User> {
    const { password } = user;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.userModel.create({...user, password: hashedPassword});
  }

  async signIn(@Body() authCredentials: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentials;

    const user = await this.userModel.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success'
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findUserById(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }
}
