import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginInputDto {
  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsEmail({ message: 'O formato não é compatível com de um e-mail.' })
  @ApiProperty({ default: 'maria@gmail.com' })
  email: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @MinLength(6, { message: 'Credenciais inválidas.' })
  @ApiProperty({ default: '123456' })
  password: string;
}
