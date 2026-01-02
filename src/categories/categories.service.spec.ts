import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

const mockCategoryRepo = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepo,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should create a category', async () => {
    // 1️⃣ ARRANGE
    const dto = { name: 'historia' };

    mockCategoryRepo.findOne.mockResolvedValue(null);
    mockCategoryRepo.create.mockReturnValue({ id: 1, name: 'historia' });
    mockCategoryRepo.save.mockResolvedValue({ id: 1, name: 'historia' });

    // 2️⃣ ACT
    const result = await service.create(dto as any);

    // 3️⃣ ASSERT
    expect(result).toBeDefined();
    expect(result.name).toBe('historia');
  });
});
