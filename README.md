# 🚀 Backend - Sistema de Gestión de Transporte Universitario

API REST desarrollada con NestJS y Supabase para la gestión de transporte universitario, incluyendo vehículos, conductores, rutas, profesores y tarifas.

---

## 📋 Tabla de Contenidos

- [Requisitos Previos](#-requisitos-previos)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Módulos Disponibles](#-módulos-disponibles)
- [Documentación de API](#-documentación-de-api)
- [Pruebas](#-pruebas)
- [Despliegue](#-despliegue)

---

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado: 

- **Node.js** (v18 o superior) - [Descargar](https://nodejs.org/)
- **npm** (v9 o superior) o **yarn**
- **Git** - [Descargar](https://git-scm.com/)
- **Cuenta de Supabase** - [Crear cuenta](https://supabase.com/)

### Verificar instalación

```bash
node --version  # Debe mostrar v18+
npm --version   # Debe mostrar v9+
git --version
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **NestJS** | ^11.0.1 | Framework backend |
| **TypeScript** | ^5.7.3 | Lenguaje de programación |
| **Supabase** | ^2.84.0 | Base de datos y autenticación |
| **JWT** | ^9.0.2 | Autenticación y autorización |
| **Class Validator** | ^0.14.2 | Validación de datos |
| **Class Transformer** | ^0.5.1 | Transformación de objetos |

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Proyecto-final-uni/Backend.git
cd Backend
```

### 2. Navegar a la carpeta del backend

```bash
cd backend
```

### 3. Instalar dependencias

Con npm: 
```bash
npm install
```

O con yarn:
```bash
yarn install
```

**Tiempo estimado:** 2-3 minutos

---

## ⚙️ Configuración

### 1. Crear archivo de variables de entorno

Crea un archivo `.env` en la carpeta `backend/`:

```bash
touch .env
```

### 2. Configurar variables de entorno

Agrega las siguientes variables al archivo `.env`:

```env
# Puerto del servidor
PORT=3001

# Supabase Configuration
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-supabase-anon-key

# JWT Configuration
JWT_SECRET=tu-secreto-jwt-super-seguro
JWT_EXPIRATION=24h

# CORS Origins (separados por coma)
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### 3. Obtener credenciales de Supabase

1. Ve a [Supabase Dashboard](https://app.supabase.com/)
2. Selecciona tu proyecto o crea uno nuevo
3. Ve a **Settings** → **API**
4. Copia: 
   - **Project URL** → `SUPABASE_URL`
   - **anon/public key** → `SUPABASE_KEY`

### 4. Configurar base de datos

El proyecto utiliza las siguientes tablas en Supabase:

- `users` - Usuarios del sistema
- `drivers` - Conductores
- `vehicles` - Vehículos
- `destinations` - Destinos/rutas
- `trips` - Viajes
- `professors` - Profesores
- `tariffs` - Tarifas
- `semesters` - Semestres académicos

**Nota:** Asegúrate de crear estas tablas en tu proyecto de Supabase con los esquemas correspondientes.

---

## 🚀 Ejecución

### Modo Desarrollo

Inicia el servidor con hot-reload (recarga automática):

```bash
npm run start:dev
```

El servidor estará disponible en:  `http://localhost:3001`

### Modo Producción

1. Compilar el proyecto:
```bash
npm run build
```

2. Ejecutar en producción:
```bash
npm run start: prod
```

### Otros comandos disponibles

```bash
# Formato de código
npm run format

# Linting (análisis de código)
npm run lint

# Ejecutar en modo debug
npm run start:debug
```

---

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── auth/                 # Módulo de autenticación
│   ├── config/              # Configuraciones globales
│   ├── destinations/        # Módulo de destinos
│   ├── driver/             # Módulo de conductores
│   ├── professors/         # Módulo de profesores
│   ├── semesters/          # Módulo de semestres
│   ├── tariffs/            # Módulo de tarifas
│   ├── trips/              # Módulo de viajes
│   ├── users/              # Módulo de usuarios
│   ├── vehicles/           # Módulo de vehículos
│   ├── app.module.ts       # Módulo principal
│   └── main.ts             # Punto de entrada
├── test/                   # Pruebas E2E
├── . gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧩 Módulos Disponibles

### 1. Autenticación (`/auth`)
- Login de usuarios
- Validación de tokens JWT
- Gestión de sesiones

### 2. Vehículos (`/vehicles`)
- Crear, listar, actualizar vehículos
- Estados:  `operational`, `inactive`, `maintenance`
- Gestión de características del vehículo

### 3. Conductores (`/driver`)
- Gestión de conductores
- Asignación de vehículos

### 4. Destinos (`/destinations`)
- Rutas y destinos disponibles

### 5. Viajes (`/trips`)
- Programación de viajes
- Asignación de conductores y vehículos

### 6. Profesores (`/professors`)
- Gestión de profesores

### 7. Tarifas (`/tariffs`)
- Configuración de precios

### 8. Semestres (`/semesters`)
- Períodos académicos

### 9. Usuarios (`/users`)
- Gestión de usuarios del sistema

---

## 📖 Documentación de API

### Autenticación

Todos los endpoints (excepto `/auth/login`) requieren token JWT: 

```
Authorization: Bearer {tu-token-jwt}
```

### Endpoints Principales

#### 🔐 Autenticación

```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password":  "contraseña"
}
```

#### 🚐 Vehículos

```http
# Listar todos los vehículos
GET /vehicles
Authorization: Bearer {token}

# Crear vehículo
POST /vehicles
Authorization: Bearer {token}
Content-Type: application/json

{
  "plate": "ABC-123",
  "brand": "Toyota",
  "model": "Hiace",
  "capacity": 15,
  "state": "operational"
}

# Obtener vehículo por ID
GET /vehicles/: id
Authorization: Bearer {token}

# Actualizar vehículo
PATCH /vehicles/:id
Authorization:  Bearer {token}
Content-Type: application/json

{
  "state": "maintenance"
}
```

### Documentación Completa

Para documentación detallada del módulo de vehículos, consulta:  [VEHICLES_API_NOTION.md](./VEHICLES_API_NOTION. md)

---

## 🧪 Pruebas

### Ejecutar todas las pruebas

```bash
npm run test
```

### Pruebas con cobertura

```bash
npm run test:cov
```

### Pruebas E2E

```bash
npm run test:e2e
```

### Modo watch (pruebas continuas)

```bash
npm run test:watch
```

---

## 🌐 Despliegue

### Configuración CORS

El proyecto está configurado para aceptar requests desde: 

- `https://backend-7uto. onrender.com` (Producción)
- `http://localhost:3001` (Desarrollo)

Para agregar más orígenes, edita `src/main.ts`:

```typescript
app.enableCors({
  origin: [
    'https://backend-7uto.onrender.com',
    'http://localhost:3001',
    'https://tu-dominio.com'  // Agregar aquí
  ]
});
```

### Despliegue en Render

1. Crea una cuenta en [Render](https://render.com/)
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno
4. Define el build command:  `npm install && npm run build`
5. Define el start command: `npm run start: prod`

### Variables de entorno en producción

Asegúrate de configurar todas las variables en tu plataforma de hosting:

- `PORT`
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `JWT_SECRET`
- `JWT_EXPIRATION`

---

## 🔧 Solución de Problemas

### Error: "Cannot find module"

```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error de conexión a Supabase

1. Verifica que `SUPABASE_URL` y `SUPABASE_KEY` sean correctos
2. Confirma que tu IP no esté bloqueada en Supabase
3. Verifica que las tablas existan en la base de datos

### Puerto en uso

Si el puerto 3001 está ocupado: 

```bash
# En Linux/Mac
lsof -ti: 3001 | xargs kill -9

# O cambia el puerto en . env
PORT=3002
```

---

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es privado y está bajo licencia UNLICENSED.

---

## 📞 Soporte

Para preguntas o problemas: 

1. Abre un [Issue](https://github.com/Proyecto-final-uni/Backend/issues)
2. Contacta al equipo de desarrollo

---

## 🔄 Changelog

### Versión 0.0.1 (Actual)
- ✅ Módulo de autenticación con JWT
- ✅ CRUD completo de vehículos
- ✅ Integración con Supabase
- ✅ Validaciones globales
- ✅ Configuración CORS

---

**Última actualización:** Enero 2026
