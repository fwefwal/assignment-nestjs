import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { Key } from 'src/common/decorators/key.decorator';
import { RequestResponseInterceptor } from 'src/common/interceptors/request-response.interceptor';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller()
@UseInterceptors(RequestResponseInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('users/login')
  @ApiCreatedResponse({ type: UserEntity })
  @Key('user')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }
}
