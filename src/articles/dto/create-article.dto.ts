import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  body: string;

  @IsArray()
  tagList: string[] = []
}

export class CreateArticleDto {
  @ValidateNested({ each: true })
  @Type(() => ArticleDto)
  article: ArticleDto
}
