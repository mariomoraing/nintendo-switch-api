# Nintendo Switch API

Una API RESTful para gestionar información sobre juegos de Nintendo Switch, construida con Node.js, Express.js y PostgreSQL. Incluye operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y autenticación basada en JWT (JSON Web Tokens). Desplegada en Render con una base de datos en Neon.

## Características
- **Seguridad**: Configuración de encabezados HTTP con Helmet para proteger contra vulnerabilidades comunes.
- **Límite de usuarios**: Máximo de 50 usuarios registrados (configurable vía `MAX_USERS` en variables de entorno).
- **Endpoints CRUD**: Gestiona juegos con operaciones GET, POST, PUT y DELETE.
- **Autenticación**: Registro e inicio de sesión de usuarios con JWT para proteger endpoints sensibles.
- **Validaciones**: Usa `express-validator` para validar datos y un middleware personalizado para restringir publishers.
- **Arquitectura**: Diseño en capas (Controllers, Services, Repositories) con patrones como Repository y DTO.
- **Base de datos**: PostgreSQL alojada en Neon.
- **Desplegada en**: [Render](https://nintendo-switch-api.onrender.com/api/games).

## Tecnologías
- **Backend**: Node.js, Express.js
- **Base de datos**: PostgreSQL (Neon)
- **Autenticación**: JWT (`jsonwebtoken`), `bcrypt` para hash de contraseñas
- **Seguridad**: `helmet`
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
   NODE_ENV=production
   MAX_USERS=tu_cantidad_de_usuarios_limite

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

## Endpoints

### Autenticación

- **POST /api/auth/register**

- **Descripción: Registra un nuevo usuario**
- Descripción: Registra un nuevo usuario (limitado a un máximo configurable, por defecto 50).
   - Nota: Devuelve un error si se alcanza el límite de usuarios.
   - Cuerpo:
      ```json
      {
         "username": "mario",
         "password": "222222"
      }
   - Respuesta 201 Created (éxito):
      ```json
      {
      "user": { "id": 1, "username": "mario" },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
   - Respuesta 400 Bad Request (límite alcanzado):
      ```json
      {
      "message": "Se ha alcanzado el límite máximo de usuarios registrados"
      }
   - Respuesta 400 Bad Request (el usuario ya existe):
      ```json
      {
      "message": "El usuario ya existe"
      }

- **POST /api/auth/login**
- **Descripción**: Inicia sesión y devuelve un token JWT para autenticación.
   - **Cuerpo**:
   ```json
   {
    "username": "string (requerido)",
    "password": "string (requerido)"
   }
   ```

   - Respuesta **200 Ok**:
   ```json
   {
    "user": { "id": 1, "username": "mario" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   }
   ```
   - Respuesta **401 Unauthorized** (credenciales inválidas):
   ```json
   {
    "message": "Usuario no encontrado"
   }
   ```
   o
   ```json
   {
    "message": "Contraseña incorrecta"
   }
   ```

### Juegos
- Nota: Los endpoints `POST`, `PUT` y `DELETE` requieren autenticación. Incluye el header `Authorization: Bearer <token>`.
- **GET /api/games**
   - **Descripción**: Lista de todos los juegos disponibles.
   - **Respuestas**:
      - **200 Ok**
      ```json
      [
         { "id": 1, "title": "The Legend of Zelda: Breath of the Wild", "genre": "Action-Adventure", "releaseDate": "2017-03-03", "publisher": "Nintendo" }
      ]
      ```
       