import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  NotFoundException,
  UseInterceptors,
  SetMetadata,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger'
import { ArticlesService } from './articles.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { ArticleEntity } from './entities/article.entity'
import { Key } from 'src/common/decorators/key.decorator'
import { RequestResponseInterceptor } from 'src/common/interceptors/request-response.interceptor'

@Controller('articles')
@UseInterceptors(RequestResponseInterceptor)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  @Key('article')
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return new ArticleEntity(
      await this.articlesService.create(createArticleDto))
  }

  @Get()
  @Key('articles')
  @SetMetadata('meta', ['count', 'articlesCount'])
  @ApiOkResponse({ type: [ArticleEntity] })
  @ApiQuery({ name: 'tag', required: false })
  @ApiQuery({ name: 'author', required: false })
  @ApiQuery({ name: 'favorited', required: false })
  @ApiQuery({ name: 'limit', required: false, default: 20 })
  @ApiQuery({ name: 'offset', required: false, default: 0 })
  async findAll(
    @Query('tag') tag: string,
    @Query('author') author: string,
    @Query('favorited') favoritedBy: string,
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
  ) {
    const articles = await this.articlesService.findAll({
      tag,
      author,
      favoritedBy,
      limit,
      offset,
    })
    return articles.map((article) => new ArticleEntity(article))
  }

  @Get(':slug')
  @Key('article')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('slug') slug: string) {
    const article = await this.articlesService.findOne(slug)
    if (!article) {
      throw new NotFoundException(`Article "${slug}" does not exist `)
    }
    return new ArticleEntity(article)
  }

  @Put(':slug')
  @Key('article')
  @ApiOkResponse({ type: ArticleEntity })
  async update(
    @Param('slug') slug: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return new ArticleEntity(
      await this.articlesService.update(slug, updateArticleDto),
    )
  }

  @Delete(':slug')
  @ApiOkResponse()
  remove(@Param('slug') slug: string) {
    this.articlesService.remove(slug)
  }
}
