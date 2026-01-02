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
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookResponseDto } from './dto/book-response.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Post()
  async create(
    @Body() dto: CreateBookDto,
  ): Promise<{ message: string; data: BookResponseDto }> {
    const data = await this.service.create(dto);
    return {
      message: 'Libro creado correctamente',
      data,
    };
  }

  @Get()
  async findAll(): Promise<{ message: string; data: BookResponseDto[] }> {
    const data = await this.service.findAll();
    return {
      message:
        data.length === 0
          ? 'No existen libros registrados'
          : 'Los libros del sistema son:',
      data,
    };
  }

  // 🔹 GET /books/:id
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; data: BookResponseDto }> {
    const data = await this.service.findOne(id);
    return {
      message: 'Libro encontrado',
      data,
    };
  }

  // 🔹 PATCH /books/:id
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookDto,
  ): Promise<{ message: string; data: BookResponseDto }> {
    const data = await this.service.update(id, dto);
    return {
      message: 'Libro actualizado correctamente',
      data,
    };
  }

  // 🔹 DELETE /books/:id
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
