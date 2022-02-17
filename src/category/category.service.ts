import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(categoryDto: CategoryDto): Promise<Category> {

    return this.prismaService.category.create({
      data: categoryDto,
      include: {
        itens: true,
      }
    });
  }

  async readAll(): Promise<Category[]> {
    return this.prismaService.category.findMany({
      select: {
        id: true,
        title: true,
        itens: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  async readOne(id: number): Promise<Category> {

    const categoryExists = await this.prismaService.category.findUnique({
      where: {
        id: Number(id),
      }
    });

    if (!categoryExists) {
      throw new NotFoundException('Categoria não encontrada');
    };

    return this.prismaService.category.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        itens: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  async update(id: number, categoryDto: CategoryDto): Promise<Category> {

    const categoryExists = await this.prismaService.category.findUnique({
      where: {
        id: id,
      }
    });

    if (!categoryExists) {
      throw new NotFoundException('Categoria não encontrada');
    };

    return this.prismaService.category.update({
      where: {
        id: Number(id),
      },
      data: categoryDto,
    });
  }

  async delete(id: number): Promise<Category> {

    const categoryExists = await this.prismaService.category.findUnique({
      where: {
        id: id,
      }
    });

    if (!categoryExists) {
      throw new NotFoundException('Categoria não encontrada');
    };

    const isCategoryBeingUsed = await this.prismaService.menu.findMany({
      where: {
        categoryId: Number(id),
      },
    });

    if (isCategoryBeingUsed.length > 0) {
      throw new ConflictException(
        'Não foi possível apagar esta categoria, pois está sendo usada no momento.',
      );
    }

    return this.prismaService.category.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
