-- MySQL dump 10.17  Distrib 10.3.20-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: smladProd
-- ------------------------------------------------------
-- Server version	10.3.20-MariaDB-1:10.3.20+maria~bionic

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) DEFAULT NULL,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `userId` int(11) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7e8d7c49f218ebb14314fdb3749` (`userId`),
  KEY `FK_e44ddaaa6d058cb4092f83ad61f` (`postId`),
  CONSTRAINT `FK_7e8d7c49f218ebb14314fdb3749` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e44ddaaa6d058cb4092f83ad61f` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Very bad idia!!! This is my compeny!!!',0,'2019-12-18 21:08:10.547597',4,1),(2,'Can`i learn more about it? ',0,'2019-12-18 21:21:24.885252',5,2),(3,'GO GO GO',0,'2019-12-18 21:38:05.090106',8,6),(4,'Yes test',0,'2019-12-18 21:38:21.712597',8,2),(5,'I will come',0,'2019-12-18 22:08:33.173150',12,7),(6,'EVRIKA !!!',0,'2019-12-18 22:09:04.371180',12,2);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `liked` tinyint(4) NOT NULL,
  `postId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e2fe567ad8d305fefc918d44f50` (`postId`),
  KEY `FK_cfd8e81fac09d7339a32e57d904` (`userId`),
  CONSTRAINT `FK_cfd8e81fac09d7339a32e57d904` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e2fe567ad8d305fefc918d44f50` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1576702037146,'Inital1576702037146');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `positions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position` varchar(255) DEFAULT NULL,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions`
--

LOCK TABLES `positions` WRITE;
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` VALUES (1,'Founder',0),(2,'HR',0),(3,'Team leader',0),(4,'Team leader',0),(5,'Аrchitect',0),(6,'Admin',0),(7,'QA',0),(8,'PM',0),(9,'CTO',0),(10,'Developer',0),(11,'accountM',0);
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `allLikes` int(11) NOT NULL DEFAULT 0,
  `isPublic` tinyint(4) NOT NULL DEFAULT 1,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ae05faaa55c866130abef6e1fee` (`userId`),
  CONSTRAINT `FK_ae05faaa55c866130abef6e1fee` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'The merge','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','https://i.imgur.com/sBKdwV8.png',0,1,0,'2019-12-18 21:06:26.188352','2019-12-18 21:06:26.188352',3),(2,'The future is here','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.','https://i.imgur.com/qCqDito.png',0,1,0,'2019-12-18 21:12:54.277265','2019-12-18 21:12:54.277265',4),(3,'Hello i\'m the new guy','Today let`us need in the play Zone for a small party','https://i.imgur.com/c6zGfEj.png',0,1,0,'2019-12-18 21:20:36.216189','2019-12-18 21:20:36.216189',5),(4,'Team of the year','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','https://i.imgur.com/DqIG1AP.png',0,1,0,'2019-12-18 21:24:31.936046','2019-12-18 21:24:31.936046',6),(5,'Let`s try it ','After work ZEN','https://i.imgur.com/jURxKyI.png',0,0,0,'2019-12-18 21:33:05.585128','2019-12-18 21:33:05.585128',7),(6,'Let`s travel','1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','https://i.imgur.com/B4ub15X.png',0,0,0,'2019-12-18 21:33:55.147605','2019-12-18 21:33:55.147605',7),(7,'Git tests','The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','https://i.imgur.com/J9IEnmH.png',0,1,0,'2019-12-18 21:41:59.508978','2019-12-18 21:41:59.508978',8),(8,'Come to mock','Come to mock ttests','https://i.imgur.com/riKPwSf.png',0,0,0,'2019-12-18 21:43:19.074662','2019-12-18 21:43:19.074662',8),(9,'We WIN AGAIN ','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','https://i.imgur.com/GFlBXxw.png',0,1,0,'2019-12-18 21:47:13.382612','2019-12-18 21:47:13.382612',9),(10,'Private party for followers','Come come ','https://i.imgur.com/daOmITG.png',0,0,0,'2019-12-18 21:48:03.341043','2019-12-18 21:48:03.341043',9),(11,'Fight lessons in the office','First steps in boxing and MMA ','https://i.imgur.com/roINLO1.png',0,0,0,'2019-12-18 21:54:20.491303','2019-12-18 21:54:20.491303',10),(12,'Вербално и невербално ','Да си поговорим за меките уменя.','https://i.imgur.com/9gaNdUj.png',0,1,0,'2019-12-18 21:59:44.691590','2019-12-18 21:59:44.691590',11),(13,'DSA WITH NIKI TECHEN','За по любопитните','https://i.imgur.com/IEqUqLS.png',0,0,0,'2019-12-18 22:02:40.718749','2019-12-18 22:02:40.718749',12),(14,'DSA with Niki TECHEN','Къде е другата част от картинката ? ','https://i.imgur.com/l9hyoQn.png',0,0,0,'2019-12-18 22:03:38.883166','2019-12-18 22:03:38.883166',12),(15,'Team happy','Team happy Team happyTeam happyTeam happy','https://i.imgur.com/alVG7pd.png',0,1,0,'2019-12-18 22:12:32.705950','2019-12-18 22:12:32.705950',13),(16,'Leaders','text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop','https://i.imgur.com/wqYNEhy.png',0,1,0,'2019-12-18 22:13:09.567123','2019-12-18 22:13:09.567123',13),(17,'The best developers are hiding behind the green.','text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop','https://i.imgur.com/usnDwmQ.png',0,1,0,'2019-12-18 22:15:25.454836','2019-12-18 22:15:25.454836',13);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('Admin','Basic') NOT NULL DEFAULT 'Basic',
  `bio` varchar(50) DEFAULT NULL,
  `profilePic` varchar(255) DEFAULT NULL,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `positionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7d5b477d15c01b6b44f1b4e8cc4` (`positionId`),
  CONSTRAINT `FK_7d5b477d15c01b6b44f1b4e8cc4` FOREIGN KEY (`positionId`) REFERENCES `positions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2a$10$BexCPQCKXlppzg1p08cEt.T.uWfRt4lzKVgTftFFPWN/.z7bOsKnq','admin@admin.com','Admin',NULL,'https://i.imgur.com/5X0viL8.png',0,'2019-12-18 20:48:33.119602','2019-12-18 21:37:24.000000',NULL),(2,'firstUser','$2a$10$3cTnjn/YwxKeqs3MkMXc1eqQtSR64Oyn7cFcshuCW.1qWcMJvXroO','user@user.com','Basic',NULL,'https://i.imgur.com/5X0viL8.png',0,'2019-12-18 20:48:33.236450','2019-12-18 20:48:33.236450',NULL),(3,'TheBoss','$2a$10$z/3mj673vennK9aJqvVGquv/0W6mI3OiYTftGr/aUd/7e7ZM.hiAe','TheBoss@nx.ts','Basic','I made it ','https://i.imgur.com/q2HGf1A.png',0,'2019-12-18 20:51:55.594931','2019-12-18 21:01:46.000000',1),(4,'theBrain','$2a$10$RWl.t42aqFcLJeCIu6Tizu664rTJpP7E30VwZcWT902vc3cxpspGS','theBrain@ts.ts','Basic','I`m the men how bild this!','https://i.imgur.com/DMGfseX.png',0,'2019-12-18 21:07:29.768799','2019-12-18 21:10:03.000000',1),(5,'smilen','$2a$10$mJVF9TbanTt/rU6dizF3AO8e37AxeSYBOPmgYok2d/1UszztL/DKe','smilen@smilen.ts','Basic','Advencher is in my blood','https://i.imgur.com/wlqGAfR.png',0,'2019-12-18 21:15:15.163791','2019-12-18 21:16:53.000000',10),(6,'veraV','$2a$10$iPSDF6sb/KteufSRYJ3oe.EIUgiUxdpo85ApXg/uFaVHSzwNBitP.','veraV@veraV.ts','Basic','We are N1','https://i.imgur.com/1LJy64F.png',0,'2019-12-18 21:22:07.761687','2019-12-18 21:23:12.000000',3),(7,'Miraaa','$2a$10$wDUu1hfucS0jxBRI50sx4eW.ebH717WG/pIHslf/J2abIxPTyHdgK','Miraaa@ts.ts','Basic','I`m too busy','https://i.imgur.com/nxpfU9i.png',0,'2019-12-18 21:26:01.744130','2019-12-18 21:29:01.000000',11),(8,'Marto','$2a$10$YWl2FOvMFbCyFtzUe25XqO98O01rIaXsHxJAaJzEjK8359W2qxcyK','marto@rwq.ga','Basic','Lets do it ','https://i.imgur.com/3L16qeT.png',0,'2019-12-18 21:35:42.077682','2019-12-18 21:36:29.000000',10),(9,'Mariq','$2a$10$xEAToXH5jJEI.EV3avwW3uZdkHfwCnL2QWVKHFejakyHJyN3dLSmy','Mariq@Mariq.ts','Basic','One Two 3','https://i.imgur.com/V0CYEPz.png',0,'2019-12-18 21:44:10.273275','2019-12-18 21:45:22.000000',2),(10,'petyr','$2a$10$WpoRhGdbBYC7gRkccf.JjeAFxKcHma47ikEdj3HRcDCuE47RALaeS','petyr@fa.ts','Basic',NULL,'https://i.imgur.com/Dbwvb48.png',0,'2019-12-18 21:49:09.889791','2019-12-18 21:51:43.000000',10),(11,'NikiNash','$2a$10$b5yCL3IFAhv4jKcYuvmtLe/vCHkYoGtcsqbDlPIeFfN2T1PkrFcz6','NikiNash@ta.ts','Basic',NULL,'https://i.imgur.com/kt0W4Wx.png',0,'2019-12-18 21:56:07.947085','2019-12-18 22:15:57.000000',NULL),(12,'NikiTehen','$2a$10$dz.fuLby9ZNa8UcgLQFKJuCK.kif3EMSateyV3uY0ibIR6CEjCR2W','NikiTehen@ts.json','Basic','if var is const how to let some filter get map','https://i.imgur.com/SPf05Dj.png',0,'2019-12-18 22:00:49.278211','2019-12-18 22:07:44.000000',5),(13,'MilaMe','$2a$10$RC4BuiE6ehrTEAVPmt7q9.c1yJr3P2zg7IHcgnvxvFSlTXPUb5r5e','MilaMe@fa.ab','Basic','Hr','https://i.imgur.com/OTXQ19J.png',0,'2019-12-18 22:10:22.815277','2019-12-18 22:11:19.000000',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_followers_users`
--

DROP TABLE IF EXISTS `users_followers_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_followers_users` (
  `usersId_1` int(11) NOT NULL,
  `usersId_2` int(11) NOT NULL,
  PRIMARY KEY (`usersId_1`,`usersId_2`),
  KEY `IDX_8d63f6043394b4d32343bdea11` (`usersId_1`),
  KEY `IDX_1433e3275a501bc09f5c33c7ca` (`usersId_2`),
  CONSTRAINT `FK_1433e3275a501bc09f5c33c7ca2` FOREIGN KEY (`usersId_2`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_8d63f6043394b4d32343bdea11d` FOREIGN KEY (`usersId_1`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_followers_users`
--

LOCK TABLES `users_followers_users` WRITE;
/*!40000 ALTER TABLE `users_followers_users` DISABLE KEYS */;
INSERT INTO `users_followers_users` VALUES (1,8),(3,4),(3,5),(3,6),(3,7),(3,8),(3,9),(3,10),(3,11),(3,13),(4,3),(4,5),(4,6),(4,7),(4,8),(4,9),(4,10),(4,11),(4,12),(4,13),(5,8),(5,10),(5,11),(5,12),(6,3),(6,7),(6,8),(6,9),(6,10),(6,11),(6,12),(6,13),(7,8),(7,9),(7,10),(7,11),(7,13),(8,9),(8,10),(8,12),(8,13),(9,10),(9,11),(9,13),(10,11),(10,12),(10,13),(11,12),(11,13),(12,3),(12,13);
/*!40000 ALTER TABLE `users_followers_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-19  0:25:10
