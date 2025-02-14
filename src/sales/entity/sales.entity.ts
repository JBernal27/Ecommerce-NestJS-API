import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sales')
export class Sales {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.sales)
  client: User;

  @ManyToOne(() => Product, product => product.sales)
  product: Product;

  @Column()
  final_price: number;

  @Column()
  created_by: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  updated_by: number;

  @UpdateDateColumn()
  updated_at: Date;
}