import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { TableService } from './table.service';
import { TableController } from './table.controller';

import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TableController],
  providers: [TableService, PrismaService]
})
export class TableModule {}
