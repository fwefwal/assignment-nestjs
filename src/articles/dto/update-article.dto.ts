import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from 'class-validator';

class NestedArticleDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  body: string;
}

export class UpdateArticleDto {
  @ValidateNested({ each: true })
  @Type(() => NestedArticleDto)
  article: NestedArticleDto
}
