import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userEmailExists = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userEmailExists) {
      throw new ConflictException('Este e-mail já foi utilizado.');
    }

    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new ConflictException('Senhas incompatíveis.');
    }

    delete createUserDto.passwordConfirmation;

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      include: {
        Table: true,
      }
    });

    delete createdUser.password;

    return createdUser;
  }

  async readAll(): Promise<UserDto[]> {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        occupation: true,
        email: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        Table: true,
      },
    });

    return users;
  }

  async readOne(id: number): Promise<User> {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Table: true,
      }
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado.');
    };

    delete userExists.password;

    return userExists;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado.');
    };

    if (updateUserDto.email) {
      const emailExists = await this.prismaService.user.findUnique({
        where: {
          email: updateUserDto.email,
        }
      });

      if (emailExists) {
        throw new ConflictException('Este e-mail já está cadastrado.')
      };
    };

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: Number(id),
      },
      data: {
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        occupation: updateUserDto.occupation,
        email: updateUserDto.email,
        imageUrl: updateUserDto.imageUrl
      },
      include: {
        Table: true,
      }
    });

    delete updatedUser.password;

    return updatedUser;
  }

  async delete(id: number): Promise<User> {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado.');
    };

    const deletedUser = await this.prismaService.user.delete({
      where: {
        id: Number(id),
      },
      include: {
        Table: true,
      }
    });

    delete deletedUser.password;

    return deletedUser;
  }
}
