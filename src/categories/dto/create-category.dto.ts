import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Historia' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
