import { Injectable } from '@nestjs/common';
import { Tags } from './tags.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.tag.findMany()
  }
}
