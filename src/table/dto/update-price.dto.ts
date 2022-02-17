import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class UpdatePriceDto {
  @IsBoolean({ message: 'Este campo precisa ser do tipo booleano.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: false })
  couvert: boolean;

  @IsBoolean({ message: 'Este campo precisa ser do tipo booleano.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: false })
  tip: boolean;
}
