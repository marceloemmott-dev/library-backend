import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';

// 🎭 Mock del repositorio de TypeORM
const mockAuthorRepo = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

describe('AuthorsService', () => {
  let service: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(Author),
          useValue: mockAuthorRepo,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);

    // 🧹 Limpiar mocks antes de cada test
    jest.clearAllMocks();
  });

  // ═══════════════════════════════════════════════════════════════
  // 📝 CREATE TESTS
  // ═══════════════════════════════════════════════════════════════

  describe('create', () => {
    it('should create an author successfully', async () => {
      // 1️⃣ ARRANGE
      const dto = { name: 'Gabriel García Márquez' };
      const expectedAuthor = { id: 1, name: 'Gabriel García Márquez' };

      mockAuthorRepo.findOne.mockResolvedValue(null); // No existe
      mockAuthorRepo.create.mockReturnValue(expectedAuthor);
      mockAuthorRepo.save.mockResolvedValue(expectedAuthor);

      // 2️⃣ ACT
      const result = await service.create(dto);

      // 3️⃣ ASSERT
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.name).toBe('Gabriel García Márquez');
      expect(mockAuthorRepo.create).toHaveBeenCalledWith({
        name: 'Gabriel García Márquez',
      });
    });

    it('should throw ConflictException if author already exists', async () => {
      // 1️⃣ ARRANGE
      const dto = { name: 'Gabriel García Márquez' };
      mockAuthorRepo.findOne.mockResolvedValue({
        id: 1,
        name: 'Gabriel García Márquez',
      });

      // 2️⃣ ACT & 3️⃣ ASSERT
      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });

    it('should trim whitespace from name', async () => {
      // 1️⃣ ARRANGE
      const dto = { name: '  Pablo Neruda  ' };
      const expectedAuthor = { id: 1, name: 'Pablo Neruda' };

      mockAuthorRepo.findOne.mockResolvedValue(null);
      mockAuthorRepo.create.mockReturnValue(expectedAuthor);
      mockAuthorRepo.save.mockResolvedValue(expectedAuthor);

      // 2️⃣ ACT
      const result = await service.create(dto);

      // 3️⃣ ASSERT
      expect(result.name).toBe('Pablo Neruda');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 📋 FIND ALL TESTS
  // ═══════════════════════════════════════════════════════════════

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      // 1️⃣ ARRANGE
      const authors = [
        { id: 1, name: 'Gabriel García Márquez' },
        { id: 2, name: 'Pablo Neruda' },
      ];
      mockAuthorRepo.find.mockResolvedValue(authors);

      // 2️⃣ ACT
      const result = await service.findAll();

      // 3️⃣ ASSERT
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Gabriel García Márquez');
      expect(result[1].name).toBe('Pablo Neruda');
    });

    it('should return empty array when no authors exist', async () => {
      // 1️⃣ ARRANGE
      mockAuthorRepo.find.mockResolvedValue([]);

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
    it('should return an author by id', async () => {
      // 1️⃣ ARRANGE
      const author = { id: 1, name: 'Gabriel García Márquez' };
      mockAuthorRepo.findOne.mockResolvedValue(author);

      // 2️⃣ ACT
      const result = await service.findOne(1);

      // 3️⃣ ASSERT
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.name).toBe('Gabriel García Márquez');
    });

    it('should throw NotFoundException if author not found', async () => {
      // 1️⃣ ARRANGE
      mockAuthorRepo.findOne.mockResolvedValue(null);

      // 2️⃣ ACT & 3️⃣ ASSERT
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // ✏️ UPDATE TESTS
  // ═══════════════════════════════════════════════════════════════

  describe('update', () => {
    it('should update an author successfully', async () => {
      // 1️⃣ ARRANGE
      const existingAuthor = { id: 1, name: 'Gabriel García Márquez' };
      const updatedAuthor = { id: 1, name: 'Gabriel José García Márquez' };

      mockAuthorRepo.findOne
        .mockResolvedValueOnce(existingAuthor) // Primera llamada: buscar autor
        .mockResolvedValueOnce(null); // Segunda llamada: verificar nombre duplicado

      mockAuthorRepo.save.mockResolvedValue(updatedAuthor);

      // 2️⃣ ACT
      const result = await service.update(1, {
        name: 'Gabriel José García Márquez',
      });

      // 3️⃣ ASSERT
      expect(result.name).toBe('Gabriel José García Márquez');
    });

    it('should throw NotFoundException if author to update not found', async () => {
      // 1️⃣ ARRANGE
      mockAuthorRepo.findOne.mockResolvedValue(null);

      // 2️⃣ ACT & 3️⃣ ASSERT
      await expect(service.update(999, { name: 'New Name' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 🗑️ REMOVE TESTS
  // ═══════════════════════════════════════════════════════════════

  describe('remove', () => {
    it('should remove an author successfully', async () => {
      // 1️⃣ ARRANGE
      const author = { id: 1, name: 'Gabriel García Márquez' };
      mockAuthorRepo.findOne.mockResolvedValue(author);
      mockAuthorRepo.remove.mockResolvedValue(author);

      // 2️⃣ ACT
      await service.remove(1);

      // 3️⃣ ASSERT
      expect(mockAuthorRepo.remove).toHaveBeenCalledWith(author);
    });

    it('should throw NotFoundException if author to remove not found', async () => {
      // 1️⃣ ARRANGE
      mockAuthorRepo.findOne.mockResolvedValue(null);

      // 2️⃣ ACT & 3️⃣ ASSERT
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
