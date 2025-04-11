import { Controller, Get, Post, Body, Put, UseInterceptors } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
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

  // @Get('user')
  // findOne() {
  //   const id = 1
  //   return this.usersService.findUser(+id)
  // }

  // @Put('user')
  // @Key('user')
  // @ApiOkResponse({ type: UserEntity })
  // async update(@Body() updateUserDto: UpdateUserDto) {
  //   const id = 1
  //   return new UserEntity(await this.usersService.update(+id, updateUserDto))
  // }
}
