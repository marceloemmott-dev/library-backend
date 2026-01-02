<div align="center">

# 📚 Library Backend API

### Sistema de Gestión de Biblioteca - Backend RESTful

[![NestJS](https://img.shields.io/badge/NestJS-11.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

*API REST profesional para la gestión integral de una biblioteca digital*

[🚀 Inicio Rápido](#-inicio-rápido) •
[📖 Documentación](#-documentación-api) •
[🏗️ Arquitectura](#️-arquitectura) •
[🛠️ Stack](#️-stack-tecnológico)

</div>

---

## 📋 Descripción del Proyecto

**Library Backend** es una API REST robusta y escalable diseñada para gestionar el catálogo completo de una biblioteca digital. El sistema permite administrar **libros**, **autores** y **categorías** con operaciones CRUD completas, validaciones estrictas y documentación interactiva con Swagger.

### ✨ Características Principales

| Feature | Descripción |
|---------|-------------|
| 🔄 **CRUD Completo** | Operaciones Create, Read, Update, Delete para todas las entidades |
| ✅ **Validación de Datos** | Validación automática con class-validator y DTOs tipados |
| 📄 **Documentación Swagger** | API interactiva documentada en `/docs` |
| 🐳 **Docker Ready** | Configuración lista para desarrollo con Docker Compose |
| 🔒 **Seguridad** | Pipes de validación global, whitelist y sanitización |
| 📊 **TypeORM** | ORM robusto con soporte para migraciones y relaciones |

---

## 🧠 Mapa Mental del Sistema

<div align="center">

```
                                    ┌─────────────────────────────────────┐
                                    │         🌐 LIBRARY API              │
                                    │      Sistema de Biblioteca          │
                                    └──────────────────┬──────────────────┘
                                                       │
                    ┌──────────────────────────────────┼──────────────────────────────────┐
                    │                                  │                                  │
                    ▼                                  ▼                                  ▼
        ┌───────────────────────┐        ┌───────────────────────┐        ┌───────────────────────┐
        │     📂 CATEGORIES     │        │      ✍️ AUTHORS       │        │       📖 BOOKS        │
        │    ─────────────      │        │    ─────────────      │        │    ─────────────      │
        │                       │        │                       │        │                       │
        │  🏷️ Ficción           │        │  👤 Gabriel García M. │        │  📕 Cien años de...   │
        │  🏷️ Ciencia           │        │  👤 Isabel Allende    │        │  📗 La casa de los... │
        │  🏷️ Historia          │        │  👤 Pablo Neruda      │        │  📘 El túnel          │
        │  🏷️ Fantasía          │        │  👤 Jorge Luis Borges │        │  📙 Rayuela           │
        │                       │        │                       │        │                       │
        └───────────┬───────────┘        └───────────┬───────────┘        └───────────┬───────────┘
                    │                                │                                │
                    │                                │                                │
                    └──────────────────────┬─────────┴────────────────────────────────┘
                                           │
                                           ▼
                            ┌─────────────────────────────┐
                            │      🔧 FUNCIONALIDADES     │
                            └─────────────────────────────┘
                                           │
            ┌──────────────┬───────────────┼───────────────┬──────────────┐
            │              │               │               │              │
            ▼              ▼               ▼               ▼              ▼
        ┌───────┐      ┌───────┐      ┌───────┐      ┌───────┐      ┌───────┐
        │ POST  │      │  GET  │      │ GET/  │      │ PATCH │      │DELETE │
        │Create │      │ List  │      │  :id  │      │Update │      │Remove │
        └───────┘      └───────┘      └───────┘      └───────┘      └───────┘
```

</div>

### 🎯 Flujo de la Aplicación

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   📱 Client  │────▶│  🚀 NestJS   │────▶│  📊 TypeORM  │────▶│ 🐘 PostgreSQL│
│   (Request)  │     │  Controller  │     │   Service    │     │   Database   │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
       ▲                                                              │
       │                                                              │
       └──────────────────────────────────────────────────────────────┘
                              📤 JSON Response
```

### 💡 ¿Por qué este Stack?

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🎯 NestJS         → Arquitectura modular, escalable y mantenible           ║
║   📘 TypeScript     → Tipado estático, menos errores en runtime              ║
║   🐘 PostgreSQL     → Base de datos relacional robusta y confiable           ║
║   🔄 TypeORM        → Mapeo objeto-relacional con soporte completo           ║
║   🐳 Docker         → Entorno consistente en desarrollo y producción         ║
║   📄 Swagger        → Documentación automática e interactiva                 ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## 🏗️ Arquitectura

El proyecto sigue la **arquitectura modular de NestJS** con separación clara de responsabilidades:

```
📦 library-backend
├── 📂 src
│   ├── 📂 categories           # Módulo de Categorías ✅
│   │   ├── 📂 dto              # Data Transfer Objects
│   │   │   ├── create-category.dto.ts
│   │   │   ├── update-category.dto.ts
│   │   │   └── category-response.dto.ts
│   │   ├── 📂 entities         # Entidades TypeORM
│   │   │   └── category.entity.ts
│   │   ├── categories.controller.ts
│   │   ├── categories.service.ts
│   │   └── categories.module.ts
│   ├── 📂 authors              # Módulo de Autores ✅
│   │   ├── 📂 dto
│   │   │   ├── create-author.dto.ts
│   │   │   ├── update-author.dto.ts
│   │   │   └── author-response.dto.ts
│   │   ├── 📂 entities
│   │   │   └── author.entity.ts
│   │   ├── authors.controller.ts
│   │   ├── authors.service.ts
│   │   └── authors.module.ts
│   ├── 📂 books                # Módulo de Libros ✅
│   │   ├── 📂 dto
│   │   │   ├── create-book.dto.ts
│   │   │   ├── update-book.dto.ts
│   │   │   └── book-response.dto.ts
│   │   ├── 📂 entities
│   │   │   └── book.entity.ts
│   │   ├── books.controller.ts
│   │   ├── books.service.ts
│   │   └── books.module.ts
│   ├── app.module.ts           # Módulo raíz
│   └── main.ts                 # Bootstrap de la aplicación
├── 📂 test                     # Tests E2E
├── 📂 postman                  # Colección Postman
├── 🐳 docker-compose.yml       # Configuración Docker
├── ⚙️ .env                     # Variables de entorno
└── 📄 package.json
```

### 🔗 Diagrama de Entidades (ER)

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    CATEGORY     │       │      BOOK       │       │     AUTHOR      │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │       │ id (PK)         │
│ name            │◄──────│ categoryId (FK) │       │ name            │
│                 │       │ authorId (FK)   │──────►│ bio             │
│                 │       │ title           │       │ birthDate       │
│                 │       │ isbn            │       │                 │
│                 │       │ publishedYear   │       │                 │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

### 📦 Patrón DTO (Data Transfer Object)

Este proyecto implementa el **patrón DTO** para separar la lógica de transferencia de datos de las entidades de base de datos. Usamos 3 tipos de DTOs por cada módulo:

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                           📦 TIPOS DE DTOs                                     │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│   📥 CREATE DTO              📝 UPDATE DTO              📤 RESPONSE DTO        │
│   ─────────────              ─────────────              ──────────────         │
│                                                                                │
│   • Valida datos de          • Extiende Create DTO     • Define qué datos     │
│     entrada (POST)           • Campos opcionales         retorna la API       │
│   • Campos requeridos        • PartialType<>           • Oculta campos        │
│   • @IsNotEmpty()            • Para PATCH                sensibles            │
│   • @IsString()                                        • Documenta Swagger    │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
```

#### 💡 ¿Por qué usamos Response DTOs?

| Beneficio | Descripción |
|-----------|-------------|
| 🔒 **Seguridad** | Evita exponer campos sensibles de la entidad (passwords, tokens, etc.) |
| 📄 **Documentación** | Swagger genera documentación precisa de las respuestas |
| 🎯 **Control** | Define exactamente qué campos se envían al cliente |
| 🔄 **Desacoplamiento** | Separa la estructura de BD de la respuesta de la API |
| ✅ **Consistencia** | Garantiza formato uniforme en todas las respuestas |

#### 📝 Ejemplo Práctico

```typescript
// ❌ SIN Response DTO - Expone toda la entidad
@Get(':id')
async findOne(@Param('id') id: number): Promise<Author> {
  return this.service.findOne(id);  // Podría exponer campos sensibles
}

// ✅ CON Response DTO - Control total de la respuesta
@Get(':id')
async findOne(@Param('id') id: number): Promise<{ message: string; data: AuthorResponseDto }> {
  const data = await this.service.findOne(id);
  return {
    message: 'Autor encontrado',
    data,  // Solo campos definidos en AuthorResponseDto
  };
}
```

#### 📁 Estructura de DTOs por Módulo

```typescript
// 📥 create-author.dto.ts - Validación de entrada
export class CreateAuthorDto {
  @ApiProperty({ example: 'Gabriela Mistral' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;
}

// 📝 update-author.dto.ts - Campos opcionales
export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}

// 📤 author-response.dto.ts - Respuesta controlada
export class AuthorResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Gabriela Mistral' })
  name: string;
}
```

---

## 🛠️ Stack Tecnológico

<table>
<tr>
<td align="center" width="140">

**Backend Framework**

![NestJS](https://img.shields.io/badge/-NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)

NestJS 11

</td>
<td align="center" width="140">

**Lenguaje**

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

TypeScript 5.7

</td>
<td align="center" width="140">

**Base de Datos**

![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)

PostgreSQL 16

</td>
<td align="center" width="140">

**ORM**

![TypeORM](https://img.shields.io/badge/-TypeORM-FE0803?style=flat-square&logo=typeorm&logoColor=white)

TypeORM 0.3

</td>
</tr>
<tr>
<td align="center" width="140">

**Contenedores**

![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

Docker Compose

</td>
<td align="center" width="140">

**Documentación**

![Swagger](https://img.shields.io/badge/-Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black)

OpenAPI 3.0

</td>
<td align="center" width="140">

**Validación**

![Class Validator](https://img.shields.io/badge/-Validation-FF6B6B?style=flat-square)

class-validator

</td>
<td align="center" width="140">

**Testing**

![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white)

Jest + Supertest

</td>
</tr>
</table>

---

## 🚀 Inicio Rápido

### Prerrequisitos

Asegúrate de tener instalado:

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Docker** y **Docker Compose** (para la base de datos)
- **Git**

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/marceloemmott-dev/library-backend.git
cd library-backend
```

### Paso 2: Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Aplicación
APP_PORT=3000

# Base de Datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=library_user
DB_PASSWORD=library_secret
DB_NAME=library_db

# Docker
POSTGRES_USER=library_user
POSTGRES_PASSWORD=library_secret
POSTGRES_DB=library_db
ADMINER_PORT=8080
```

### Paso 3: Iniciar la base de datos con Docker

```bash
docker-compose up -d
```

Esto iniciará:
- 🐘 **PostgreSQL 16** en el puerto `5432`
- 🔧 **Adminer** (gestor visual) en `http://localhost:8080`

### Paso 4: Instalar dependencias

```bash
npm install
```

### Paso 5: Ejecutar la aplicación

```bash
# Modo desarrollo (hot-reload)
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

### ✅ Verificar la instalación

Una vez iniciada la aplicación, deberías ver:

```
🚀 Library API running
🌐 Base URL: http://localhost:3000
📚 Swagger Docs: http://localhost:3000/docs
```

---

## 📖 Documentación API

La API está completamente documentada con **Swagger/OpenAPI**. Accede a la documentación interactiva en:

```
http://localhost:3000/docs
```

### 📚 Endpoints Disponibles

#### Categories

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/categories` | Crear nueva categoría |
| `GET` | `/categories` | Listar todas las categorías |
| `GET` | `/categories/:id` | Obtener categoría por ID |
| `PATCH` | `/categories/:id` | Actualizar categoría |
| `DELETE` | `/categories/:id` | Eliminar categoría |

#### Authors

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/authors` | Crear nuevo autor |
| `GET` | `/authors` | Listar todos los autores |
| `GET` | `/authors/:id` | Obtener autor por ID |
| `PATCH` | `/authors/:id` | Actualizar autor |
| `DELETE` | `/authors/:id` | Eliminar autor |

#### Books

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/books` | Crear nuevo libro |
| `GET` | `/books` | Listar todos los libros |
| `GET` | `/books/:id` | Obtener libro por ID |
| `PATCH` | `/books/:id` | Actualizar libro |
| `DELETE` | `/books/:id` | Eliminar libro |

---

## 🎯 Guía de Uso Paso a Paso

> ⚠️ **IMPORTANTE**: Los libros requieren un **autor** y una **categoría** existentes. Sigue este orden:

### Paso 1️⃣: Crear una Categoría

```bash
# POST http://localhost:3000/categories
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Ciencia Ficción"}'
```

**Response:**
```json
{
  "message": "Categoría creada correctamente",
  "data": {
    "id": 1,
    "name": "Ciencia Ficción"
  }
}
```

### Paso 2️⃣: Crear un Autor

```bash
# POST http://localhost:3000/authors
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"name": "Gabriel García Márquez"}'
```

**Response:**
```json
{
  "message": "Autor creado correctamente",
  "data": {
    "id": 1,
    "name": "Gabriel García Márquez"
  }
}
```

### Paso 3️⃣: Crear un Libro

```bash
# POST http://localhost:3000/books
# Usa los IDs obtenidos en los pasos anteriores
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Cien años de soledad",
    "authorId": 1,
    "categoryId": 1
  }'
```

**Response:**
```json
{
  "message": "Libro creado correctamente",
  "data": {
    "id": 1,
    "title": "Cien años de soledad",
    "author": {
      "id": 1,
      "name": "Gabriel García Márquez"
    },
    "category": {
      "id": 1,
      "name": "Ciencia Ficción"
    }
  }
}
```

### 📊 Flujo Visual de Creación

```
╭─────────────────╮     ╭─────────────────╮     ╭─────────────────╮
│  1️⃣ CATEGORY  │     │   2️⃣ AUTHOR   │     │    3️⃣ BOOK    │
│─────────────────│     │─────────────────│     │─────────────────│
│                 │     │                 │     │                 │
│  POST /categories │────▶│  POST /authors  │────▶│  POST /books    │
│                 │     │                 │     │                 │
│  🏷️ Obtener ID   │     │  🏷️ Obtener ID   │     │  📖 Usa ambos IDs │
│     (ej: 1)     │     │     (ej: 1)     │     │  authorId: 1    │
│                 │     │                 │     │  categoryId: 1  │
╰─────────────────╯     ╰─────────────────╯     ╰─────────────────╯
```

---

## 📦 Colección Postman

Para probar la API fácilmente, importa la colección de Postman incluida:

### Importar Colección

1. Abre **Postman**
2. Click en **Import** (o `Ctrl + O`)
3. Selecciona el archivo: `postman/Library_API_Collection.json`
4. ¡Listo! Tendrás todos los endpoints configurados

### Contenido de la Colección

```
📁 Library API
├── 📁 Categories
│   ├── POST   - Create Category
│   ├── GET    - Get All Categories
│   ├── GET    - Get Category by ID
│   ├── PATCH  - Update Category
│   └── DELETE - Delete Category
├── 📁 Authors
│   ├── POST   - Create Author
│   ├── GET    - Get All Authors
│   ├── GET    - Get Author by ID
│   ├── PATCH  - Update Author
│   └── DELETE - Delete Author
└── 📁 Books
    ├── POST   - Create Book
    ├── GET    - Get All Books
    ├── GET    - Get Book by ID
    ├── PATCH  - Update Book
    └── DELETE - Delete Book
```

---

## 🐳 Docker

El proyecto incluye configuración completa de Docker Compose para desarrollo:

```yaml
services:
  postgres:
    image: postgres:16
    container_name: library_postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  adminer:
    image: adminer
    container_name: library_adminer
    ports:
      - "8080:8080"
```

### Comandos útiles

```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f postgres

# Detener servicios
docker-compose down

# Eliminar volúmenes (⚠️ borra datos)
docker-compose down -v
```

---

## 🧪 Testing

Este proyecto implementa una estrategia de **testing completa** utilizando **Jest** como framework de testing y **mocks** para simular las dependencias de base de datos.

### 🎯 Estrategia de Testing

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                         PIRÁMIDE DE TESTING                                   ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║                              /\                                               ║
║                             /  \         E2E Tests                            ║
║                            /    \        (Pocos, lentos, costosos)            ║
║                           /──────\                                            ║
║                          /        \      Integration Tests                    ║
║                         /          \     (Algunos, medianos)                  ║
║                        /────────────\                                         ║
║                       /              \   Unit Tests ← NOSOTROS ESTAMOS AQUÍ   ║
║                      /                \  (Muchos, rápidos, baratos)           ║
║                     /──────────────────\                                      ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

### 📦 Estructura de Tests

```
📂 src
├── 📂 categories
│   ├── categories.service.ts           # Código de producción
│   └── categories.service.spec.ts      # ✅ Tests unitarios
├── 📂 authors
│   ├── authors.service.ts
│   └── authors.service.spec.ts         # ✅ Tests unitarios
└── 📂 books
    ├── books.service.ts
    └── books.service.spec.ts           # ✅ Tests unitarios
```

### 🎭 Patrón de Mocking

Utilizamos **mocks** para simular el repositorio de TypeORM, lo que nos permite:

- ✅ **Aislar** los tests de la base de datos real
- ✅ **Controlar** las respuestas esperadas
- ✅ **Ejecutar** tests rápidamente sin conexión a BD

```typescript
// 🎭 Mock del repositorio
const mockCategoryRepo = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

// 📦 Inyección del mock en el módulo de testing
const module: TestingModule = await Test.createTestingModule({
  providers: [
    CategoriesService,
    {
      provide: getRepositoryToken(Category),
      useValue: mockCategoryRepo,  // 👈 Usamos el mock
    },
  ],
}).compile();
```

### 📝 Anatomía de un Test (Patrón AAA)

Cada test sigue el patrón **Arrange-Act-Assert**:

```typescript
it('should create a category', async () => {
  // 1️⃣ ARRANGE (Preparar)
  const dto = { name: 'Ficción' };
  mockCategoryRepo.findOne.mockResolvedValue(null);
  mockCategoryRepo.create.mockReturnValue({ id: 1, name: 'Ficción' });
  mockCategoryRepo.save.mockResolvedValue({ id: 1, name: 'Ficción' });

  // 2️⃣ ACT (Actuar)
  const result = await service.create(dto);

  // 3️⃣ ASSERT (Verificar)
  expect(result).toBeDefined();
  expect(result.name).toBe('Ficción');
});
```

### 📊 Cobertura de Tests

| Módulo | Tests | Métodos Cubiertos |
|--------|-------|-------------------|
| **Categories** | 1 | create |
| **Authors** | 10 | create, findAll, findOne, update, remove |
| **Books** | 12 | create, findAll, findOne, update, remove |
| **Total** | **23** | CRUD completo |

### 🚀 Comandos de Testing

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch (se re-ejecutan al cambiar código)
npm run test:watch

# Ejecutar tests con reporte de cobertura
npm run test:cov

# Ejecutar solo tests de un archivo específico
npm run test -- authors.service.spec.ts

# Ejecutar tests E2E (end-to-end)
npm run test:e2e
```

### ✅ Resultado de Tests

```
 PASS  src/categories/categories.service.spec.ts
 PASS  src/authors/authors.service.spec.ts
 PASS  src/books/books.service.spec.ts

Test Suites: 4 passed, 4 total
Tests:       26 passed, 26 total
Time:        4.664 s
```

---

## 📦 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run start:dev` | Inicia en modo desarrollo con hot-reload |
| `npm run start:prod` | Inicia en modo producción |
| `npm run build` | Compila el proyecto a JavaScript |
| `npm run test` | Ejecuta tests unitarios |
| `npm run test:e2e` | Ejecuta tests end-to-end |
| `npm run lint` | Ejecuta ESLint y corrige errores |
| `npm run format` | Formatea código con Prettier |

---

## 🗺️ Roadmap

### ✅ Completado
- [x] Configuración inicial del proyecto NestJS
- [x] Integración con PostgreSQL + TypeORM
- [x] Docker Compose para desarrollo
- [x] Documentación Swagger
- [x] Módulo de **Categories** (CRUD completo)
- [x] Módulo de **Authors** (CRUD completo)
- [x] Módulo de **Books** (CRUD completo con relaciones)
- [x] Relaciones Many-to-One (Book → Author, Book → Category)
- [x] Colección Postman para testing
- [x] **Tests Unitarios** con Jest + Mocks (26 tests)

### 🔜 Próximas Features
- [ ] Paginación y filtros avanzados
- [ ] Autenticación JWT
- [ ] Tests E2E (end-to-end)
- [ ] Deploy a producción

---

## 👤 Autor

<div align="center">

Desarrollado con ❤️ como proyecto de portafolio

**Marcelo Emmott Sanchez**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/marceloemmott-dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marcelo-emmott-sanchez-75475939b)

</div>

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

⭐ **Si este proyecto te fue útil, considera darle una estrella en GitHub** ⭐

</div>
