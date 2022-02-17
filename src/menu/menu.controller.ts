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

import { Menu } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/utils/roles.enum';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

import { MenuService } from './menu.service';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Cria um item do menu' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() createCreateItemDto: CreateItemDto): Promise<Menu> {
    return this.menuService.create(createCreateItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os itens do menu' })
  readAll(): Promise<Menu[]> {
    return this.menuService.readAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um item do menu pelo ID' })
  readOne(@Param('id') id: number): Promise<Menu> {
    return this.menuService.readOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Altera um item do menu pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  update(
    @Param('id') id: number,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Menu> {
    return this.menuService.update(id, updateItemDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary:
      'Exclui um item do menu pelo ID caso o mesmo não esteja sendo usado',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  delete(@Param('id') id: number): Promise<Menu> {
    return this.menuService.delete(id);
  }
}
