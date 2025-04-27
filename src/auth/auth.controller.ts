// import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { SignInDto } from './dto/sign-in.dto';
// import { UserEntity } from 'src/users/entities/user.entity';
// import { Key } from 'src/common/decorators/key.decorator';
// import { RequestResponseInterceptor } from 'src/common/interceptors/request-response.interceptor';
// import { ApiCreatedResponse } from '@nestjs/swagger';

// @Controller()
// @UseInterceptors(RequestResponseInterceptor)
// export class AuthController {
//   constructor(private readonly authService: AuthService) { }

//   @Post('users/login')
//   @ApiCreatedResponse({ type: UserEntity })
//   @Key('user')
//   async signIn(@Body() signInDto: SignInDto) {
//     return new UserEntity(await this.authService.signIn(signInDto))
//   }
// }
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { Key } from 'src/common/decorators/key.decorator';
import { RequestResponseInterceptor } from 'src/common/interceptors/request-response.interceptor';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
@UseInterceptors(RequestResponseInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('users/login')
  @ApiCreatedResponse({ 
    type: UserEntity,
    description: 'User successfully logged in',
    schema: {
      example: {
        user: {
          email: "jake@jake.jake",
          token: "jwt.token.here",
          username: "jake",
          bio: "I work at statefarm",
          image: null
        }
      }
    }
  })
  @Key('user')
  async signIn(@Body() signInDto: SignInDto) {
    const { token } = await this.authService.signIn(signInDto);
    const user = await this.authService.getUserProfile(signInDto.email);
    return new UserEntity({
      ...user,
      token
    });
  }
}