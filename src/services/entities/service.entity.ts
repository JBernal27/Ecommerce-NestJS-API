import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { WeekDays } from 'src/common/enums/weekdays.enum';
import { ServiceCategory } from 'src/common/enums/categories.enum';
  
  @Entity('services')
  export class Service {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'Primary key of the service (auto-incremented)' })
    id: number;
  
    @Column({ type: 'string', length: 255 })
    @ApiProperty({ example: 'Cleaning Service', description: 'Name of the service' })
    name: string;
  
    @Column({ type: 'datetime' })
    @ApiProperty({ example: '2025-02-14T08:00:00Z', description: 'Start time of the service' })
    start_time: Date;
  
    @Column({ type: 'datetime' })
    @ApiProperty({ example: '2025-02-14T12:00:00Z', description: 'End time of the service' })
    end_time: Date;
  
    @Column({ type: 'simple-array' })
    @ApiProperty({ example: ['Monday', 'Wednesday'], description: 'Days the service is available' })
    days: WeekDays[];
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @ApiProperty({ example: 49.99, description: 'Price of the service' })
    price: number;
  
    @Column({ type: 'enum', enum: ServiceCategory })
    @ApiProperty({
      example: 'cleaning',
      description: 'Category of the service (cleaning, maintenance, other)',
    })
    category: ServiceCategory;
  
    @Column({ type: 'text', nullable: true })
    @ApiProperty({ example: 'A professional cleaning service.', description: 'Description of the service' })
    description: string;
  
    @Column({ type: 'boolean', default: false })
    @ApiProperty({ example: false, description: 'Whether the service has been paid' })
    was_payed: boolean;
  
    @ManyToOne(() => User, (user) => user.services, { onDelete: 'CASCADE' })
    @ApiProperty({ description: 'Reference to the provider (User entity)' })
    provider: User;
  
    @Column({ type: 'boolean', default: false })
    @ApiProperty({ example: false, description: 'Indicates if the service is deleted' })
    is_deleted: boolean;
  
    @Column({ type: 'string', length: 255 })
    @ApiProperty({ example: 'admin_user', description: 'User who created the record' })
    created_by: number;
  
    @CreateDateColumn({ type: 'date' })
    @ApiProperty({ example: '2025-02-14', description: 'Date when the service was created' })
    created_at: Date;
  
    @Column({ type: 'string', length: 255, nullable: true })
    @ApiProperty({
      example: 'admin_user',
      description: 'User who last updated the record',
      nullable: true,
    })
    updated_by: number;
  
    @UpdateDateColumn({ type: 'date' })
    @ApiProperty({ example: '2025-02-15', description: 'Date when the service was last updated' })
    updated_at: Date;
  }
  