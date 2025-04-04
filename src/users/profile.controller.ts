import { Controller, Get, Param } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { ProfileEntityResponse } from './entities/profile.entity'

@Controller('profiles')
export class ProfileController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: ProfileEntityResponse })
  @Get(':username')
  async findOne(@Param('username') username: string) {
    return {
      profile: {
        ...(await this.usersService.findProfile(username)),
        following: false,
      },
    }
  }
}
