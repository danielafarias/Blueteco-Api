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

import { Category } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/utils/roles.enum';

import { CategoryService } from './category.service';

import { CategoryDto } from './dto/category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Cria uma categoria' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() categoryDto: CategoryDto): Promise<Category> {
    return this.categoryService.create(categoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as categorias' })
  readAll(): Promise<Category[]> {
    return this.categoryService.readAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista uma categoria pelo ID' })
  readOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.readOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Altera uma categoria pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  update(
    @Param('id') id: number,
    @Body() categoryDto: CategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(id, categoryDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Exclui uma categoria pelo ID caso a mesma não esteja sendo usada',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  delete(@Param('id') id: number): Promise<Category> {
    return this.categoryService.delete(id);
  }
}
