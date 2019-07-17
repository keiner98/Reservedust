-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-05-2019 a las 23:21:53
-- Versión del servidor: 10.1.35-MariaDB
-- Versión de PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `motel`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_motel`
--

CREATE TABLE `estado_motel` (
  `idestado` int(2) NOT NULL,
  `estado` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estado_motel`
--

INSERT INTO `estado_motel` (`idestado`, `estado`) VALUES
(1, 'ABIERTO'),
(2, 'CERRADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_reserva`
--

CREATE TABLE `estado_reserva` (
  `idestado` int(3) NOT NULL,
  `estado` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estado_reserva`
--

INSERT INTO `estado_reserva` (`idestado`, `estado`) VALUES
(1, 'Disponible'),
(2, 'Reservado'),
(3, 'Ocupado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` (
  `idhabitacion` int(11) NOT NULL,
  `tipoHab` int(11) DEFAULT NULL,
  `nombreHab` varchar(45) DEFAULT NULL,
  `cantidadHab` int(11) DEFAULT NULL,
  `estadoHab` int(11) DEFAULT NULL,
  `precioHab` int(11) DEFAULT NULL,
  `idmotel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imghab`
--

CREATE TABLE `imghab` (
  `idimgHab` int(11) NOT NULL,
  `imagen` blob,
  `idhabitacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `motel`
--

CREATE TABLE `motel` (
  `idmotel` int(11) NOT NULL,
  `nombreMotel` varchar(45) DEFAULT NULL,
  `direccionMotel` varchar(45) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `estado` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promociones`
--

CREATE TABLE `promociones` (
  `idprom` int(11) NOT NULL,
  `promocion` int(11) DEFAULT NULL,
  `fecha_ini` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `idreserva` int(11) NOT NULL,
  `estado` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `idhabitacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `idservicios` int(11) NOT NULL,
  `nombre_serv` varchar(45) NOT NULL,
  `precio_serv` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_motel`
--

CREATE TABLE `servicios_motel` (
  `idservicios` int(11) NOT NULL,
  `idmotel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estado_motel`
--
ALTER TABLE `estado_motel`
  ADD PRIMARY KEY (`idestado`);

--
-- Indices de la tabla `estado_reserva`
--
ALTER TABLE `estado_reserva`
  ADD PRIMARY KEY (`idestado`);

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`idhabitacion`,`idmotel`),
  ADD KEY `fk_habitacion_motel1_idx` (`idmotel`),
  ADD KEY `fk_habitacion_promociones1_idx` (`tipoHab`);

--
-- Indices de la tabla `imghab`
--
ALTER TABLE `imghab`
  ADD PRIMARY KEY (`idimgHab`,`idhabitacion`),
  ADD KEY `fk_imgHab_habitacion_idx` (`idhabitacion`);

--
-- Indices de la tabla `motel`
--
ALTER TABLE `motel`
  ADD PRIMARY KEY (`idmotel`),
  ADD KEY `estado` (`estado`);

--
-- Indices de la tabla `promociones`
--
ALTER TABLE `promociones`
  ADD PRIMARY KEY (`idprom`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`idreserva`),
  ADD KEY `idhabitacion` (`idhabitacion`),
  ADD KEY `estado` (`estado`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`idservicios`);

--
-- Indices de la tabla `servicios_motel`
--
ALTER TABLE `servicios_motel`
  ADD PRIMARY KEY (`idservicios`,`idmotel`),
  ADD KEY `fk_servicios_has_motel_motel1_idx` (`idmotel`),
  ADD KEY `fk_servicios_has_motel_servicios1_idx` (`idservicios`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estado_motel`
--
ALTER TABLE `estado_motel`
  MODIFY `idestado` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estado_reserva`
--
ALTER TABLE `estado_reserva`
  MODIFY `idestado` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `idhabitacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `imghab`
--
ALTER TABLE `imghab`
  MODIFY `idimgHab` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `motel`
--
ALTER TABLE `motel`
  MODIFY `idmotel` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `promociones`
--
ALTER TABLE `promociones`
  MODIFY `idprom` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `idreserva` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `idservicios` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD CONSTRAINT `habitacion_ibfk_1` FOREIGN KEY (`idmotel`) REFERENCES `motel` (`idmotel`),
  ADD CONSTRAINT `habitacion_ibfk_2` FOREIGN KEY (`tipoHab`) REFERENCES `promociones` (`idprom`);

--
-- Filtros para la tabla `imghab`
--
ALTER TABLE `imghab`
  ADD CONSTRAINT `imghab_ibfk_1` FOREIGN KEY (`idhabitacion`) REFERENCES `habitacion` (`idhabitacion`);

--
-- Filtros para la tabla `motel`
--
ALTER TABLE `motel`
  ADD CONSTRAINT `motel_ibfk_1` FOREIGN KEY (`estado`) REFERENCES `estado_motel` (`idestado`);

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`idhabitacion`) REFERENCES `habitacion` (`idhabitacion`),
  ADD CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`estado`) REFERENCES `estado_reserva` (`idestado`);

--
-- Filtros para la tabla `servicios_motel`
--
ALTER TABLE `servicios_motel`
  ADD CONSTRAINT `servicios_motel_ibfk_1` FOREIGN KEY (`idservicios`) REFERENCES `servicios` (`idservicios`),
  ADD CONSTRAINT `servicios_motel_ibfk_2` FOREIGN KEY (`idmotel`) REFERENCES `motel` (`idmotel`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
