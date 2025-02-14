import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsPaymentDto } from './dto/products-payment.dto';
import { JwtPayload } from 'src/common/interfaces';
import MercadoPagoConfig, { Payment, Preference } from 'mercadopago';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Items } from 'mercadopago/dist/clients/commonTypes';
import { SalesService } from 'src/sales/sales.service';

@Injectable()
export class MercadopagoService {
  private mercadopagoConfig: MercadoPagoConfig;

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly salesService: SalesService,
  ) {
    this.mercadopagoConfig = new MercadoPagoConfig({
      accessToken:
        'APP_USR-5846589935685812-020318-97d30af8b3472685ee9396aad79d6145-2246478781',
      options: { timeout: 5000, idempotencyKey: 'abc' },
    });
  }

  async productsPayment(
    productsPaymentDto: ProductsPaymentDto,
    jwtPayload: JwtPayload,
  ) {
    const preference = new Preference(this.mercadopagoConfig);

    const loadProducts = productsPaymentDto.products.map(async (product) => {
      return await this.productRepository.findOne({
        where: { id: product.product_id },
      });
    });

    const finalItems: Items[] = (await Promise.all(loadProducts)).map(
      (product: Product, index: number) => {

        if (product.quantity < productsPaymentDto.products[index].quantity) {
          throw new BadRequestException(
            'Stock quantity is not enough',
          );
        }

        return {
          id: product.id.toString(),
          title: product.name,
          quantity: productsPaymentDto.products[index].quantity,
          unit_price: Number(product.price),
          description: product.description,
          category_id: product.category,
          currency_id: 'COP',
        };
      },
    );

    const result = await preference.create({
      body: {
        items: finalItems,
        // back_urls: {
        //   success: 'https://52a1-201-184-187-42.ngrok-free.app/saless',
        //   failure: 'https://52a1-201-184-187-42.ngrok-free.app/failure',
        //   pending: 'https://52a1-201-184-187-42.ngrok-free.app/pending',
        // },
        notification_url: `https://d5ed-201-184-187-42.ngrok-free.app/mercadopago/confirm?user_id=${jwtPayload.id}`,
      },
    });

    console.log(result.init_point);
    console.log(result);

    return result.init_point;
  }

  async confirmPayment(query: any) {
    if (query.type === 'payment') {
      console.log('compradoooo');
      const payment = new Payment(this.mercadopagoConfig);
      const data = await payment.get({ id: query['data.id'] });
      await this.salesService.create(data.additional_info.items, query.user_id);
    }
  }
}
