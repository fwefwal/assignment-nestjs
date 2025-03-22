import { Module } from '@nestjs/common'
import { TagsModule } from './tags/tags.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TagsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
