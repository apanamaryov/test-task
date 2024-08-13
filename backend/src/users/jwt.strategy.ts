import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {JwtPayload} from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {
    super({
      secretOrKey: 'someSecret4321', // to be stored somewhere outside normally
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;

    const user: User = await this.userModel.findOne({ where: { username } });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}