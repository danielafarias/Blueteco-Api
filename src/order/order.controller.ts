import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/utils/roles.enum';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Cria um pedido' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Lista todos os pedidos' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  readAll(): Promise<Order[]> {
    return this.orderService.readAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Lista um pedido pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  readOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.readOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Altera um pedido pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Deleta um pedido pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  delete(@Param('id') id: number): Promise<Order> {
    return this.orderService.delete(id);
  }
}
