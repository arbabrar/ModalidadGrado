FROM php:8.3-cli

# Dependencias del sistema
RUN apt-get update && apt-get install -y \
    git unzip zip curl libpq-dev libzip-dev \
    libpng-dev libxml2-dev libonig-dev \
    && docker-php-ext-install \
        pdo pdo_pgsql zip gd mbstring xml bcmath \
    && docker-php-ext-enable opcache \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Node 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Instalar dependencias PHP
# --ignore-platform-reqs: lcobucci/clock 2.x funciona en PHP 8.3 en runtime,
# solo su metadata de versión no lo declara.
COPY composer.json ./
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-scripts \
    --no-interaction \
    --ignore-platform-reqs

# Instalar dependencias Node y compilar React/Vite
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

RUN npm run build

# Cachear configuración de Laravel
RUN php artisan config:cache || true \
    && php artisan route:cache || true \
    && php artisan view:cache || true \
    && php artisan storage:link || true

EXPOSE 8080

CMD php artisan migrate --force && php -S 0.0.0.0:${PORT:-8080} -t public
