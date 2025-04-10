import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { LibService } from 'src/lib/lib.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Injectable()
export class ArticlesService {
  constructor(
    private prismaService: PrismaService,
    private libService: LibService,
  ) { }

  create(article: CreateArticleDto) {
    return this.prismaService.article.create({
      data: {
        ...article,
        slug: this.libService.generateSlug(article.title),
        authorId: 1,
        tagList: {
          connectOrCreate: article.tagList?.map((tagName) => ({
            where: {
              title: tagName,
            },
            create: {
              title: tagName,
            },
          })),
        },
      },
      include: {
        tagList: {
          select: {
            title: true,
          },
        },
        author: {
          select: {
            username: true,
            bio: true,
            image: true,
          },
        },
      },
    })
  }

  findAll({ tag, author, favoritedBy, limit, offset }) {
    const filterParams = {}

    if (tag) {
      filterParams['tagList'] = {
        some: {
          title: tag,
        },
      }
    }

    const paginationParams = {
      skip: offset,
      take: limit,
    }

    return this.prismaService.article.findMany({
      where: filterParams,
      include: {
        tagList: {
          select: { title: true },
        },
        author: {
          select: {
            username: true,
            bio: true,
            image: true,
          },
        },
      },
      ...paginationParams,
    })
  }

  findOne(slug: string) {
    return this.prismaService.article.findFirst({
      where: { slug },
      include: {
        tagList: { select: { title: true } },
        author: {
          select: { username: true, bio: true, image: true },
        },
      },
    })
  }

  update(slug: string, updateArticleDto: UpdateArticleDto) {
    if (updateArticleDto.title) {
      updateArticleDto['slug'] = this.libService.generateSlug(updateArticleDto.title)
    }

    return this.prismaService.article.update({
      where: { slug },
      data: updateArticleDto,
      include: {
        tagList: { select: { title: true } },
        author: {
          select: {
            username: true,
            bio: true,
            image: true,
          },
        },
      },
    })
  }

  remove(slug: string) {
    this.prismaService.article.delete({
      where: {
        slug,
      },
    })
  }
}
