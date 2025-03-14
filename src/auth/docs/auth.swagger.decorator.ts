import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProduces,
  ApiResponse,
} from '@nestjs/swagger';
import {
  ApiBadRequest,
  ApiCreateResponses,
} from 'src/common/docs/swagger.decorators';
import { LoginDto } from '../dto/login.dto';
import { applyDecorators, HttpStatus, Type } from '@nestjs/common';

export function ApiDocLogin() {
  const description =
    'You can use this endpoint to login a user and receive a JWTtoken';
  return applyDecorators(
    ApiOperation({
      summary: 'Login',
      description,
    }),
    ApiBadRequest(),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Successfully logged in and received a JWT token',
      schema: {
        example: {
          token: 'your-jwt-token-here',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid credentials',
    }),
    ApiBody({
      description: 'User login credentials',
      type: LoginDto,
    }),
    ApiConsumes('application/json'),
    ApiProduces('application/json'),
  );
}

export function ApiDocRegister<T>(entity: Type<T>) {
  const description = 'you can register users ';
  return applyDecorators(
    ApiOperation({
      summary: 'register new user ',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest(),
  );
}
