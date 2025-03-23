import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LibModule } from 'src/lib/lib.module';

@Module({
  imports: [PrismaModule, LibModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule { }
