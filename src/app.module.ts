import { Module } from '@nestjs/common'
import { TagsModule } from './tags/tags.module'
import { PrismaModule } from './prisma/prisma.module'
import { ArticlesModule } from './articles/articles.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [TagsModule, ArticlesModule, PrismaModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
