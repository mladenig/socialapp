import { UsersService } from '../../users/users.service';
import { ConfigService } from '../../config/config.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ShowUserDTO } from '../../common/DTOs/users/show-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userDataService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtSecret,
      ignoreExpiration: false,
    });
  }

  public async validate(payload): Promise<ShowUserDTO> {
    const user = await this.userDataService.findUserByUsername(
      payload.username,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
