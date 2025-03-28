import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class ArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string

  @ApiProperty()
  @IsArray()
  tagList: string[] = []
}

export class CreateArticleDto {
  @ValidateNested({ each: true })
  @Type(() => ArticleDto)
  article: ArticleDto
}
