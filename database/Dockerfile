FROM mysql:latest
RUN chown -R mysql:root /var/lib/mysql/
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
COPY ./project_vacations.sql /docker-entrypoint-initdb.d/./project_vacations.sql
