# TP Programación IV — Registro y Login con Google OAuth2 (NestJS)

API backend en **NestJS** que permite registrarse e iniciar sesión con **Google**, guarda el usuario en **PostgreSQL** con **Prisma** y devuelve un **JWT** para acceder a rutas privadas.

## Estructura

```
prisma/
  schema.prisma          # Modelo User
src/
  app.module.ts          # Módulo raíz (carga el .env)
  app.controller.ts      # Página de inicio
  database/              # DatabaseModule: conexión con Prisma
  users/                 # UsersModule: tabla User + GET /users/me (privada)
  auth/                  # AuthModule: Google OAuth2 + JWT
```

## Flujo

1. `GET /auth/google` → redirige al login de Google.
2. Google vuelve a `GET /auth/google/redirect`.
3. `AuthService.validateGoogleUser`:
   - si existe un usuario con ese `googleId` → actualiza su perfil;
   - si no, pero existe con ese `email` → le vincula el `googleId` (no duplica la cuenta);
   - si no existe → lo crea.
4. Se firma un JWT y se muestra junto con los datos del usuario.
5. `GET /users/me` con el header `Authorization: Bearer <token>` devuelve el usuario. Sin token responde `401`.

## Requisitos

- Node.js 18 o superior
- PostgreSQL
- Credenciales OAuth de Google Cloud Console

## Instalación

```bash
git clone <url-del-repo>
cd practico-oauth-nestjs
npm install
```

## Configuración

1. En Google Cloud Console crear un **ID de cliente de OAuth** (Aplicación web) con:
   - Origen autorizado: `http://localhost:3000`
   - URI de redireccionamiento: `http://localhost:3000/auth/google/redirect`
2. Copiar `.env.example` a `.env` y completar `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `JWT_SECRET` y la contraseña de PostgreSQL en `DATABASE_URL`.

## Base de datos

```bash
npx prisma migrate dev
```

## Ejecutar

```bash
npm run start:dev
```

Abrir <http://localhost:3000> y hacer clic en **Login con Google**.

## Probar la ruta privada

```bash
curl http://localhost:3000/users/me -H "Authorization: Bearer <token>"
```