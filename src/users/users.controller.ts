import { Controller, Post, Body,  UseInterceptors } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { RequestResponseInterceptor } from 'src/common/interceptors/request-response.interceptor'
import { Key } from 'src/common/decorators/key.decorator'

@Controller()
@UseInterceptors(RequestResponseInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiCreatedResponse({ type: UserEntity })
  @Post('users')
  @Key('user')
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto))
  }
}
