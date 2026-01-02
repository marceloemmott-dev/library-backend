import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryResponseDto } from './dto/category-response.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}
  async create(dto: CreateCategoryDto) {
    const name = dto.name.trim().toLowerCase();

    const exists = await this.repo.findOne({
      where: { name },
    });

    if (exists) {
      throw new ConflictException(`Category '${dto.name}' already exists`);
    }

    const category = this.repo.create({ name });
    return this.repo.save(category);
  }
  async findAll(): Promise<CategoryResponseDto[]> {
    
    const categories = await this.repo.find();
    return categories.map((category) => this.toResponse(category));
  }

  async findOne(id: number): Promise<CategoryResponseDto> {
    const category = await this.repo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return this.toResponse(category);
  }

  async update(
    id: number,
    dto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.repo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');

    if (dto.name) {
      const name = dto.name.trim().toLowerCase();

      const exists = await this.repo.findOne({
        where: { name },
      });

      if (exists && exists.id !== id) {
        throw new ConflictException(`Category '${name}' already exists`);
      }

      category.name = name;
    }

    const saved = await this.repo.save(category);
    return this.toResponse(saved);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.repo.remove(category);
  }

  private toResponse(category: Category): CategoryResponseDto {
    return {
      id: category.id,
      name: category.name,
    };
  }
}
