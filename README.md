# Nintendo Switch API

Una API RESTful para gestionar información sobre juegos de Nintendo Switch, construida con Node.js, Express.js y PostgreSQL. Incluye operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y autenticación basada en JWT (JSON Web Tokens). Desplegada en Render con una base de datos en Neon.

## Características
- **Seguridad**: Configuración de encabezados HTTP con Helmet para proteger contra vulnerabilidades comunes.
- **Endpoints CRUD**: Gestiona juegos con operaciones GET, POST, PUT y DELETE.
- **Autenticación**: Registro e inicio de sesión de usuarios con JWT para proteger endpoints sensibles.
- **Validaciones**: Usa `express-validator` para validar datos y un middleware personalizado para restringir publishers.
- **Arquitectura**: Diseño en capas (Controllers, Services, Repositories) con patrones como Repository y DTO.
- **Base de datos**: PostgreSQL alojada en Neon.
- **Desplegada en**: [Render](https://tu-url.onrender.com) (reemplaza con tu URL real).

## Tecnologías
- **Backend**: Node.js, Express.js
- **Base de datos**: PostgreSQL (Neon)
- **Autenticación**: JWT (`jsonwebtoken`), `bcrypt` para hash de contraseñas
- **Seguridad**: Helmet
- **Validación**: `express-validator`
- **Control de versiones**: Git, GitHub
- **Despliegue**: Render

## Instalación local

### Prerrequisitos
- Node.js (v16 o superior)
- PostgreSQL (o una cuenta en Neon)
- Git

### Pasos
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/nintendo-switch-api.git
   cd nintendo-switch-api

2. Instala las dependencias:
   ```bash
   npm install

3. Configura las variables de entorno en un archivo .env:
   ```plaintext
   DB_HOST=tu_host_de_neon
   DB_USER=tu_usuario_de_neon
   DB_PASSWORD=tu_contraseña_de_neon
   DB_NAME=nintendo-switch-db
   DB_PORT=tu_puerto_de_db
   JWT_SECRET=tu_secreto_super_secreto
   PORT=3000

4. Crea las tablas en tu base de datos PostgreSQL:
   ```sql
   CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    release_date DATE,
    publisher VARCHAR(50)
   );
   CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
   );

5. Inicia el servidor:
   ```bash
   npm start

6. La API estará disponible en http://localhost:3000