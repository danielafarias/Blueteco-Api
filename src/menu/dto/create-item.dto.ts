import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, IsNumber } from 'class-validator';

export class CreateItemDto {
  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: 'Heineken' })
  title: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: 'Cerveja 600ml' })
  description: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsUrl({ message: 'O formato não é compatível com de uma url.' })
  @ApiProperty({ default: 'https://botecoclassea.com.br/wp-content/uploads/2020/09/unnamed-3.jpg' })
  imageUrl: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: 9.99 })
  price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: 1 })
  categoryId: number;
}
