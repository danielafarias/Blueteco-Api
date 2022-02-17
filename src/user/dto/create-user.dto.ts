import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsUrl,
  IsDateString,
} from 'class-validator';
import { Role } from 'src/utils/roles.enum';

export class CreateUserDto {
  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: 'Maria' })
  firstName: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: 'João' })
  lastName: string;

  @IsDateString({ message: 'Este campo precisa ser do tipo data' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: '2000-01-01T00:00:00.000Z' })
  birthdate: Date;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: 'Cliente' })
  occupation: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsEmail({ message: 'O formato não é compatível com de um e-mail.' })
  @ApiProperty({ default: 'maria@gmail.com' })
  email: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @MinLength(6, { message: 'A senha deve ter no minimo 6 caracteres.' })
  @ApiProperty({ default: '123456' })
  password: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @MinLength(6, { message: 'A senha deve ter no minimo 6 caracteres.' })
  @ApiProperty({ default: '123456' })
  passwordConfirmation: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsUrl({ message: 'O formato não é compatível com de uma url.' })
  @ApiProperty({ default: 'https://www.eaclinic.co.uk/wp-content/uploads/2019/01/woman-face-eyes-1000x1000.jpg' })
  imageUrl: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @ApiProperty({ default: 'USER' })
  role: Role;
}
