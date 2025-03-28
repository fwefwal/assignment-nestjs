import { Module } from '@nestjs/common'
import { TagsModule } from './tags/tags.module'
import { PrismaModule } from './prisma/prisma.module'
import { ArticlesModule } from './articles/articles.module'

@Module({
  imports: [TagsModule, ArticlesModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
