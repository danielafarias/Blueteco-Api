import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: 1 })
  @IsOptional()
  tableId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: 1 })
  @IsOptional()
  menuId: number;
}
