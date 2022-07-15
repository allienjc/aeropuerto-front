-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.1.38-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para aeropuerto
CREATE DATABASE IF NOT EXISTS `aeropuerto` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `aeropuerto`;

-- Volcando estructura para tabla aeropuerto.coladeturnos
CREATE TABLE IF NOT EXISTS `coladeturnos` (
  `id_turno` int(11) NOT NULL AUTO_INCREMENT,
  `turno` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `nombre_modulo` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `estatus` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_turno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla aeropuerto.coladeturnos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `coladeturnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `coladeturnos` ENABLE KEYS */;

-- Volcando estructura para tabla aeropuerto.modulos
CREATE TABLE IF NOT EXISTS `modulos` (
  `id_modulo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_modulo` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password_modulo` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `estatus_modulo` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_modulo`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla aeropuerto.modulos: ~9 rows (aproximadamente)
/*!40000 ALTER TABLE `modulos` DISABLE KEYS */;
INSERT INTO `modulos` (`id_modulo`, `nombre_modulo`, `password_modulo`, `estatus_modulo`) VALUES
	(42, 'MODULO 1', 'imss', 'CERRADO'),
	(43, 'MODULO 2', 'imss', 'CERRADO'),
	(44, 'MODULO 3', 'imss', 'CERRADO'),
	(45, ' MODULO 4', 'imss', 'CERRADO'),
	(46, ' MODULO 5', 'imss', 'CERRADO'),
	(47, 'MODULO 6', 'imss', 'CERRADO'),
	(48, 'MODULO 7', 'imss', 'CERRADO'),
	(49, 'MODULO 8', 'imss', 'CERRADO'),
	(50, 'MODULO 9', 'imss', 'CERRADO');
/*!40000 ALTER TABLE `modulos` ENABLE KEYS */;

-- Volcando estructura para tabla aeropuerto.multimedia
CREATE TABLE IF NOT EXISTS `multimedia` (
  `id_multimedia` int(11) NOT NULL AUTO_INCREMENT,
  `titulo_multimedia` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_multimedia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla aeropuerto.multimedia: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `multimedia` DISABLE KEYS */;
/*!40000 ALTER TABLE `multimedia` ENABLE KEYS */;

-- Volcando estructura para tabla aeropuerto.noticias
CREATE TABLE IF NOT EXISTS `noticias` (
  `id_noticia` int(11) NOT NULL AUTO_INCREMENT,
  `noticia` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id_noticia`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla aeropuerto.noticias: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `noticias` DISABLE KEYS */;
INSERT INTO `noticias` (`id_noticia`, `noticia`, `fecha`) VALUES
	(43, 'EL SUBSECRETARIO DE PREVENCIÓN Y PROMOCIÓN DE LA SALUD, HUGO LÓPEZ-GATELL, ASEGURÓ ESTE MARTES QUE LAS EMPRESAS QUE SOLICITAN A SUS TRABAJADORES SU CERTIFICADO DE VACUNACIÓN CONTRA COVID-19 COMETEN UNA FALTA, YA QUE NO ES UN REQUISITO QUE PIDE EL GOBIERNO. ', '2021-10-21'),
	(47, 'TERCERA DOSIS DE VACUNA DE PFIZER-BIONTECH CONTRA LA COVID-19 TIENE 95.6% DE EFICACIA.     \nESTE ESTUDIO SE LLEVÓ A CABO MIENTRAS "LA VARIANTE DELTA ERA LA PRINCIPAL CEPA" CIRCULANDO DURANTE ESTE PERÍODO.', '2021-10-21');
/*!40000 ALTER TABLE `noticias` ENABLE KEYS */;

-- Volcando estructura para tabla aeropuerto.recuadroprincipal
CREATE TABLE IF NOT EXISTS `recuadroprincipal` (
  `id_turno` int(11) NOT NULL AUTO_INCREMENT,
  `turno` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `nombre_modulo` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_turno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla aeropuerto.recuadroprincipal: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `recuadroprincipal` DISABLE KEYS */;
/*!40000 ALTER TABLE `recuadroprincipal` ENABLE KEYS */;

-- Volcando estructura para tabla aeropuerto.recuadro_principal
CREATE TABLE IF NOT EXISTS `recuadro_principal` (
  `id_turno` int(11) NOT NULL AUTO_INCREMENT,
  `turno` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `nombre_modulo` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_turno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla aeropuerto.recuadro_principal: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `recuadro_principal` DISABLE KEYS */;
/*!40000 ALTER TABLE `recuadro_principal` ENABLE KEYS */;

-- Volcando estructura para tabla aeropuerto.sede
CREATE TABLE IF NOT EXISTS `sede` (
  `nombre_sede` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla aeropuerto.sede: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
INSERT INTO `sede` (`nombre_sede`) VALUES
	('HOSPITAL GENERAL DE ZONA C/ MEDICINA FAMILIAR NO. 1');
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;

-- Volcando estructura para tabla aeropuerto.tramites
CREATE TABLE IF NOT EXISTS `tramites` (
  `id_tramite` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_tramite` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `identificador_tramite` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_tramite`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla aeropuerto.tramites: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `tramites` DISABLE KEYS */;
INSERT INTO `tramites` (`id_tramite`, `nombre_tramite`, `identificador_tramite`) VALUES
	(111, 'TOMA DE SANGRE', 'A'),
	(113, 'RECOLECCION DE MUESTRA', 'B'),
	(114, 'DONACION DE SANGRE', 'C'),
	(115, 'ARCHIVO', 'D');
/*!40000 ALTER TABLE `tramites` ENABLE KEYS */;

-- Volcando estructura para tabla aeropuerto.turnos
CREATE TABLE IF NOT EXISTS `turnos` (
  `id_turno` int(11) NOT NULL AUTO_INCREMENT,
  `turno` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `id_modulo` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_tramite` int(11) NOT NULL,
  `estatus_turno` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_turno` date NOT NULL,
  `nombre` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_turno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla aeropuerto.turnos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `turnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `turnos` ENABLE KEYS */;

-- Volcando estructura para tabla aeropuerto.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password_usuario` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla aeropuerto.usuarios: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `password_usuario`) VALUES
	(1, 'ADMINISTRADOR', '123456'),
	(2, 'SUPER ADMINISTRADOR', '0913');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
