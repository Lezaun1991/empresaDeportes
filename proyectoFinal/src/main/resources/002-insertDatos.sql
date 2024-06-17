INSERT INTO proveedor (nombre, ciudad, pais, telefono, email) VALUES
                                                                  ('Nike', 'Estambul', 'Turquia', '854-25-35-64', 'nikeFactory@gmail.com'),
                                                                  ('Adidas', 'Herzogenaurach', 'Alemania', '852-14-23-56', 'adidasHQ@gmail.com'),
                                                                  ('Puma', 'Herzogenaurach', 'Alemania', '832-15-24-58', 'pumaOffice@gmail.com'),
                                                                  ('Under Armour', 'Baltimore', 'Estados Unidos', '865-35-45-62', 'underArmourHQ@gmail.com'),
                                                                  ('New Balance', 'Boston', 'Estados Unidos', '877-24-36-54', 'newBalanceOffice@gmail.com'),
                                                                  ('Reebok', 'Boston', 'Estados Unidos', '869-23-35-68', 'reebokHQ@gmail.com'),
                                                                  ('Fila', 'Seúl', 'Corea del Sur', '866-45-67-32', 'filaKorea@gmail.com'),
                                                                  ('Asics', 'Kobe', 'Japón', '852-45-35-64', 'asicsJapan@gmail.com'),
                                                                  ('Umbro', 'Manchester', 'Reino Unido', '844-35-24-62', 'umbroUK@gmail.com'),
                                                                  ('Converse', 'Boston', 'Estados Unidos', '833-24-45-68', 'converseHQ@gmail.com'),
                                                                  ('Vans', 'Costa Mesa', 'Estados Unidos', '855-23-35-64', 'vansHQ@gmail.com'),
                                                                  ('Skechers', 'Manhattan Beach', 'Estados Unidos', '876-25-36-58', 'skechersHQ@gmail.com'),
                                                                  ('Asics Tiger', 'Kobe', 'Japón', '831-14-45-69', 'asicsTigerJapan@gmail.com'),
                                                                  ('Fila Disruptor', 'Seúl', 'Corea del Sur', '864-14-25-63', 'filaDisruptorKorea@gmail.com'),
                                                                  ('Champion', 'Rochester', 'Estados Unidos', '878-26-37-59', 'championHQ@gmail.com'),
                                                                  ('Decathlon', 'Lille', 'Francia', '+33 3 20 33 32 52', 'contact@decathlon.com'),
                                                                  ('Oakley', 'Foothill Ranch', 'Estados Unidos', '800-403-7449', 'info@oakley.com');


INSERT INTO categoria (nombre, descripcion)
VALUES
    ('Zapatillas','Zapatillas de deporte para correr, caminar o entrenar con comodidad y estilo.'),
    ('Ropa deportiva','¡Viste con estilo mientras te mantienes activo! Encuentra camisetas, pantalones, chaquetas y más para tus actividades deportivas favoritas.'),
    ('Deportes con balon','Todo lo que necesitas para jugar al fútbol, baloncesto, voleibol y otros deportes de equipo con pasión y rendimiento.'),
    ('Equipamiento de Gimnasio','Equipos y accesorios para tu gimnasio en casa o en el centro de fitness. Desde pesas hasta máquinas cardiovasculares, tenemos todo para tu rutina de entrenamiento.'),
    ('Yoga','Encuentra esterillas, ropa cómoda y accesorios para practicar yoga y alcanzar la armonía cuerpo-mente que buscas.');


INSERT INTO producto (nombre, descripcion, cantidad, precio, Categoria_ID, Proveedor_ID, imagen_producto)
VALUES
    ('Nike Air Force 1', 'Un ícono de estilo urbano desde 1982. Su diseño atemporal y su comodidad incomparable las convierten en la elección perfecta para destacar en cualquier ocasión. ¡Eleva tu estilo con las legendarias Air Force 1 de Nike!', 5, 149.99, 1, 1, '/img/NikeAirForce1.jpg'),
    ('Adidas UltraBoost', 'La combinación perfecta de comodidad y rendimiento. Las Adidas UltraBoost ofrecen una amortiguación superior y un ajuste preciso para maximizar tu carrera.', 15, 159.99, 1, 2, '/img/AdidasUltraBoost.jpg'),
    ('Puma Ignite', 'Diseñadas para dominar las calles. Las Puma Ignite ofrecen un retorno de energía sin igual y un estilo vanguardista que no pasa desapercibido.', 12, 119.99, 1, 3, '/img/PumaIgnite.jpg'),
    ('Asics Gel-Kayano', 'La opción definitiva para corredores de larga distancia. Las Asics Gel-Kayano ofrecen estabilidad y amortiguación de primer nivel para mantener tus pies frescos y cómodos.', 18, 169.99, 1, 8, '/img/AsicsGel-Kayano.jpg'),
    ('Converse Chuck Taylor All Star', 'Un clásico reinventado para la vida moderna. Las Converse Chuck Taylor All Star combinan estilo atemporal con comodidad duradera para llevar tu look al siguiente nivel.', 22, 89.99, 1, 10, '/img/ConverseChuckTaylorAllStar.jpg'),
    ('Nike Tech Fleece', 'La combinación perfecta de estilo y funcionalidad. El Nike Tech Fleece te mantiene abrigado y cómodo durante tus entrenamientos, sin sacrificar el estilo urbano.', 30, 79.99, 2, 1, '/img/NikeTechFleece.jpg'),
    ('Adidas Soccer Ball', 'El compañero perfecto para tus partidos de fútbol. El balón de fútbol Adidas ofrece un rendimiento superior y una durabilidad excepcional en cada juego.', 25, 29.99, 3, 2, '/img/AdidasSoccerBall.jpg'),
    ('Puma Running Watch', 'Tu compañero de entrenamiento definitivo. El reloj deportivo Puma te ofrece seguimiento preciso de tus actividades deportivas y un diseño elegante para lucir en cualquier ocasión.', 18, 99.99, 4, 3, '/img/PumaRunningWatch.jpg'),
    ('Asics Running Backpack', 'El aliado perfecto para tus carreras largas. La mochila de running Asics ofrece almacenamiento seguro para tus pertenencias y un ajuste cómodo para llevarte más lejos.', 20, 49.99, 4, 5, '/img/AsicsRunningBackPack.jpg'),
    ('Converse Sport Socks', 'El complemento perfecto para tus actividades deportivas. Los calcetines deportivos Converse ofrecen comodidad y sujeción durante todo el día, para que puedas rendir al máximo.', 35, 14.99, 2, 4, '/img/ConverseSportSocks.jpg'),
    ('Under Armour HeatGear', 'Diseñado para mantenerte fresco y seco durante tus entrenamientos más intensos. La tecnología HeatGear de Under Armour proporciona una transpirabilidad excepcional y un ajuste cómodo.', 55, 69.99, 2, 6, '/img/UnderArmourHeatGear.jpg'),
    ('Reebok Nano X', 'La opción definitiva para el entrenamiento funcional. Los Reebok Nano X ofrecen estabilidad, agarre y durabilidad para enfrentar cualquier desafío en el gimnasio.', 20, 139.99, 1, 5, '/img/ReebokNanoX.jpg'),
    ('New Balance Resistance Bands', 'Aumenta tu fuerza y resistencia con las bandas de resistencia New Balance. Perfectas para entrenamientos en casa o en el gimnasio, te ayudarán a alcanzar tus objetivos fitness.', 30, 24.99, 4, 4, '/img/NewBalanceResistanceBands.jpg'),
    ('Skechers Trail Jacket', 'Domina los senderos con la chaqueta Skechers Trail. Resistente al agua y al viento, te mantendrá protegido y cómodo en tus aventuras al aire libre.', 15, 179.99, 2, 17, '/img/SkechersTrailJacket.jpg'),
    ('Champion Speedcross', 'Supera cualquier terreno con las zapatillas Champion Speedcross. Su diseño ligero y suela adherente te ofrecen un rendimiento óptimo en trail running y senderismo.', 18, 159.99, 1, 15, '/img/ChampionSpeedcross.jpg'),
    ('Umbro Tennis Racket', 'Potencia tu juego con la raqueta de tenis Umbro. Diseñada para ofrecer control y precisión, te ayudará a alcanzar tu máximo rendimiento en la cancha.', 22, 199.99, 3, 9, '/img/UmbroTennisRacket.jpg'),
    ('The FilaDisruptor Hiking Pants', 'Prepárate para la aventura con los pantalones de senderismo The FilaDisruptor. Resistentes, cómodos y versátiles, son ideales para explorar la naturaleza.', 20, 129.99, 2, 14, '/img/TheFilaDisruptorHikingPants.jpg'),
    ('Asics-Tiger Fitness Tracker', 'Alcanza tus metas fitness con el tracker de actividad Asics-tiger. Con seguimiento preciso y funciones avanzadas, te ayuda a monitorear tu progreso y mejorar tu rendimiento.', 18, 149.99, 4, 13, '/img/Asics-TigerFitnessTracker.jpg'),
    ('Oakley Sport Sunglasses', 'Maximiza tu visión y protección con las gafas deportivas Oakley. Diseñadas para el rendimiento, te ofrecen claridad óptica y resistencia a los impactos en cualquier actividad.', 25, 129.99, 2, 17, '/img/OakleySportSunglasses.jpg'),
    ('Decathlon Yoga Mat', 'Mejora tu práctica de yoga con la esterilla de yoga Decathlon. Confortable y antideslizante, te ofrece estabilidad y comodidad durante tus sesiones de ejercicio.', 30, 29.99, 5, 16, '/img/DecathlonYogaMat.jpg');

INSERT INTO cliente (username,nombre,primer_apellido,segundo_apellido, password,email, telefono)
VALUES
    ('Lezaun91','Víctor','Alarcón','Lezaun','$2a$10$e0bsQDDJjH0aO7bHrcLYMehS9U50TTxfXcZ1IG8hr0PDdiV/Mfcga','victoralarconlezaun@gmail.com', '616468697'),
    ('Jefazo91','Víctor','Alarcón','Lezaun','$2a$10$e0bsQDDJjH0aO7bHrcLYMehS9U50TTxfXcZ1IG8hr0PDdiV/Mfcga','empresadeportes1991@gmail.com', '622313245');

INSERT INTO direccion (tipo_via,domicilio,ciudad,codigo_postal,numero,piso,pais,cliente_id, activo,administrador)
VALUES
    ('Calle','Ignacio Ellacuria','Madrid','28017','6','1ºE','España',1, true,false),
    ('Calle','Marques de corbera','Madrid','28017','27','Bajo B','España',2, true,true);

INSERT INTO roles (nombre)
VALUES
    ('ROLE_USER'),
    ('ROLE_ADMIN');

INSERT INTO cliente_rol (cliente_id, rol_id)
VALUES
    ('1','1'),
    ('2','2');
INSERT INTO pedido_cliente (fecha_pedido, fecha_envio, Cliente_ID, direccion_id, total, estado_pedido)
VALUES
    ('2024-06-11', '2024-06-14', 1, 1, 345.00, 'REALIZADO'),
    ('2024-06-11', '2024-06-13', 1, 1, 345.00, 'ENVIADO');

INSERT INTO pedido_proveedor (fecha_pedido, fecha_envio, Proveedor_ID, direccion_id, total, estado_pedido)
VALUES
    ('2024-03-11', '2024-03-14', 1, 2, 5 * 149.99 + 30 * 79.99, 'ENTREGADO'),
    ('2024-03-11', '2024-03-14', 2, 2, 15 * 159.99 + 25 * 29.99, 'ENTREGADO'),
    ('2024-03-11', '2024-03-14', 3, 2, 12 * 119.99 + 18 * 99.99, 'ENTREGADO'),
    ('2024-03-11', '2024-03-14', 8, 2, 18 * 169.99, 'ENTREGADO'),
    ('2024-03-11', '2024-03-14', 10, 2, 22 * 89.99, 'ENTREGADO'),
    ('2024-03-11', '2024-03-14', 5, 2, 20 * 139.99 + 20 * 49.99, 'ENTREGADO'),
    ('2024-03-11', '2024-03-14', 4, 2, 30 * 24.99 + 35 * 14.99, 'ENTREGADO'),
    ('2024-03-11', '2024-03-14', 17, 2, 15 * 179.99 + 25 * 129.99, 'ENTREGADO'),
    ('2024-03-11', '2024-03-14', 15, 2, 18 * 159.99, 'ENTREGADO'),
    ('2024-03-11', '2024-03-14', 9, 2, 22 * 199.99, 'ENTREGADO'),
    ('2024-03-11', '2024-03-14', 14, 2, 20 * 129.99, 'ENTREGADO'),
    ('2024-03-11', '2024-03-14', 13, 2, 18 * 149.99, 'ENTREGADO'),
    ('2024-03-11', '2024-03-14', 16, 2, 30 * 29.99, 'ENTREGADO'),
    ('2024-03-11', '2024-03-14', 6, 2, 25 * 69.99, 'ENTREGADO');


INSERT INTO producto_pedido_cliente (pedido_cliente_id,producto_id, cantidad,precio_unitario)
VALUES
    (1, 1, 5, 345.00),
    (2, 2, 3, 345.00);
INSERT INTO producto_pedido_proveedor (pedido_proveedor_id,producto_id, cantidad,precio_unitario)
VALUES
    (1, 1, 5,149.99), -- Nike Air Force 1
    (1, 6, 30,79.99), -- Nike Tech Fleece
    (2, 2, 15,159.99), -- Adidas UltraBoost
    (2, 7, 25,29.99), -- Adidas Soccer Ball
    (3, 3, 12,119.99), -- Puma Ignite
    (3, 8, 18,99.99), -- Puma Running Watch
    (4, 4, 18,169.99), -- Asics Gel-Kayano
    (5, 5, 22,89.99), -- Converse Chuck Taylor All Star
    (6, 12, 20,139.99),
    (6, 9, 20,49.99),-- Reebok Nano X
    (7, 13, 30,24.99), -- New Balance Resistance Bands
    (7, 10, 35,14.99), -- Converse Sport Socks
    (8, 14, 15,179.99), -- Skechers Trail Jacket
    (8, 19, 25,129.99), -- Oakley Sport Sunglasses
    (9, 15, 18,159.99), -- Champion Speedcross
    (10, 16, 22,199.99), -- Umbro Tennis Racket
    (11, 17, 20, 129.99), -- The FilaDisruptor Hiking Pants
    (12, 18, 18,149.99), -- Asics-Tiger Fitness Tracker
    (13, 20, 30,29.99), -- Decathlon Yoga Mat
    (14, 11, 25,69.99); -- Decathlon Yoga Mat
INSERT INTO tarjeta (nombre_completo_titular,numero_tarjeta, fecha_expiracion,numero_secreto,cliente_id)
VALUES
    ('Víctor Alarcón Lezaun','4112344432321239','02/29','652',1);
