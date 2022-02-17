import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateTableDto {
  @IsBoolean({ message: 'Este campo precisa ser do tipo booleano.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: true })
  couvert: boolean;

  @IsBoolean({ message: 'Este campo precisa ser do tipo booleano.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: true })
  tip: boolean;
}
