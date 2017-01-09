-- MySQL dump 10.13  Distrib 5.7.13, for linux-glibc2.5 (x86_64)
--
-- Host: 127.0.0.1    Database: factu
-- ------------------------------------------------------
-- Server version	5.7.16-0ubuntu0.16.04.1

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'817281-k','Mario Godoy','77889900','Ciudad',1,'2017-01-04'),(2,'443342','Jorge Carranza','2342342234','Ciudad',1,'2017-01-07'),(3,'423423423','Carlos Martinez','878797','Guatemala',2,'2017-01-07'),(4,'3423423','Maria Gonzalez','9089898089','Guatemala',1,'2017-01-07'),(5,'123123123','Orlando Cuevas','98978','Mixco',2,'2017-01-07'),(7,'8938201','Ximena Herrarte','9390320','Xela',2,'2017-01-07');
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `cliente` int(10) DEFAULT NULL,
  `vendedor` int(10) unsigned DEFAULT NULL,
  `estado` int(10) unsigned DEFAULT NULL,
  `total` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_factura_1_idx` (`vendedor`),
  KEY `fk_factura_2_idx` (`cliente`),
  KEY `fk_factura_3_idx` (`estado`),
  CONSTRAINT `fk_factura_1` FOREIGN KEY (`vendedor`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_factura_2` FOREIGN KEY (`cliente`) REFERENCES `cliente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_factura_3` FOREIGN KEY (`estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES (1,'2017-01-06',1,1,3,500),(4,'2017-01-08',2,2,3,1111);
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
  `fact` int(11) DEFAULT NULL,
  `prod` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_prod_fact_1_idx` (`fact`),
  KEY `fk_prod_fact_2_idx` (`prod`),
  CONSTRAINT `fk_prod_fact_1` FOREIGN KEY (`fact`) REFERENCES `factura` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_prod_fact_2` FOREIGN KEY (`prod`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prod_fact`
--

LOCK TABLES `prod_fact` WRITE;
/*!40000 ALTER TABLE `prod_fact` DISABLE KEYS */;
/*!40000 ALTER TABLE `prod_fact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cod` varchar(15) NOT NULL,
  `producto` varchar(100) DEFAULT NULL,
  `estado` int(10) unsigned DEFAULT NULL,
  `agregado` date DEFAULT NULL,
  `precio` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_productos_1_idx` (`estado`),
  CONSTRAINT `fk_productos_1` FOREIGN KEY (`estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'AKI','Memoria USB',1,'2017-01-06',35.5),(3,'LOP','Mouse Negro',2,'2017-01-06',26.3),(4,'QWE','IPOD',1,'2017-01-01',1200.45),(5,'PWT','Audifonos',2,'2017-01-01',150.6),(6,'LDN','Cable MicroUSB',1,'2017-01-01',50),(7,'QIM','Reloj',1,'2017-01-01',200);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Erick Zarat','ezarat15@gmail.com','2017-01-04','admin','admin'),(2,'Jose Perez','jperez@gmail.com','2017-01-06','josse','jose'),(3,'Mario Garcia','mgarcia@gmail.com','2017-01-06','mario','mario'),(6,'Ana Cabrera','acabrera@hotmail.com','2017-01-06','ana','j'),(9,'Javier Vergara','javierv@gmail.com','2017-01-07','javier','m'),(10,'Karla Orellana','korellana@gmail.com','2017-01-07','karla','k');
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

-- Dump completed on 2017-01-08 21:43:59
