import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { BookResponseDto } from './dto/book-response.dto';
import { Author } from '../authors/entities/author.entity';
import { Category } from '../categories/entities/category.entity';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepo: Repository<Author>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateBookDto): Promise<BookResponseDto> {
    const author = await this.authorRepo.findOne({
      where: { id: dto.authorId },
    });
    if (!author) throw new NotFoundException('Author not found');

    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');

    const book = this.bookRepo.create({
      title: dto.title.trim(),
      author,
      category,
    });

    const saved = await this.bookRepo.save(book);
    return this.toResponse(saved);
  }

  async findAll(): Promise<BookResponseDto[]> {
    const books = await this.bookRepo.find();
    return books.map((b) => this.toResponse(b));
  }

  // 🔹 GET /books/:id
  async findOne(id: number): Promise<BookResponseDto> {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return this.toResponse(book);
  }

  // 🔹 PATCH /books/:id
  async update(id: number, dto: UpdateBookDto): Promise<BookResponseDto> {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');

    if (dto.title) {
      book.title = dto.title.trim();
    }

    if (dto.authorId) {
      const author = await this.authorRepo.findOne({
        where: { id: dto.authorId },
      });
      if (!author) throw new NotFoundException('Author not found');
      book.author = author;
    }

    if (dto.categoryId) {
      const category = await this.categoryRepo.findOne({
        where: { id: dto.categoryId },
      });
      if (!category) throw new NotFoundException('Category not found');
      book.category = category;
    }

    const saved = await this.bookRepo.save(book);
    return this.toResponse(saved);
  }

  // 🔹 DELETE /books/:id
  async remove(id: number): Promise<void> {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    await this.bookRepo.remove(book);
  }
  private toResponse(book: Book): BookResponseDto {
    return {
      id: book.id,
      title: book.title,
      author: {
        id: book.author.id,
        name: book.author.name,
      },
      category: {
        id: book.category.id,
        name: book.category.name,
      },
    };
  }
}
