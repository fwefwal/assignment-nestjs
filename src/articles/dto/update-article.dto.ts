import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from 'class-validator';

class NestedArticleDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  body: string;
}

export class UpdateArticleDto {
  @ValidateNested({ each: true })
  @Type(() => NestedArticleDto)
  article: NestedArticleDto
}
