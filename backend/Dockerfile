FROM php:apache
WORKDIR /var/www/html
RUN apt-get update -y

# Install the MySQLi extension and enable modrewrite
RUN docker-php-ext-install mysqli && \
    docker-php-ext-enable mysqli && a2enmod rewrite
