import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsString, IsUrl } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsUrl()
  image?: string

  @ApiProperty()
  @IsString()
  bio?: string
}
