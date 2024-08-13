import {Body, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./jwt-payload.interface";
import {AuthSuccessResponseDto} from "./dto/auth-success-response.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async addUser(user: User): Promise<void> {
    const { password } = user;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {...user, password: hashedPassword};

    console.log(`New user: ${JSON.stringify(newUser)}`);

    await this.userModel.create(newUser);
  }

  async signIn(@Body() authCredentials: AuthCredentialsDto): Promise<AuthSuccessResponseDto> {
    const { username, password } = authCredentials;

    const user = await this.userModel.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);

      return { userId: user.id, accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }

  findUserById(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }
}
