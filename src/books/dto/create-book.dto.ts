import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    example: 'Cien años de soledad',
    description: 'Título del libro',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 1,
    description: 'ID del autor (debe existir previamente)',
  })
  @IsInt()
  @Min(1)
  authorId: number;

  @ApiProperty({
    example: 2,
    description: 'ID de la categoría (debe existir previamente)',
  })
  @IsInt()
  @Min(1)
  categoryId: number;
}
