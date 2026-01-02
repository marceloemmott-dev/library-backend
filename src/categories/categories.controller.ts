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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  // CREATE
  @Post()
  @ApiOperation({ summary: 'Crear categoría' })
  @ApiResponse({ status: 201, type: CategoryResponseDto })
  @Post()
  async create(@Body() dto: CreateCategoryDto): Promise<{
    message: string;
    data: CategoryResponseDto;
  }> {
    const data = await this.service.create(dto);

    return {
      message: 'Categoría creada correctamente',
      data,
    };
  }

  // FIND ALL
  @Get()
  @ApiOperation({ summary: 'Listar categorías' })
  @ApiResponse({ status: 200, type: [CategoryResponseDto] })
  @Get()
  async findAll(): Promise<{
    message: string;
    data: CategoryResponseDto[];
  }> {
    const data = await this.service.findAll();

    const message =
      data.length === 0
        ? 'No existen categorías creadas'
        : 'Las categorías del sistema son:';

    return {
      message,
      data,
    };
  }

  // FIND ONE
  @Get(':id')
  @ApiOperation({ summary: 'Obtener categoría por id' })
  @ApiResponse({ status: 200, type: CategoryResponseDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<{
    message: string;
    data: CategoryResponseDto;
  }> {
    const data = await this.service.findOne(id);
    return {
      message: 'Categoría encontrada',
      data,
    };
  }

  // UPDATE
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar categoría' })
  @ApiResponse({ status: 200, type: CategoryResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ): Promise<{
    message: string;
    data: CategoryResponseDto;
  }> {
    const data = await this.service.update(id, dto);
    return {
      message: 'Categoría actualizada correctamente',
      data,
    };
  }

  // DELETE
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar categoría' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
