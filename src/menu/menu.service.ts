import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Menu } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class MenuService {
  constructor(private prismaService: PrismaService) {}

  async create(createItemDto: CreateItemDto): Promise<Menu> {

    return await this.prismaService.menu.create({
      data: createItemDto,
    });
  }

  async readAll(): Promise<Menu[]> {
    return await this.prismaService.menu.findMany();
  }

  async readOne(id: number): Promise<Menu> {
    const itemExists = await this.prismaService.menu.findUnique({
      where: {
        id: id,
      },
    });

    if (!itemExists) {
      throw new NotFoundException('Item não encontrado');
    }

    return await this.prismaService.menu.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Menu> {
    const itemExists = await this.prismaService.menu.findUnique({
      where: {
        id: id,
      },
    });

    if (!itemExists) {
      throw new NotFoundException('Item não encontrado');
    }

    return await this.prismaService.menu.update({
      where: { id: Number(id) },
      data: updateItemDto,
    });
  }

  async delete(id: number): Promise<Menu> {
    const itemExists = await this.prismaService.menu.findUnique({
      where: {
        id: id,
      },
    });

    if (!itemExists) {
      throw new NotFoundException('Item não encontrado');
    }

    const isItemOnTable = await this.prismaService.table.findMany({
      select: {
        itens: {
          where: { id: Number(id) },
        },
      },
    });

    isItemOnTable.map((obj) => {
      if (obj.itens.length > 0) {
        throw new ConflictException(
          'Não foi possível apagar este item, pois está sendo usado no momento.',
        );
      }
    });

    return this.prismaService.menu.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
