import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((_, req) => req.user);
