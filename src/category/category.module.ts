import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService]
})
export class CategoryModule {}
