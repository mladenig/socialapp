import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { SystemError } from '../exceptions/system.error';

@Catch(SystemError)
export class SystemErrorFilter implements ExceptionFilter {
  public catch(exception: SystemError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.code).json({
      status: exception.code,
      error: exception.message,
    });
  }
}
