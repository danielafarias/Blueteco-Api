import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        return await this.prismaService.order.create({
            data: createOrderDto,
            include: {
                Table: true,
                Menu: true,
            },
        });
    }

    async readAll(): Promise<Order[]> {
        return await this.prismaService.order.findMany({
            include: {
                Table: true,
                Menu: true,
            },
        });
    }

    async readOne(id: number): Promise<Order> {

        const orderExists = await this.prismaService.order.findUnique({
            where: {
              id: id,
            }
          });
      
          if (!orderExists) {
            throw new NotFoundException('Pedido não encontrado');
          };

        return await this.prismaService.order.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                Table: true,
                Menu: true,
            },
        });
    }

    async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {

        const orderExists = await this.prismaService.order.findUnique({
            where: {
              id: id,
            }
          });
      
          if (!orderExists) {
            throw new NotFoundException('Pedido não encontrado');
          };

        return await this.prismaService.order.update({
            where: {
                id: Number(id),
            },
            data: updateOrderDto,
            include: {
                Table: true,
                Menu: true,
            },
        });
    }

    async delete(id: number): Promise<Order> {

        const orderExists = await this.prismaService.order.findUnique({
            where: {
              id: id,
            }
          });
      
          if (!orderExists) {
            throw new NotFoundException('Pedido não encontrado');
          };
          
        return this.prismaService.order.delete({
            where: {
                id: Number(id),
            },
            include: {
                Table: true,
                Menu: true,
            },
        });
    }
}
