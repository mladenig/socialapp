import { AuthModule } from '../../auth/auth.module';
import { ConfigModule } from '../../config/config.module';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  imports: [ConfigModule, AuthModule],
  exports: [ConfigModule, AuthModule],
})
export class CoreModule {}
