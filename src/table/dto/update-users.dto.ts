import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUsersTableDto {
  @IsBoolean({ message: 'Este campo precisa ser do tipo booleano.' })
  @IsNotEmpty({ message: 'Este campo não pode ser vazio.' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: false })
  disconnectUser: boolean;
}
