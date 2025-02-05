import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Sales } from 'src/sales/entity/sales.entity';
import { ProductCategory } from 'src/common/enums/categories.enum';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the product.' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Product Name', description: 'The name of the product.' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'REF123', description: 'The reference of the product.' })
  reference: string;

  @Column()
  @ApiProperty({ example: 'This is a product description.', description: 'The description of the product.' })
  description: string;

  @Column('int')
  @ApiProperty({ example: 100, description: 'The quantity of the product.' })
  quantity: number;

  @Column('decimal')
  @ApiProperty({ example: 19.99, description: 'The price of the product.' })
  price: number;

  @Column({ type: 'enum', enum: ProductCategory })
  @ApiProperty({ example: 'Electronics', description: 'The category of the product.' })
  category: ProductCategory;

  @ManyToOne(() => User)
  @ApiProperty({ example: 1, description: 'The ID of the seller (user) who owns the product.' })
  seller: User;

  @Column({ default: false })
  @ApiProperty({ example: false, description: 'Indicates if the product is deleted.' })
  is_deleted: boolean;

  @Column({ default: true })
  @ApiProperty({ example: true, description: 'Indicates if the product is available.' })
  is_available: boolean;

  @Column()
  @ApiProperty({ example: 1, description: 'The ID of the user who created the product.' })
  created_by: number;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ example: '2025-01-01', description: 'The date when the product was created.' })
  created_at: Date;

  @Column()
  @ApiProperty({ example: 'admin', description: 'The user who last updated this record.' })
  updated_by: number;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ example: '2025-01-02', description: 'The date when the product was last updated.' })
  updated_at: Date;

  @OneToMany(() => Sales, sales => sales.product)
  sales: Sales[];
}