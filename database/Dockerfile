FROM mysql:latest
RUN chown -R mysql:root /var/lib/mysql/

COPY ./project_vacations.sql /docker-entrypoint-initdb.d/./project_vacations.sql
