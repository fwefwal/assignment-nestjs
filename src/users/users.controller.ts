import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { ApiCreatedResponse } from '@nestjs/swagger'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiCreatedResponse({ type: UserEntity })
  @Post('users')
  async create(@Body() createUserDto: CreateUserDto) {
    return {
      user: new UserEntity(await this.usersService.create(createUserDto)),
    }
  }

  @Get('user')
  findOne() {
    const id = 1
    return this.usersService.findUser(+id)
  }

  @Put('user')
  update(@Body() updateUserDto: UpdateUserDto) {
    const id = 1
    return this.usersService.update(+id, updateUserDto)
  }
}
