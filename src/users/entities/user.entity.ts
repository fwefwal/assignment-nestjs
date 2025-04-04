import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserEntity {
  @ApiProperty()
  email: string

  @ApiProperty()
  token: string | undefined

  @ApiProperty()
  username: string

  @ApiProperty()
  bio: string

  @ApiProperty()
  image: string | null

  @ApiHideProperty()
  @Exclude()
  password: string

  @ApiHideProperty()
  @Exclude()
  id: number

  constructor(userData: Partial<User>) {
    Object.assign(this, userData)
  }
}

export class UserEntityResponse {
  user: UserEntity
}
