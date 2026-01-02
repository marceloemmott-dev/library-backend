import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity';
import { Category } from '../categories/entities/category.entity';

// 🎭 Mocks de los repositorios de TypeORM
const mockBookRepo = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

const mockAuthorRepo = {
  findOne: jest.fn(),
};

const mockCategoryRepo = {
  findOne: jest.fn(),
};

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepo,
        },
        {
          provide: getRepositoryToken(Author),
          useValue: mockAuthorRepo,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepo,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);

    // 🧹 Limpiar mocks antes de cada test
    jest.clearAllMocks();
  });

  // ═══════════════════════════════════════════════════════════════
  // 📝 CREATE TESTS
  // ═══════════════════════════════════════════════════════════════

  describe('create', () => {
    const mockAuthor = { id: 1, name: 'Gabriel García Márquez' };
    const mockCategory = { id: 1, name: 'Ficción' };

    it('should create a book successfully', async () => {
      // 1️⃣ ARRANGE
      const dto = {
        title: 'Cien años de soledad',
        authorId: 1,
        categoryId: 1,
      };

      const expectedBook = {
        id: 1,
        title: 'Cien años de soledad',
        author: mockAuthor,
        category: mockCategory,
      };

      mockAuthorRepo.findOne.mockResolvedValue(mockAuthor);
      mockCategoryRepo.findOne.mockResolvedValue(mockCategory);
      mockBookRepo.create.mockReturnValue(expectedBook);
      mockBookRepo.save.mockResolvedValue(expectedBook);

      // 2️⃣ ACT
      const result = await service.create(dto);

      // 3️⃣ ASSERT
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.title).toBe('Cien años de soledad');
      expect(result.author.name).toBe('Gabriel García Márquez');
      expect(result.category.name).toBe('Ficción');
    });

    it('should throw NotFoundException if author does not exist', async () => {
      // 1️⃣ ARRANGE
      const dto = {
        title: 'Cien años de soledad',
        authorId: 999,
        categoryId: 1,
      };

      mockAuthorRepo.findOne.mockResolvedValue(null);

      // 2️⃣ ACT & 3️⃣ ASSERT
      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
      await expect(service.create(dto)).rejects.toThrow('Author not found');
    });

    it('should throw NotFoundException if category does not exist', async () => {
      // 1️⃣ ARRANGE
      const dto = {
        title: 'Cien años de soledad',
        authorId: 1,
        categoryId: 999,
      };

      mockAuthorRepo.findOne.mockResolvedValue(mockAuthor);
      mockCategoryRepo.findOne.mockResolvedValue(null);

      // 2️⃣ ACT & 3️⃣ ASSERT
      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
      await expect(service.create(dto)).rejects.toThrow('Category not found');
    });

    it('should trim whitespace from title', async () => {
      // 1️⃣ ARRANGE
      const dto = {
        title: '  Cien años de soledad  ',
        authorId: 1,
        categoryId: 1,
      };

      const expectedBook = {
        id: 1,
        title: 'Cien años de soledad',
        author: mockAuthor,
        category: mockCategory,
      };

      mockAuthorRepo.findOne.mockResolvedValue(mockAuthor);
      mockCategoryRepo.findOne.mockResolvedValue(mockCategory);
      mockBookRepo.create.mockReturnValue(expectedBook);
      mockBookRepo.save.mockResolvedValue(expectedBook);

      // 2️⃣ ACT
      const result = await service.create(dto);

      // 3️⃣ ASSERT
      expect(result.title).toBe('Cien años de soledad');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 📋 FIND ALL TESTS
  // ═══════════════════════════════════════════════════════════════

  describe('findAll', () => {
    it('should return an array of books', async () => {
      // 1️⃣ ARRANGE
      const books = [
        {
          id: 1,
          title: 'Cien años de soledad',
          author: { id: 1, name: 'Gabriel García Márquez' },
          category: { id: 1, name: 'Ficción' },
        },
        {
          id: 2,
          title: 'El amor en los tiempos del cólera',
          author: { id: 1, name: 'Gabriel García Márquez' },
          category: { id: 1, name: 'Ficción' },
        },
      ];
      mockBookRepo.find.mockResolvedValue(books);

      // 2️⃣ ACT
      const result = await service.findAll();

      // 3️⃣ ASSERT
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Cien años de soledad');
      expect(result[1].title).toBe('El amor en los tiempos del cólera');
    });

    it('should return empty array when no books exist', async () => {
      // 1️⃣ ARRANGE
      mockBookRepo.find.mockResolvedValue([]);

      // 2️⃣ ACT
      const result = await service.findAll();

      // 3️⃣ ASSERT
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 🔍 FIND ONE TESTS
  // ═══════════════════════════════════════════════════════════════

  describe('findOne', () => {
    it('should return a book by id', async () => {
      // 1️⃣ ARRANGE
      const book = {
        id: 1,
        title: 'Cien años de soledad',
        author: { id: 1, name: 'Gabriel García Márquez' },
        category: { id: 1, name: 'Ficción' },
      };
      mockBookRepo.findOne.mockResolvedValue(book);

      // 2️⃣ ACT
      const result = await service.findOne(1);

      // 3️⃣ ASSERT
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.title).toBe('Cien años de soledad');
    });

    it('should throw NotFoundException if book not found', async () => {
      // 1️⃣ ARRANGE
      mockBookRepo.findOne.mockResolvedValue(null);

      // 2️⃣ ACT & 3️⃣ ASSERT
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // ✏️ UPDATE TESTS
  // ═══════════════════════════════════════════════════════════════

  describe('update', () => {
    const mockAuthor = { id: 1, name: 'Gabriel García Márquez' };
    const mockCategory = { id: 1, name: 'Ficción' };

    it('should update book title successfully', async () => {
      // 1️⃣ ARRANGE
      const existingBook = {
        id: 1,
        title: 'Cien años de soledad',
        author: mockAuthor,
        category: mockCategory,
      };

      const updatedBook = {
        id: 1,
        title: 'Cien años de soledad - Edición Especial',
        author: mockAuthor,
        category: mockCategory,
      };

      mockBookRepo.findOne.mockResolvedValue(existingBook);
      mockBookRepo.save.mockResolvedValue(updatedBook);

      // 2️⃣ ACT
      const result = await service.update(1, { title: 'Cien años de soledad - Edición Especial' });

      // 3️⃣ ASSERT
      expect(result.title).toBe('Cien años de soledad - Edición Especial');
    });

    it('should update book author successfully', async () => {
      // 1️⃣ ARRANGE
      const newAuthor = { id: 2, name: 'Pablo Neruda' };
      const existingBook = {
        id: 1,
        title: 'Cien años de soledad',
        author: mockAuthor,
        category: mockCategory,
      };

      const updatedBook = {
        id: 1,
        title: 'Cien años de soledad',
        author: newAuthor,
        category: mockCategory,
      };

      mockBookRepo.findOne.mockResolvedValue(existingBook);
      mockAuthorRepo.findOne.mockResolvedValue(newAuthor);
      mockBookRepo.save.mockResolvedValue(updatedBook);

      // 2️⃣ ACT
      const result = await service.update(1, { authorId: 2 });

      // 3️⃣ ASSERT
      expect(result.author.name).toBe('Pablo Neruda');
    });

    it('should throw NotFoundException if book to update not found', async () => {
      // 1️⃣ ARRANGE
      mockBookRepo.findOne.mockResolvedValue(null);

      // 2️⃣ ACT & 3️⃣ ASSERT
      await expect(service.update(999, { title: 'New Title' })).rejects.toThrow(NotFoundException);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 🗑️ REMOVE TESTS
  // ═══════════════════════════════════════════════════════════════

  describe('remove', () => {
    it('should remove a book successfully', async () => {
      // 1️⃣ ARRANGE
      const book = {
        id: 1,
        title: 'Cien años de soledad',
        author: { id: 1, name: 'Gabriel García Márquez' },
        category: { id: 1, name: 'Ficción' },
      };
      mockBookRepo.findOne.mockResolvedValue(book);
      mockBookRepo.remove.mockResolvedValue(book);

      // 2️⃣ ACT
      await service.remove(1);

      // 3️⃣ ASSERT
      expect(mockBookRepo.remove).toHaveBeenCalledWith(book);
    });

    it('should throw NotFoundException if book to remove not found', async () => {
      // 1️⃣ ARRANGE
      mockBookRepo.findOne.mockResolvedValue(null);

      // 2️⃣ ACT & 3️⃣ ASSERT
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
