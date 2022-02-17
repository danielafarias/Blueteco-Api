import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, IsNumber, IsOptional } from 'class-validator';

export class UpdateItemDto {
  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsOptional()
  @ApiProperty({ default: 'Brahma' })
  title: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsOptional()
  @ApiProperty({ default: 'Cerveja 600ml' })
  description: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsUrl({ message: 'O formato não é compatível com de uma url.' })
  @IsOptional()
  @ApiProperty({ default: 'https://admin.cmpedidos.com.br/foto/735/produtos/cerveja-brahma-600-ml-107518.jpg' })
  imageUrl: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsOptional()
  @ApiProperty({ default: 6.15 })
  price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsOptional()
  @ApiProperty({ default: 1 })
  categoryId: number;
}
