# Movie Reservation System (Backend)

Sistema backend para la gestion de reservaciones de peliculas, diseñado para manejar ususarios, funciones, asientos y disponibilidad en tiempo real


## Descripcion
ESte proyecto implementa una API REST que permite a los usuarios consultar peliculas disponibles, visualizar funciones y realizar reservaciones de asientos.

El sistema esta enfocado en la logica de negocio backend, incluyendo validacion de disponibilidad, control de concurrencia y gestion de datos.

## Tecnologias

- Node.js / Express
- Base de datos (MySQL)
- JWT
- REST API

## Funcionalidades

- Registro y autenticacion de usuarios
- Consultar peliculas disponibles
- Visualizacion de funciones por horario
- Seleccion de asientos
- Creacion de reservaciones
- Prevencion de doble reservacion
- Autorizacion para acciones de administrador

## Instalacion

1. Clonar repositorio

git clone https://github.com/EraclesCampos/Movie-Reservation-System.git

2. Instalar dependencias

    - cd app
    - cd backend
    - npm install

3. Configurar variables de entorno

JWT_SECRET = secret
JWT_EXPIRES_IN = 7d
JWT_COOKIE_EXPIRES = 1

4. Crear base de datos

Copiar el codigo del archivo ./app/backend/src/database/satabase.sql

5. Ejecutar servidor

- npm run dev

6. Ejecutar frontend (basico)

    1. Instalar dependencias 

        - cd ./app/frontend
        - npm install

    2. Ejecutar 

        - npm run dev 

## Aprendizajes

- Diseño de APIs REST
- MAnejo de relaciones de base de datos y transacciones
- Validacion de logica de negocio backend
- Manejo de autenticacion con JWT y cookies
- Organizacion de proyecto escalable

## Autor

- GitHub: https://github.com/EraclesCampos