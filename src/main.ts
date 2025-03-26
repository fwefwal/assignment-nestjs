import { NestFactory, Reflector, HttpAdapterHost } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BadRequestException, ClassSerializerInterceptor, HttpStatus, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './prisma/exception-filter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, transform: true, exceptionFactory: (errors => {
      return new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: {
          errors: errors?.at(0)?.children?.reduce((acc, errorChild) => {
            return { ...acc, [errorChild.property]: Object.values(errorChild.constraints!) }
          }, {})
        }
      })
    })
  }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter))

  const config = new DocumentBuilder()
    .setTitle('RealWorld API')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
