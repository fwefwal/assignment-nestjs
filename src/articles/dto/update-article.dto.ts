// import { OmitType, PartialType } from "@nestjs/swagger";
// import { CreateArticleDto } from "./create-article.dto";

// export class UpdateArticleDto extends PartialType(OmitType(CreateArticleDto, ['tagList'] as const)) { }
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateArticleDto } from "./create-article.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateArticleDto extends PartialType(
  OmitType(CreateArticleDto, ['tagList'] as const)
) {
  @ApiProperty({ example: 'Updated title', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Updated description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'Updated body', required: false })
  @IsString()
  @IsOptional()
  body?: string;
}