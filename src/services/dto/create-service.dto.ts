import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsArray, IsEnum, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { WeekDays } from 'src/common/enums/weekdays.enum';
import { ServiceCategory } from 'src/common/enums/categories.enum';

export class CreateServiceDto {
  @ApiProperty({ example: 'Cleaning Service', description: 'Name of the service' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '2025-02-14T08:00:00Z',
    description: 'Start time of the service',
  })
  @IsDate()
  @IsNotEmpty()
  start_time: Date;

  @ApiProperty({
    example: '2025-02-14T12:00:00Z',
    description: 'End time of the service',
  })
  @IsDate()
  @IsNotEmpty()
  end_time: Date;

  @ApiProperty({
    example: ['Monday', 'Wednesday'],
    description: 'Days the service is available',
    enum: WeekDays,
    isArray: true,
  })
  @IsArray()
  @IsEnum(WeekDays, { each: true })
  @IsNotEmpty()
  days: WeekDays[];

  @ApiProperty({ example: 49.99, description: 'Price of the service' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'Cleaning',
    description: 'Category of the service',
    enum: ServiceCategory,
  })
  @IsEnum(ServiceCategory)
  @IsNotEmpty()
  category: ServiceCategory;

  @ApiProperty({
    example: 'A professional cleaning service.',
    description: 'Description of the service',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: false,
    description: 'Whether the service has been paid',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  was_payed?: boolean;

  @ApiProperty({ example: 1, description: 'ID of the provider (user)' })
  @IsNumber()
  @IsNotEmpty()
  provider: number;

  @ApiProperty({
    example: 'admin_user',
    description: 'User who created the record',
  })
  @IsString()
  @IsNotEmpty()
  created_by: string;
}
