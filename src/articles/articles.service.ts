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
  ) {}

  create(createArticleDto: CreateArticleDto) {
    const { article } = createArticleDto

    return this.prismaService.article.create({
      data: {
        ...article,
        slug: this.libService.generateSlug(article.title),
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
        tagList: true,
        author: {
          select: { username: true, bio: true, image: true },
        },
      },
    })
  }

  update(slug: string, updateArticleDto: UpdateArticleDto) {
    const { article } = updateArticleDto

    if (article.title) {
      article['slug'] = this.libService.generateSlug(article.title)
    }

    return this.prismaService.article.update({
      where: { slug },
      data: article,
      include: {
        tagList: true,
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
