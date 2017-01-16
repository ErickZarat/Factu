-- MySQL dump 10.13  Distrib 5.7.13, for linux-glibc2.5 (x86_64)
--
-- Host: sql9.freemysqlhosting.net    Database: sql9153276
-- ------------------------------------------------------
-- Server version	5.5.50-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `caja_chica`
--

DROP TABLE IF EXISTS `caja_chica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `caja_chica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `desc` varchar(100) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `gasto` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caja_chica`
--

LOCK TABLES `caja_chica` WRITE;
/*!40000 ALTER TABLE `caja_chica` DISABLE KEYS */;
INSERT INTO `caja_chica` VALUES (1,'Gasto de agua','2017-01-06',200.6),(2,'gasto de luz','2017-01-01',500),(4,'Gasto de Comida','2017-01-08',40),(5,'gasto de uniformes','2017-01-08',200),(6,'gasto de material','2017-01-08',50),(7,'Gasto de limpieza','2017-01-08',100);
/*!40000 ALTER TABLE `caja_chica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nit` varchar(15) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `estado` int(10) unsigned DEFAULT NULL,
  `agregado` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'817281-k','Mario Godoy','77889900','Ciudad',1,'2017-01-04'),(2,'443342','Jorge Carranza','2342342234','Ciudad',1,'2017-01-07'),(3,'423423423','Carlos Martinez','878797','Guatemala',2,'2017-01-07'),(4,'3423423','Maria Gonzalez','9089898089','Guatemala',1,'2017-01-07'),(5,'123123123','Orlando Cuevas','98978','Mixco',2,'2017-01-07'),(7,'8938201','Ximena Herrarte','9390320','Xela',2,'2017-01-07'),(8,'po','po','po','po',1,'2017-01-09'),(9,'m','m','m','m',1,'2017-01-09'),(10,'k','k','k','k',2,'2017-01-10'),(11,'h','h','h','h',2,'2017-01-10'),(12,'654897-2','Cliente Prueba 1','55554444','Guatemala Ciudad',2,'2017-01-12');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuracion`
--

DROP TABLE IF EXISTS `configuracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configuracion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `iva` double DEFAULT NULL,
  `moneda` varchar(1) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `codpostal` int(11) DEFAULT NULL,
  `img` mediumtext CHARACTER SET ascii,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracion`
--

LOCK TABLES `configuracion` WRITE;
/*!40000 ALTER TABLE `configuracion` DISABLE KEYS */;
INSERT INTO `configuracion` VALUES (1,'nombre 1','2332323232','correo@correo.com',12,'Q','Guatemala','Guatemala','Guatemala',10011,'');
/*!40000 ALTER TABLE `configuracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `desc` varchar(45) DEFAULT NULL,
  `cat` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'Activo','ACT'),(2,'Inactivo','ACT'),(3,'Pagado','FAC'),(4,'No Pagado','FAC');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `factura` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `cliente` int(10) DEFAULT NULL,
  `vendedor` int(10) unsigned DEFAULT NULL,
  `estado` int(10) unsigned DEFAULT NULL,
  `total` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_factura_1_idx` (`vendedor`),
  KEY `fk_factura_2_idx` (`cliente`),
  KEY `fk_factura_3_idx` (`estado`),
  CONSTRAINT `fk_factura_1` FOREIGN KEY (`vendedor`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_factura_2` FOREIGN KEY (`cliente`) REFERENCES `cliente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_factura_3` FOREIGN KEY (`estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES (1,'2017-01-06',1,1,3,500),(4,'2017-01-08',2,2,3,1111),(5,'2017-01-10',2,1,3,88.36800000000001),(6,'2017-01-10',5,1,3,69.216),(7,'2017-01-10',9,1,3,616),(8,'2017-01-10',8,1,3,1403.416),(9,'2017-01-10',8,1,3,1463.784),(10,'2017-01-10',10,1,3,317.40799999999996),(11,'2017-01-10',3,1,3,159.04),(12,'2017-01-10',2,1,3,157.58399999999997),(13,'2017-01-10',2,1,3,207.648),(14,'2017-01-10',11,1,3,276.86400000000003),(15,'2017-01-10',3,1,3,138.432),(20,'2017-01-12',12,1,3,224),(21,'2017-01-12',12,1,3,224),(22,'2017-01-12',12,1,3,227.58399999999997),(23,'2017-01-12',1,1,3,1456.5040000000001),(24,'2017-01-12',1,1,3,1456.5040000000001),(25,'2017-01-12',4,1,3,280),(26,'2017-01-12',9,1,3,280),(27,'2017-01-12',9,1,3,280),(28,'2017-01-12',7,1,3,227.58399999999997),(29,'2017-01-12',1,1,3,39.76),(30,'2017-01-14',2,1,3,4311.83),(31,'2017-01-14',2,1,3,13736.24),(32,'2017-01-14',4,1,3,2768.53);
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prod_fact`
--

DROP TABLE IF EXISTS `prod_fact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prod_fact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prod` int(10) unsigned NOT NULL,
  `fact` int(10) unsigned NOT NULL,
  `cant` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prod` (`prod`),
  KEY `fact` (`fact`),
  CONSTRAINT `prod_fact_ibfk_2` FOREIGN KEY (`fact`) REFERENCES `factura` (`id`) ON DELETE CASCADE,
  CONSTRAINT `prod_fact_ibfk_1` FOREIGN KEY (`prod`) REFERENCES `producto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prod_fact`
--

LOCK TABLES `prod_fact` WRITE;
/*!40000 ALTER TABLE `prod_fact` DISABLE KEYS */;
INSERT INTO `prod_fact` VALUES (1,3,15,1),(2,1,15,1),(3,3,15,1),(4,1,15,1),(9,8,20,1),(10,8,21,1),(11,5,22,1),(12,3,22,2),(13,4,23,1),(14,6,23,2),(15,6,24,2),(16,4,24,1),(17,6,25,5),(18,6,26,5),(19,6,27,5),(20,3,28,2),(21,5,28,1),(22,1,29,1),(23,1,30,1),(24,4,30,1),(25,4,30,1),(26,1,30,1),(27,4,30,1),(28,1,30,1),(29,1,30,1),(30,1,30,1),(31,1,30,1),(32,1,30,1),(33,1,32,1),(34,4,32,1),(35,1,32,1),(36,4,32,1);
/*!40000 ALTER TABLE `prod_fact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cod` varchar(15) NOT NULL,
  `producto` varchar(100) DEFAULT NULL,
  `estado` int(10) unsigned DEFAULT NULL,
  `agregado` date DEFAULT NULL,
  `precio` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_productos_1_idx` (`estado`),
  CONSTRAINT `fk_productos_1` FOREIGN KEY (`estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'AKI','Vitamina B',1,'2017-01-05',35.5),(3,'LOP','Vitamina C',2,'2017-01-05',26.3),(4,'QWE','Complejo B',1,'2016-12-07',1200.45),(5,'PWT','Consulta Medica Ofmatologica',2,'2016-12-07',150.6),(6,'LDN','Suero Diabetico',1,'2016-12-07',50),(7,'QIM','Suplemento Alimenticio',1,'2016-12-07',200),(8,'CON-MED1','Consulta Medicina General',2,'2017-01-12',200);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rol` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'ADMIN','Acceso a todo el sistema'),(2,'COMUN','Sin Acceso a modificacion y eliminacion'),(3,'ADMINISTRATIVO','Acceso a facturacion'),(4,'OPERATIVO','Acceso a caja y caja chica');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `agregado` date NOT NULL,
  `username` varchar(45) NOT NULL,
  `passwd` varchar(45) NOT NULL,
  `rol` int(10) unsigned DEFAULT '2',
  PRIMARY KEY (`id`),
  KEY `fk_usuario_1_idx` (`rol`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Erick Zarat','ezarat15@gmail.com','2017-01-04','admin','admin',1),(2,'Jose Perez','jperez@gmail.com','2017-01-06','josse','jose',2),(3,'Mario Garcia','mgarcia@gmail.com','2017-01-06','mario','mario',3),(6,'Ana Cabrera','acabrera@hotmail.com','2017-01-06','ana','ana',4),(9,'Javier Vergara','javierv@gmail.com','2017-01-07','javier','javier',2),(10,'Karla Orellana','korellana@gmail.com','2017-01-07','karla','karla',2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-16 11:12:43
