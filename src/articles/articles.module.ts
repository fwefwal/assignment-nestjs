import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LibModule } from 'src/lib/lib.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [PrismaModule, LibModule, CommonModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule { }
