import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorResponseDto } from './dto/author-response.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly repo: Repository<Author>,
  ) {}

  async create(dto: CreateAuthorDto): Promise<AuthorResponseDto> {
    const name = dto.name.trim();

    const exists = await this.repo.findOne({ where: { name } });
    if (exists) {
      throw new ConflictException(`Author '${name}' already exists`);
    }

    const author = this.repo.create({ name });
    const saved = await this.repo.save(author);
    return this.toResponse(saved);
  }

  async findAll(): Promise<AuthorResponseDto[]> {
    const authors = await this.repo.find();
    return authors.map(a => this.toResponse(a));
  }

  async findOne(id: number): Promise<AuthorResponseDto> {
    const author = await this.repo.findOne({ where: { id } });
    if (!author) throw new NotFoundException('Author not found');
    return this.toResponse(author);
  }

  async update(
    id: number,
    dto: UpdateAuthorDto,
  ): Promise<AuthorResponseDto> {
    const author = await this.repo.findOne({ where: { id } });
    if (!author) throw new NotFoundException('Author not found');

    if (dto.name) {
      const name = dto.name.trim();
      const exists = await this.repo.findOne({ where: { name } });

      if (exists && exists.id !== id) {
        throw new ConflictException(`Author '${name}' already exists`);
      }

      author.name = name;
    }

    const saved = await this.repo.save(author);
    return this.toResponse(saved);
  }

  async remove(id: number): Promise<void> {
    const author = await this.repo.findOne({ where: { id } });
    if (!author) throw new NotFoundException('Author not found');
    await this.repo.remove(author);
  }

  private toResponse(author: Author): AuthorResponseDto {
    return {
      id: author.id,
      name: author.name,
    };
  }
}
