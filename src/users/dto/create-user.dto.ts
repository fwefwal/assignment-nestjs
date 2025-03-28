import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator'

class InnerCreateUserDto {
  @ApiProperty({ minLength: 4 })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  username: string

  @ApiProperty({ description: 'Valid email' })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ minLength: 6 })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string
}

export class CreateUserDto {
  @Type(() => InnerCreateUserDto)
  @ValidateNested({ each: true })
  user: InnerCreateUserDto
}
