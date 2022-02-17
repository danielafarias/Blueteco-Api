import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@prisma/client';

import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { LoggedUser } from 'src/auth/decorators/logged-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um usuário' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  readAll(): Promise<UserDto[]> {
    return this.userService.readAll();
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Lista um usuário por ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  readOne(@Param('id') id: number): Promise<User> {
    return this.userService.readOne(id);
  }

  @Patch()
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Altera o usuário logado' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  update(
    @LoggedUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete()
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Exclui o usuário logado' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  delete(@LoggedUser() user: User): Promise<User> {
    return this.userService.delete(user.id);
  }
}
