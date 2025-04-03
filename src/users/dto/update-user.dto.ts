import { ApiProperty, PartialType } from '@nestjs/swagger'
import { InnerCreateUserDto } from './create-user.dto'

import { Type } from 'class-transformer'
import { IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator'

export class InnerUpdateUserDto extends PartialType(InnerCreateUserDto) {
  @ApiProperty()
  @IsUrl()
  image?: string

  @ApiProperty()
  @IsString()
  bio?: string
}

export class UpdateUserDto {
  @Type(() => InnerUpdateUserDto)
  @ValidateNested({ each: true })
  user: InnerUpdateUserDto
}
