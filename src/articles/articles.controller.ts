// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Delete,
//   Put,
//   Query,
//   NotFoundException,
//   UseInterceptors,
//   SetMetadata,
// } from '@nestjs/common'
// import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger'
// import { ArticlesService } from './articles.service'
// import { CreateArticleDto } from './dto/create-article.dto'
// import { UpdateArticleDto } from './dto/update-article.dto'
// import { ArticleEntity } from './entities/article.entity'
// import { Key } from 'src/common/decorators/key.decorator'
// import { RequestResponseInterceptor } from 'src/common/interceptors/request-response.interceptor'

// @Controller('articles')
// @UseInterceptors(RequestResponseInterceptor)
// export class ArticlesController {
//   constructor(private readonly articlesService: ArticlesService) { }

//   @Post()
//   @Key('article')
//   @ApiCreatedResponse({ type: ArticleEntity })
//   async create(@Body() createArticleDto: CreateArticleDto) {
//     return new ArticleEntity(
//       await this.articlesService.create(createArticleDto))
//   }

//   @Get()
//   @Key('articles')
//   @SetMetadata('meta', ['count', 'articlesCount'])
//   @ApiOkResponse({ type: [ArticleEntity] })
//   @ApiQuery({ name: 'tag', required: false })
//   @ApiQuery({ name: 'author', required: false })
//   @ApiQuery({ name: 'favorited', required: false })
//   @ApiQuery({ name: 'limit', required: false, default: 20 })
//   @ApiQuery({ name: 'offset', required: false, default: 0 })
//   async findAll(
//     @Query('tag') tag: string,
//     @Query('author') author: string,
//     @Query('favorited') favoritedBy: string,
//     @Query('limit') limit: number = 20,
//     @Query('offset') offset: number = 0,
//   ) {
//     const articles = await this.articlesService.findAll({
//       tag,
//       author,
//       favoritedBy,
//       limit,
//       offset,
//     })
//     return articles.map((article) => new ArticleEntity(article))
//   }

//   @Get(':slug')
//   @Key('article')
//   @ApiOkResponse({ type: ArticleEntity })
//   async findOne(@Param('slug') slug: string) {
//     const article = await this.articlesService.findOne(slug)
//     if (!article) {
//       throw new NotFoundException(`Article "${slug}" does not exist `)
//     }
//     return new ArticleEntity(article)
//   }

//   @Put(':slug')
//   @Key('article')
//   @ApiOkResponse({ type: ArticleEntity })
//   async update(
//     @Param('slug') slug: string,
//     @Body() updateArticleDto: UpdateArticleDto,
//   ) {
//     return new ArticleEntity(
//       await this.articlesService.update(slug, updateArticleDto),
//     )
//   }

//   @Delete(':slug')
//   @ApiOkResponse()
//   remove(@Param('slug') slug: string) {
//     this.articlesService.remove(slug)
//   }
// }
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
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { Key } from 'src/common/decorators/key.decorator';
import { RequestResponseInterceptor } from 'src/common/interceptors/request-response.interceptor';

@ApiTags('articles')
@Controller('articles')
@UseInterceptors(RequestResponseInterceptor)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  @Key('article')
  @ApiCreatedResponse({ 
    type: ArticleEntity,
    description: 'Article created successfully',
    schema: {
      example: {
        article: {
          slug: "how-to-train-your-dragon",
          title: "How to train your dragon",
          description: "Ever wonder how?",
          body: "It takes a Jacobian",
          tagList: ["dragons", "training"],
          createdAt: "2016-02-18T03:22:56.637Z",
          updatedAt: "2016-02-18T03:48:35.824Z",
          favorited: false,
          favoritesCount: 0,
          author: {
            username: "jake",
            bio: "I work at shotwork",
            image: "https://i.stack.imgur.com/xHWG8.jpg",
            following: false
          }
        }
      }
    }
  })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return new ArticleEntity(
      await this.articlesService.create(createArticleDto));
  }

  @Get()
  @Key('articles')
  @ApiOkResponse({ 
    description: 'List of articles',
    schema: {
      example: {
        articles: [{
          slug: "how-to-train-your-dragon",
          title: "How to train your dragon",
          description: "Ever wonder how?",
          tagList: ["dragons", "training"],
          createdAt: "2016-02-18T03:22:56.637Z",
          updatedAt: "2016-02-18T03:48:35.824Z",
          favorited: false,
          favoritesCount: 0,
          author: {
            username: "jake",
            bio: "I work at shotwork",
            image: "https://i.stack.imgur.com/xHWG8.jpg",
            following: false
          }
        }],
        articlesCount: 1
      }
    }
  })
  @ApiQuery({ name: 'tag', required: false })
  @ApiQuery({ name: 'author', required: false })
  @ApiQuery({ name: 'favorited', required: false })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'offset', required: false, type: Number, example: 0 })
  async findAll(
    @Query('tag') tag: string,
    @Query('author') author: string,
    @Query('favorited') favoritedBy: string,
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
  ) {
    const [articles, count] = await Promise.all([
      this.articlesService.findAll({
        tag,
        author,
        favoritedBy,
        limit,
        offset,
      }),
      this.articlesService.getCount({
        tag,
        author,
        favoritedBy,
      }),
    ]);

    return {
      articles: articles.map((article) => new ArticleEntity(article)),
      articlesCount: count,
    };
  }

  @Get(':slug')
  @Key('article')
  @ApiOkResponse({ 
    type: ArticleEntity,
    description: 'Article details',
    schema: {
      example: {
        article: {
          slug: "how-to-train-your-dragon",
          title: "How to train your dragon",
          description: "Ever wonder how?",
          body: "It takes a Jacobian",
          tagList: ["dragons", "training"],
          createdAt: "2016-02-18T03:22:56.637Z",
          updatedAt: "2016-02-18T03:48:35.824Z",
          favorited: false,
          favoritesCount: 0,
          author: {
            username: "jake",
            bio: "I work at shotwork",
            image: "https://i.stack.imgur.com/xHWG8.jpg",
            following: false
          }
        }
      }
    }
  })
  async findOne(@Param('slug') slug: string) {
    const article = await this.articlesService.findOne(slug);
    if (!article) {
      throw new NotFoundException(`Article "${slug}" does not exist`);
    }
    return new ArticleEntity(article);
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
    );
  }

  @Delete(':slug')
  @ApiOkResponse({ description: 'Article deleted successfully' })
  async remove(@Param('slug') slug: string) {
    await this.articlesService.remove(slug);
    return { message: 'Article deleted successfully' };
  }
}