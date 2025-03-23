import { Article, Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

type ArticleTagList = Prisma.ArticleGetPayload<{ include: { tagList: { select: { title: true } } }, }>
type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

type ArticleWithTagsWithoutId = Omit<Article, "id"> & { tagList: ArrayElement<ArticleTagList["tagList"]>["title"][] | undefined }

export class ArticleEntity implements ArticleWithTagsWithoutId {
  @ApiProperty()
  slug: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  tagList: string[] = [];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  favorited: boolean;

  @ApiProperty()
  favoritesCount: number;

  @Exclude()
  id: number;

  constructor(data: ArticleTagList) {
    Object.assign(this, data)
    this.tagList = data.tagList?.map(({ title }) => title) ?? []
  }
}
