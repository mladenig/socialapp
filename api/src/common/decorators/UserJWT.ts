import { createParamDecorator } from '@nestjs/common';

export const UserJWT = createParamDecorator((_, req) => req.user);
