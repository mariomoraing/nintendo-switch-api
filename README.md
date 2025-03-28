# Nintendo Switch API

Una API RESTful para gestionar información sobre juegos de Nintendo Switch, construida con Node.js, Express.js y PostgreSQL. Incluye operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y autenticación basada en JWT (JSON Web Tokens). Desplegada en Render con una base de datos en Neon.

## Características
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