import {
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
  ValidationError
} from '@nestjs/common'

const exceptionFactory = (errors: ValidationError[]) => {
  return new UnprocessableEntityException({
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: {
      errors: errors?.at(0)?.children?.reduce((acc, errorChild) => {
        return {
          ...acc,
          [errorChild.property]: Object.values(errorChild.constraints!),
        }
      }, {}),
    },
  })
}

@Injectable()
export class AppValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      exceptionFactory
    })
  }
}
