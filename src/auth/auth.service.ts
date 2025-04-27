import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async signIn({ email, password }: SignInDto) {
    const user = await this.usersService.findUser(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    return {
      token: await this.jwtService.signAsync({ userId: user.id, email: user.email })
    };
  }

  async getUserProfile(email: string) {
    const user = await this.usersService.findUser(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      email: user.email,
      username: user.username,
      bio: user.bio || 'I work at statefarm',
      image: user.image || null
    };
  }
}