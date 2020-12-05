CREATE DATABASE  IF NOT EXISTS `db_project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_project`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: db_project
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administers`
--

DROP TABLE IF EXISTS `administers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administers` (
  `userID` int DEFAULT NULL,
  `eventID` int DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  KEY `userID` (`userID`),
  KEY `eventID` (`eventID`),
  CONSTRAINT `administers_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `administers_ibfk_2` FOREIGN KEY (`eventID`) REFERENCES `event` (`eventID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administers`
--

LOCK TABLES `administers` WRITE;
/*!40000 ALTER TABLE `administers` DISABLE KEYS */;
INSERT INTO `administers` VALUES (1,1,1);
/*!40000 ALTER TABLE `administers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attends`
--

DROP TABLE IF EXISTS `attends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attends` (
  `comment` tinytext,
  `rating` int DEFAULT NULL,
  `userID` int DEFAULT NULL,
  `eventID` int DEFAULT NULL,
  KEY `userID` (`userID`),
  KEY `eventID` (`eventID`),
  CONSTRAINT `attends_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `attends_ibfk_2` FOREIGN KEY (`eventID`) REFERENCES `event` (`eventID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attends`
--

LOCK TABLES `attends` WRITE;
/*!40000 ALTER TABLE `attends` DISABLE KEYS */;
INSERT INTO `attends` VALUES ('example',10,1,1),('Nice event!',10,2,1);
/*!40000 ALTER TABLE `attends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `category` tinytext,
  `date` date DEFAULT NULL,
  `eventID` int NOT NULL,
  `description` tinytext,
  `event_Name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`eventID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES ('example','2020-12-01',1,'example',NULL);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `heldat`
--

DROP TABLE IF EXISTS `heldat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `heldat` (
  `eventID` int DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  KEY `address` (`address`),
  KEY `eventID` (`eventID`),
  CONSTRAINT `heldat_ibfk_1` FOREIGN KEY (`address`) REFERENCES `location` (`address`),
  CONSTRAINT `heldat_ibfk_2` FOREIGN KEY (`eventID`) REFERENCES `event` (`eventID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `heldat`
--

LOCK TABLES `heldat` WRITE;
/*!40000 ALTER TABLE `heldat` DISABLE KEYS */;
INSERT INTO `heldat` VALUES (1,'12345 example rd, hialeah,florida');
/*!40000 ALTER TABLE `heldat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(100) NOT NULL,
  `capacity` int DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `size` int DEFAULT NULL,
  PRIMARY KEY (`address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES ('example','12345 example rd, hialeah,florida',200,'example',50);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `superadmin`
--

DROP TABLE IF EXISTS `superadmin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `superadmin` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `isAdmin` tinyint DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `token_UNIQUE` (`token`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `superadmin`
--

LOCK TABLES `superadmin` WRITE;
/*!40000 ALTER TABLE `superadmin` DISABLE KEYS */;
INSERT INTO `superadmin` VALUES (1,'mau','$2b$10$QBn4hbhutvsFZi6gUwiUNOjgw9c7rS.AAnVyXc6f7dLyHFgIMdk8a','53858764412020110418',1);
/*!40000 ALTER TABLE `superadmin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phoneNumber` bigint DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `UQ_userToken` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'example','$2b$10$o81A1Qo2yh6x4BMpgsoK.e.x3qOHeyrlAdH6qcMPrz7nalv2G0Rha','80377771532020110418',0,'ex','ample','m@mail.com',7774747777);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_project'
--

--
-- Dumping routines for database 'db_project'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-05  2:21:59
