import { ApiProperty } from '@nestjs/swagger'
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

  @Exclude()
  password: string

  @Exclude()
  id: number

  constructor(userData: Partial<User>) {
    Object.assign(this, userData)
  }
}
