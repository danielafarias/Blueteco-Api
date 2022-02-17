import { IsString, IsDate, IsEmail, IsNotEmpty, IsUrl, IsNumber } from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  id: number;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  firstName: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  lastName: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  occupation: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsEmail({ message: 'O formato não é compatível com de um e-mail.' })
  email: string;

  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsUrl({ message: 'O formato não é compatível com de uma url.' })
  imageUrl: string;

  @IsDate({ message: 'Este campo precisa ser do tipo data.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  createdAt: Date;

  @IsDate({ message: 'Este campo precisa ser do tipo data.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  updatedAt: Date;
}
