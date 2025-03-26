import { Controller, Get, Post, Body, Param, Delete, Put, Query, NotFoundException } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { Tag } from '@prisma/client';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return {
      article: new ArticleEntity(await this.articlesService.create(createArticleDto))
    }
  }

  @Get()
  @ApiOkResponse({ type: [ArticleEntity] })
  async findAll(
    @Query("tag") tag: Tag["title"],
    @Query("author") author: string,
    @Query("favorited") favoritedBy: string,
    @Query("limit") limit: number = 20,
    @Query("offset") offset: number = 0
  ) {
    const articles = await this.articlesService.findAll({ tag, author, favoritedBy, limit, offset })
    return {
      articles: articles.map(article => new ArticleEntity(article)),
      articlesCount: articles.length
    }
  }

  @Get(':slug')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('slug') slug: string) {
    const article = await this.articlesService.findOne(slug)
    if (!article) {
      throw new NotFoundException(`Article "${slug}" does not exist `)
    }
    return {
      article: new ArticleEntity(article)
    }
  }

  @Put(':slug')
  @ApiOkResponse({ type: ArticleEntity })
  async update(@Param('slug') slug: string, @Body() updateArticleDto: UpdateArticleDto) {
    return { article: new ArticleEntity(await this.articlesService.update(slug, updateArticleDto)) }
  }

  @Delete(':slug')
  @ApiOkResponse()
  remove(@Param('slug') slug: string) {
    this.articlesService.remove(slug);
  }
}
