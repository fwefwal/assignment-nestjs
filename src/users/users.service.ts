import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    const { user } = createUserDto
    return this.prismaService.user.create({
      data: user,
    })
  }

  findUser(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    })
  }

  findProfile(username: string) {
    return this.prismaService.user.findFirst({
      where: { username },
      select: { username: true, bio: true, image: true },
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
