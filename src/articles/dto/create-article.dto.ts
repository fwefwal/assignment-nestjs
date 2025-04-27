// import { ApiProperty } from '@nestjs/swagger'
// import { IsArray, IsNotEmpty, IsString } from 'class-validator'

// export class CreateArticleDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   title: string

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   description: string

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   body: string

//   @ApiProperty()
//   @IsArray()
//   tagList: string[] = []
// }
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ example: 'How to train your dragon' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Ever wonder how?' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'It takes a Jacobian' })
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty({ 
    example: ['dragons', 'training'], 
    required: false,
    type: [String] 
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tagList: string[] = [];
}