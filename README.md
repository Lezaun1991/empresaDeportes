# Sports Goods Sales Company

Este repositorio contiene el proyecto de creación de una empresa dedicada a la venta de objetos deportivos. El proyecto está compuesto por un backend desarrollado en Java 17 utilizando Spring Boot, y un frontend construido con React, utilizando Node.js versión 20.13.1.

## Descripción del Proyecto

El objetivo de este proyecto es desarrollar una plataforma integral para la venta de artículos deportivos, caracterizada por funcionalidades avanzadas que mejoran la experiencia tanto de los administradores como de los clientes.

### Backend

El backend de este proyecto está desarrollado en Java 17 con el framework Spring Boot. Se encarga de gestionar la lógica del negocio, las transacciones y la seguridad de la aplicación. Entre sus principales características se incluyen:

- **Seguridad con JWT**: La autenticación y autorización de usuarios se maneja mediante JSON Web Tokens (JWT), garantizando una gestión segura y eficiente de las sesiones de usuario.
- **Operaciones CRUD**: Se permite realizar todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los diferentes recursos de la aplicación, tales como productos, usuarios, y pedidos.
- **Descuentos Dinámicos**: La aplicación de descuentos se realiza en función del tiempo y la cantidad de stock disponible, ofreciendo una estrategia de precios dinámica y atractiva para los clientes.
- **Pedidos Automatizados**: Los pedidos se gestionan de manera automatizada, mejorando la eficiencia en el procesamiento y seguimiento de los mismos.
- **Cambios de Estado Automatizados**: Los estados de envío de los pedidos se actualizan automáticamente, proporcionando una gestión fluida y precisa de la logística.

### Frontend

El frontend está desarrollado en React, utilizando Node.js versión 20.13.1. Este componente se encarga de proporcionar una interfaz de usuario intuitiva y amigable. Entre sus principales características se incluyen:

- **Interfaz de Usuario Responsiva**: Diseñada para ofrecer una experiencia de usuario óptima en dispositivos de escritorio y móviles.
- **Integración con el Backend**: Comunicación eficiente con el backend para la gestión de datos y operaciones.
- **Seguridad y Autenticación**: Integración con el sistema de seguridad basado en JWT implementado en el backend.

## Requisitos

Para ejecutar este proyecto, asegúrate de tener instalados los siguientes componentes:

- **Docker**
- **Docker Compose**

## Instalación y Ejecución

### Configuración de Docker

Este proyecto incluye tres Dockerfile para crear imágenes de Docker: dos para el backend (Spring Boot y MySQL) y uno para el frontend (React).

### Crear las Imágenes de Docker
Para crear las imagenes de docker tienes que ir a la localizacion de cada una y realizar lo siguiente:

Para el de spring boot recuerda crear el jar y ponerle la ruta para copiar correcta en el dockerfile y luego ejecutas
```
docker build -t java-app-image .
```
Para el de Mysql:
```
docker build -t mysql-app-image .
```
Para el de react:

```
docker build -t react-app-image .
```
Luego una vez que tienes todas las imagenes creadas, ejecutas el docker-compose:

```
version: '3.8'

services:
  java-app:
    image: java-app-image
    ports:
      - "9010:9010"
    depends_on:
      - mysql_database
    container_name: java_app
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql_database:3306/proyectodefinitivo
      SPRING_DATASOURCE_USERNAME: victor
      SPRING_DATASOURCE_PASSWORD: victor
      
  mysql_database:
    image: mysql-app-image
    environment:
      MYSQL_ROOT_PASSWORD: victor
      MYSQL_DATABASE: proyectodefinitivo
      MYSQL_USER: victor
      MYSQL_PASSWORD: victor
    ports:
      - "3307:3306"
    container_name: mysql_database

  react-app:
    image: react-app-image
    ports:
      - "80:80"
    container_name: react_app

```
Para ejecutarlo ve a la localizacion del docker-compose y haces este comando: 

```
docker-compose up
```


1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

