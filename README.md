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

## 🏗️ Arquitectura

El proyecto sigue la **arquitectura modular de NestJS** con separación clara de responsabilidades:

```
📦 library-backend
├── 📂 src
│   ├── 📂 categories           # Módulo de Categorías
│   │   ├── 📂 dto              # Data Transfer Objects
│   │   │   ├── create-category.dto.ts
│   │   │   ├── update-category.dto.ts
│   │   │   └── category-response.dto.ts
│   │   ├── 📂 entities         # Entidades TypeORM
│   │   │   └── category.entity.ts
│   │   ├── categories.controller.ts
│   │   ├── categories.service.ts
│   │   └── categories.module.ts
│   ├── 📂 authors              # 🔜 Próximamente
│   ├── 📂 books                # 🔜 Próximamente
│   ├── app.module.ts           # Módulo raíz
│   └── main.ts                 # Bootstrap de la aplicación
├── 📂 test                     # Tests E2E
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

#### Ejemplo de Request/Response

**POST /categories**

```json
// Request Body
{
  "name": "Ciencia Ficción"
}

// Response 201
{
  "message": "Categoría creada correctamente",
  "data": {
    "id": 1,
    "name": "Ciencia Ficción"
  }
}
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

```bash
# Tests unitarios
npm run test

# Tests con watch mode
npm run test:watch

# Tests E2E
npm run test:e2e

# Cobertura de tests
npm run test:cov
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

### 🔜 Próximas Features
- [ ] Módulo de **Authors** (Autores)
- [ ] Módulo de **Books** (Libros)
- [ ] Relaciones Many-to-One entre entidades
- [ ] Paginación y filtros avanzados
- [ ] Autenticación JWT
- [ ] Tests de integración

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
