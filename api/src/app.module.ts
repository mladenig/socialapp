import { CommentsModule } from './comments/comments.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CoreModule } from './common/core.module';
import { PostsModule } from './posts/posts/posts.module';
import { UsersModule } from './users/users.module';
import {AdminModule} from './admin/admin.module';
import {PositionModule} from './positions/positions.module';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    PostsModule,
    UsersModule,
    CommentsModule,
    AdminModule,
    PositionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
