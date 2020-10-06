import { UserLoginDTO } from '../common/DTOs/users/user-login.dto';
import { Token } from '../common/decorators/token.decorator';
import {
  Controller,
  Post,
  Body,
  Delete, UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {SystemErrorFilter} from '../common/filters/error.filter';

@Controller('session')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post()
  @UseFilters(SystemErrorFilter)
  public async loginUser(@Body() user: UserLoginDTO) {
    return await this.authService.login(user);
  }

  @Delete()
  @UseFilters(SystemErrorFilter)
  public async logoutUser(@Token() token: string) {
    this.authService.blacklistToken(token);

    return {
      msg: 'Successful logout!',
    };
  }
}
