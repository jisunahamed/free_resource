@echo off
set "DATABASE_URL=postgres://postgres:postgres@localhost:51214/template1?sslmode=disable&connection_limit=5&connect_timeout=0&max_idle_connection_lifetime=0&pool_timeout=0&single_use_connections=true&socket_timeout=0"
call npx prisma migrate dev --name init_core_domain
