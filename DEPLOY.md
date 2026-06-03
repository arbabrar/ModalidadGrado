# Despliegue en Railway

## Requisitos previos
- Cuenta en [railway.app](https://railway.app)
- Repositorio en GitHub con la carpeta `lavadero_api` (o todo el proyecto)
- Git instalado localmente

---

## Paso 1 — Subir el código a GitHub

Si aún no tienes repositorio:

```bash
cd lavadero_api
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

---

## Paso 2 — Crear proyecto en Railway

1. Entra a [railway.app](https://railway.app) → **New Project**
2. Selecciona **Deploy from GitHub repo**
3. Conecta tu cuenta de GitHub y selecciona el repositorio
4. Railway detectará automáticamente el proyecto PHP

---

## Paso 3 — Agregar PostgreSQL

1. En tu proyecto Railway, haz clic en **+ New Service**
2. Selecciona **Database → PostgreSQL**
3. Railway creará la base de datos y las siguientes variables estarán disponibles automáticamente en tu servicio:
   - `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`, `DATABASE_URL`

---

## Paso 4 — Configurar Variables de Entorno

En Railway → tu servicio Laravel → pestaña **Variables**, agrega:

| Variable | Valor |
|---|---|
| `APP_NAME` | CARWASH |
| `APP_ENV` | production |
| `APP_KEY` | *(ver abajo cómo generarla)* |
| `APP_DEBUG` | false |
| `APP_URL` | https://tu-app.up.railway.app |
| `DB_CONNECTION` | pgsql |
| `DB_HOST` | `${{PostgreSQL.PGHOST}}` |
| `DB_PORT` | `${{PostgreSQL.PGPORT}}` |
| `DB_DATABASE` | `${{PostgreSQL.PGDATABASE}}` |
| `DB_USERNAME` | `${{PostgreSQL.PGUSER}}` |
| `DB_PASSWORD` | `${{PostgreSQL.PGPASSWORD}}` |
| `JWT_SECRET` | *(ver abajo cómo generarla)* |
| `VITE_API_URL` | /api/ |
| `LOG_CHANNEL` | stderr |

### Generar APP_KEY
Corre este comando en tu máquina local (dentro de `lavadero_api`):
```bash
php artisan key:generate --show
```
Copia el resultado y pégalo en la variable `APP_KEY`.

### Generar JWT_SECRET
```bash
php artisan jwt:secret --show
```
Copia el resultado y pégalo en la variable `JWT_SECRET`.

---

## Paso 5 — Deploy

Railway hace el deploy automáticamente al hacer push a `main`. El proceso:
1. Instala PHP 8.2 + Node 20 (via Nixpacks)
2. Corre `composer install`
3. Corre `npm install && npm run build` (compila React/Vite)
4. Cachea configuración, rutas y vistas de Laravel
5. Al arrancar: corre migraciones y levanta el servidor

Puedes ver los logs en Railway → tu servicio → pestaña **Deployments**.

---

## Paso 6 — Dominio

Railway asigna automáticamente un dominio tipo `tu-app.up.railway.app`.  
Para usar dominio propio: Railway → Settings → **Custom Domain**.

---

## Comandos útiles post-deploy (desde Railway Shell)

```bash
# Ver logs de Laravel
php artisan tinker

# Revertir migraciones (cuidado en producción)
php artisan migrate:rollback

# Limpiar caché
php artisan cache:clear
php artisan config:clear
```
