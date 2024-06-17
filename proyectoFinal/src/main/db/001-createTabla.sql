CREATE TABLE IF NOT EXISTS categoria (
                                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                         nombre VARCHAR(255) NOT NULL UNIQUE,
                                         descripcion VARCHAR(255)

    );





CREATE TABLE IF NOT EXISTS proveedor (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           nombre VARCHAR(255) NOT NULL UNIQUE,
                           ciudad VARCHAR(255),
                           pais VARCHAR(255),
                           telefono VARCHAR(20),
                           email VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS producto (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          nombre VARCHAR(255) NOT NULL UNIQUE,
                          descripcion VARCHAR (255),
                          cantidad INTEGER,
                          precio DOUBLE,
                          imagen_producto VARCHAR (255),
                          descuento BOOLEAN,
                          Proveedor_ID BIGINT,
                          Categoria_ID BIGINT,
                          FOREIGN KEY (Proveedor_ID) REFERENCES proveedor(id),
                          FOREIGN KEY (Categoria_ID) REFERENCES categoria(id)
);
CREATE TABLE IF NOT EXISTS cliente (
                                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                       username VARCHAR(255) NOT NULL UNIQUE,
                                       nombre VARCHAR(255) NOT NULL ,
                                       primer_apellido VARCHAR(255) NOT NULL,
                                       segundo_apellido VARCHAR(255) NOT NULL ,
                                       password VARCHAR (255) NOT NULL,
                                       email VARCHAR(255) NOT NULL UNIQUE,
                                       telefono VARCHAR (25)
    );

CREATE TABLE IF NOT EXISTS direccion (
                                         id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                         tipo_via VARCHAR (255),
                                        ciudad VARCHAR (255),
                                        domicilio VARCHAR (255),
                                        piso VARCHAR (255),
                                        numero VARCHAR (255),
                                        pais VARCHAR (255),
                                        codigo_postal VARCHAR (255),
                                        activo BOOLEAN,
                                        administrador BOOLEAN,
                                        cliente_id BIGINT NOT NULL,
                                        FOREIGN KEY (cliente_id) REFERENCES cliente(id),
                                        UNIQUE (tipo_via(100),ciudad(100), domicilio(100), piso(100), numero(100), pais(100), codigo_postal(100), cliente_id)


    );

CREATE TABLE IF NOT EXISTS pedido_cliente (
                                              id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                              fecha_pedido DATE NOT NULL,
                                              fecha_envio DATE NOT NULL,
                                              Cliente_ID BIGINT NOT NULL,
                                              direccion_id BIGINT NOT NULL,
                                              total DECIMAL(10, 2) NOT NULL,
                                              estado_pedido ENUM('REALIZADO', 'ENVIADO', 'ENTREGADO') NOT NULL,
                                              FOREIGN KEY (Cliente_ID) REFERENCES cliente(id),
                                               FOREIGN KEY (direccion_id) REFERENCES direccion(id)
    );

CREATE TABLE IF NOT EXISTS pedido_proveedor (
                                                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                                fecha_pedido DATE NOT NULL,
                                                fecha_envio DATE NOT NULL,
                                                Proveedor_ID BIGINT NOT NULL,
                                                direccion_id BIGINT NOT NULL,
                                                total DECIMAL(10, 2) NOT NULL,
                                                estado_pedido ENUM('REALIZADO', 'ENVIADO', 'ENTREGADO') NOT NULL,
                                                FOREIGN KEY (Proveedor_ID) REFERENCES proveedor(id),
                                                FOREIGN KEY (direccion_id) REFERENCES direccion(id)
    );





CREATE TABLE IF NOT EXISTS roles (
                                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                      nombre VARCHAR (255) NOT NULL UNIQUE
    );

CREATE TABLE IF NOT EXISTS tarjeta (
                                     id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                     numero_tarjeta VARCHAR (255) NOT NULL,
                                     fecha_expiracion VARCHAR (255) NOT NULL,
                                     numero_secreto VARCHAR (255) NOT NULL,
                                     cliente_id BIGINT NOT NULL,
                                    nombre_completo_titular VARCHAR (255),
                                    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
    );










CREATE TABLE IF NOT EXISTS producto_pedido_cliente (
                                                       producto_id BIGINT,
                                                       pedido_cliente_id BIGINT,
                                                       cantidad INTEGER,
                                                       precio_unitario DOUBLE,
                                                       PRIMARY KEY (producto_id, pedido_cliente_id),
                                                       FOREIGN KEY (producto_id) REFERENCES producto(id),
                                                       FOREIGN KEY (pedido_cliente_id) REFERENCES pedido_cliente(id)
    );

CREATE TABLE IF NOT EXISTS producto_pedido_proveedor (
                                                         producto_id BIGINT,
                                                         pedido_proveedor_id BIGINT,
                                                         cantidad INTEGER,
                                                         precio_unitario DOUBLE,
                                                         PRIMARY KEY (producto_id, pedido_proveedor_id),
                                                         FOREIGN KEY (producto_id) REFERENCES producto(id),
                                                         FOREIGN KEY (pedido_proveedor_id) REFERENCES pedido_proveedor(id)
    );


CREATE TABLE IF NOT EXISTS cliente_rol (
                                                 cliente_id BIGINT,
                                                 rol_id BIGINT,
                                                 PRIMARY KEY (cliente_id, rol_id),
                                                FOREIGN KEY (cliente_id) REFERENCES cliente(id),
                                                FOREIGN KEY (rol_id) REFERENCES roles(id)
    );

