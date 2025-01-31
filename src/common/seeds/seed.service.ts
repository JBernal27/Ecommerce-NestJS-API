import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SeedUsers } from './users.seed';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    const userSeeders = new SeedUsers();
    await userSeeders.run(this.dataSource);
  }
}
