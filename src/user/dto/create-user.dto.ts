import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Roles } from 'src/common/enums/roles.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user.' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'seller', description: 'The role of the user.' })
  @IsEnum(Roles)
  role: Roles;
}
