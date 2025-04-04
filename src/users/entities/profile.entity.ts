import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { Exclude } from 'class-transformer'
import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator'

export class ProfileEntity {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  bio: string | null

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsUrl()
  image: string | null

  @ApiProperty()
  @IsBoolean()
  following: boolean
}

export class ProfileEntityResponse {
  profile: ProfileEntity
}
