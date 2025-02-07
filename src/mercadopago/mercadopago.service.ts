import { Injectable } from '@nestjs/common';
import { ProductsPaymentDto } from './dto/products-payment.dto';
import { JwtPayload } from 'src/common/interfaces';
import MercadoPagoConfig, { Preference } from 'mercadopago';

@Injectable()
export class MercadopagoService {
  private mercadopagoConfig: MercadoPagoConfig;

  constructor() {
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

    const result = await preference.create({
      body: {
        items: [
          {
            id: '010983098',
            title: 'My Product',
            quantity: 1,
            unit_price: 2000,
            description: 'Description of my product',
            category_id: 'retail',
            currency_id: 'COP',
          },
          {
            id: '010983099',
            title: 'My Product 2',
            quantity: 1,
            unit_price: 2000,
            description: 'Description of my product 2',
            category_id: 'retail',
            currency_id: 'COP',
          },
        ],
        back_urls: {
          success: 'https://52a1-201-184-187-42.ngrok-free.app/saless',
          failure: 'https://52a1-201-184-187-42.ngrok-free.app/failure',
          pending: 'https://52a1-201-184-187-42.ngrok-free.app/pending',
        },
        notification_url: `https://52a1-201-184-187-42.ngrok-free.app/sales?user_id=${jwtPayload}`,
      },
    });

    console.log(result.init_point);
    console.log(result);

    return result.init_point;
  }
}
