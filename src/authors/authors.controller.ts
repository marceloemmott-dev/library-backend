import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorResponseDto } from './dto/author-response.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly service: AuthorsService) {}

  @Post()
  async create(
    @Body() dto: CreateAuthorDto,
  ): Promise<{ message: string; data: AuthorResponseDto }> {
    const data = await this.service.create(dto);
    return {
      message: 'Autor creado correctamente',
      data,
    };
  }

  @Get()
  async findAll(): Promise<{ message: string; data: AuthorResponseDto[] }> {
    const data = await this.service.findAll();
    return {
      message:
        data.length === 0
          ? 'No existen autores creados'
          : 'Los autores del sistema son:',
      data,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; data: AuthorResponseDto }> {
    const data = await this.service.findOne(id);
    return {
      message: 'Autor encontrado',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAuthorDto,
  ): Promise<{ message: string; data: AuthorResponseDto }> {
    const data = await this.service.update(id, dto);
    return {
      message: 'Autor actualizado correctamente',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
