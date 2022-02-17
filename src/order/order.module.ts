import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';

import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [OrderController],
  providers: [OrderService, PrismaService]
})
export class OrderModule {}
