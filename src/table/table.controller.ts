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

import { Table, User } from '@prisma/client';
import { LoggedUser } from 'src/auth/decorators/logged-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/utils/roles.enum';

import { CreateTableDto } from './dto/create-table.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { UpdateUsersTableDto } from './dto/update-users.dto';
import { TableService } from './table.service';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Cria uma mesa' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() createTableDto: CreateTableDto): Promise<Table> {
    return this.tableService.create(createTableDto);
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Lista todas as mesas' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  readAll(): Promise<Table[]> {
    return this.tableService.readAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Lista uma mesa pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  readOne(@Param('id') id: number): Promise<Table> {
    return this.tableService.readOne(id);
  }

  @Patch('price/:id')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Altera o valor total de uma mesa pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  updatePrice(
    @Param('id') id: number,
    @Body() updatePriceDto: UpdatePriceDto,
  ): Promise<Table> {
    return this.tableService.updatePrice(id, updatePriceDto);
  }

  @Patch('users/:id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Altera os usuários de uma mesa pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  updateUsers(
    @Param('id') id: number,
    @Body() updateUsersTableDto: UpdateUsersTableDto,
    @LoggedUser() user: User
  ): Promise<Table> {
    return this.tableService.updateUsers(id, updateUsersTableDto, user.id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Exclui uma mesa pelo ID',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  delete(@Param('id') id: number): Promise<Table> {
    return this.tableService.delete(id);
  }
}
