import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from 'mercadopago/dist/clients/commonTypes';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { Sales } from './entity/sales.entity';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Sales)
    private readonly salesRepository: Repository<Sales>,
    private readonly userService: UsersService,
  ) {}

  async create(items: Items[], user_id: number) {
    console.log('items:', items);

    const sales = await Promise.all(
      items.map(async (item) => {
        const product = await this.productRepository.findOne({
          where: { id: Number(item.id) },
        });

        console.log('searching', user_id);

        const user = await this.userService.findOne(user_id);

        if (!user) {
          throw new Error('User not found');
        }

        const final_price = product.price * item.quantity;

        await this.productRepository.update(
          { id: product.id },
          { quantity: product.quantity - item.quantity },
        );

        console.log('pushing', product.name);

        return this.salesRepository.create({
          client: user,
          product,
          final_price,
          created_by: user.id,
          updated_by: user.id,
        });
      }),
    );

    console.log(sales);
    const confirmedSales = await this.salesRepository.save(sales);

    return confirmedSales;
  }
}
