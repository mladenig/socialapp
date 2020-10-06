import { SystemError } from '../common/exceptions/system.error';
import { User } from '../database/entities/user.entity';
import { UserLoginDTO } from '../common/DTOs/users/user-login.dto';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly blacklist: string[] = [];

  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(user: UserLoginDTO): Promise<any> {
    let foundUser: User;
    let payload: any;

    foundUser = await this.usersService.findUserByUsername(user.username);

    if (!foundUser) {
      foundUser = await this.usersService.findUserByEmail(
        user.username,
      );
    }

    if (!foundUser) {
      throw new SystemError('Wrong user credentials.', 401);
    }

    const passwordCheck = bcryptjs.compareSync(user.password, foundUser.password);

    if (!passwordCheck) {
      throw new SystemError('Wrong user credentials.', 401);
    }

    payload = {
      username: foundUser.username,
      id: foundUser.id,
      role: foundUser.role,
    };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  public blacklistToken(token: string): void {
    this.blacklist.push(token);
  }

  public isTokenBlacklisted(token: string): boolean {
    return this.blacklist.includes(token);
  }
}
