import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: 'Porções' })
  title: string;
}
