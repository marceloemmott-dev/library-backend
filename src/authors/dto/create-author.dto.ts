import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({
    example: 'Gabriela Mistral',
    description: 'Nombre completo del autor',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;
}
