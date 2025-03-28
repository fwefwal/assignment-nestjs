import { Article, Prisma } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Transform, Type } from 'class-transformer'

type ArticleAuthorTagList = Prisma.ArticleGetPayload<{
  include: {
    tagList: {
      select: {
        title: true
      }
    }
    author: {
      select: {
        username: true
        bio: true
        image: true
      }
    }
  }
}>

class TagList {
  title: string
}

class Author {
  username: string
  bio: string
  image: string | null
}

type ArticleEntityType = Omit<
  ArticleAuthorTagList,
  'authorId' | 'id' | 'tagList' | 'author'
> & {
  author: Author
} & {
  tagList: TagList[]
}

export class ArticleEntity implements ArticleEntityType {
  @ApiProperty()
  slug: string

  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty()
  body: string

  @ApiProperty({ isArray: true })
  @Type(() => TagList)
  @Transform(({ value }) => (value || []).map(({ title }) => title))
  tagList: TagList[]

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  favorited: boolean

  @ApiProperty()
  favoritesCount: number

  @ApiProperty()
  @Type(() => Author)
  @Transform(({ value }) => value.user)
  author: Author

  @Exclude()
  id: number

  constructor(data: ArticleAuthorTagList) {
    Object.assign(this, data)
  }
}
