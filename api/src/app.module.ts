import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserService } from './user.service';
import { PrismaService} from "./prisma.service";
import { PostService } from './post.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [UserService,PrismaService],
})
export class AppModule {}
