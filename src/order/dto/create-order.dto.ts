import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: 1 })
  tableId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: 1 })
  menuId: number;
}
