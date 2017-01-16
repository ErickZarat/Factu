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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-16 11:14:50
