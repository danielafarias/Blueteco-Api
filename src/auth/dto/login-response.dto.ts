import { User } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginResponseDto {
  @IsString({ message: 'Este campo precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  token: string;

  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  user: User;
}
