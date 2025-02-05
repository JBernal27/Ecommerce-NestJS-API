import { Injectable } from '@nestjs/common';
import MercadoPagoConfig, { Payment } from 'mercadopago';

@Injectable()
export class SalesService {
  private mercadopagoConfig: MercadoPagoConfig;

  constructor() {
    this.mercadopagoConfig = new MercadoPagoConfig({
      accessToken:
        'APP_USR-5846589935685812-020318-97d30af8b3472685ee9396aad79d6145-2246478781',
      options: { timeout: 5000, idempotencyKey: 'abc' },
    });
  }

  async create(query: any) {
    
    if (query.type === 'payment') {
      console.log('compradoooo');
      const payment = new Payment(this.mercadopagoConfig);
      const data = await payment.get({ id: query['data.id'] });
      console.log(data.additional_info.items);
    }
  }
}
