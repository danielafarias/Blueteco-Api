import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsNotEmpty,
  IsUrl,
  IsDateString,
} from 'class-validator';
import { Role } from 'src/utils/roles.enum';

export class UpdateUserDto {
  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: 'João' })
  firstName: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: 'Maria' })
  lastName: string;

  @IsDateString({ message: 'Este campo precisa ser do tipo data' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: '2000-06-30T00:00:00.000Z' })
  birthdate: Date;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: 'Garçom' })
  occupation: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsEmail({ message: 'O formato não é compatível com de um e-mail.' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: 'joao@gmail.com' })
  email: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsUrl({ message: 'O formato não é compatível com de uma url.' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: 'https://www.thoughtco.com/thmb/gLnM7UnewBysZ2XYnQR1bU7jIyY=/1000x1000/smart/filters:no_upscale()/good-looking-man-with-big-beard-56688bcf3df78ce1611f7ba8.jpg' })
  imageUrl: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: 'USER' })
  role: Role;
}
