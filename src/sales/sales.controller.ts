import { Controller, Get, Post, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { query } from 'express';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

}

