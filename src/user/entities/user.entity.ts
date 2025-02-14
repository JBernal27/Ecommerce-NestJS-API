import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Sales } from 'src/sales/entity/sales.entity';
import { Roles } from 'src/common/enums/roles.enum';
import { Service } from 'src/services/entities/service.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the user.',
  })
  id: number;

  @Column()
  @ApiProperty({ example: 'John Doe', description: 'The name of the user.' })
  name: string;

  @Column()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user.',
  })
  email: string;

  @Column()
  @ApiProperty({
    example: 'password123',
    description: 'The password of the user.',
  })
  password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.CLIENT })
  @ApiProperty({ example: 'seller', description: 'The role of the user.' })
  role: Roles;

  @Column({ default: false })
  @ApiProperty({
    example: false,
    description: 'Indicates if the user is deleted.',
  })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    example: '2025-01-01',
    description: 'The date when the user was created.',
  })
  created_at: Date;

  @Column({ default: 0 })
  @ApiProperty({
    example: 'admin',
    description: 'The user who last updated this record.',
  })
  updated_by: number;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    example: '2025-01-02',
    description: 'The date when the user was last updated.',
  })
  updated_at: Date;

  @OneToMany(() => Sales, (sales) => sales.client)
  sales: Sales[];

  @OneToMany(() => Service, (service) => service.provider)
  @ApiProperty({
    description: 'List of services provided by the user.',
    type: () => [Service],
  })
  services: Service[];
}
