-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: project_vacations
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL,
  KEY `user_id_idx` (`user_id`),
  KEY `vacation_id_idx` (`vacation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (2,20),(2,2),(2,3),(2,11),(2,4),(2,5),(2,18),(2,7),(2,14),(2,15),(2,17),(2,9),(2,13),(1,20),(1,2),(1,10),(1,11),(1,3),(1,16),(1,4),(1,5),(1,18),(1,8),(3,1),(3,10),(3,7),(3,12),(3,6),(3,19),(3,17),(3,15),(3,13),(3,9),(4,20),(4,2),(5,20),(5,1),(5,7),(5,4),(5,5),(5,9),(6,20),(6,2),(7,20),(7,2),(7,10),(7,11),(7,8),(8,8),(8,5),(8,2),(8,1),(8,10),(8,4),(8,12),(9,20),(9,2),(9,9),(9,18),(9,5),(9,8),(10,2),(10,10),(10,7),(10,8),(10,15);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role` int DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0,'Admin','Badmintoff','admin@admin.com','admin',1),(1,'User','Userson','user@user.com','user',0),(2,'User2','User2','user2@user.com','user2',0),(3,'User3','User3','user3@user.com','user3',0),(4,'User4','User4','user4@user.com','user4',0),(5,'User5','User5','user5@user.com','user5',0),(6,'User6','User6','user6@user.com','user6',0),(7,'User7','User7','user7@user.com','user7',0),(8,'User8','User8','user8@user.com','user8',0),(9,'User9','User9','user9@user.com','user9',0),(10,'User10','User10','user10@user.com','user10',0),(53,'User11','User11','user11@gmail.com','user11',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacation_id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` varchar(400) NOT NULL,
  `start_date` varchar(45) NOT NULL,
  `end_date` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `image_name` varchar(45) NOT NULL,
  PRIMARY KEY (`vacation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Paris, France','Known as the \"City of Love,\" Paris offers iconic landmarks like the Eiffel Tower and Notre-Dame Cathedral, along with world-class museums and charming cafes.','2023-06-27T21:00:00.000Z','2023-06-29T21:00:00.000Z',420,'83451cb9-30fd-47a3-a3a7-8f75cde93481.jpg'),(2,'Tokyo, Japan','A vibrant metropolis, Tokyo combines modern technology with ancient traditions. From futuristic skyscrapers to traditional temples and gardens, the city offers a unique cultural experience','2023-06-26T21:00:00.000Z','2023-06-30T21:00:00.000Z',1173,'5ce2dc38-32ba-4018-b180-f158c2e227dd.jpg'),(3,'Bali, Indonesia','This tropical paradise boasts stunning beaches, lush landscapes, and vibrant culture. Visitors can explore ancient temples, indulge in spa treatments, or simply relax on the beach.','2023-06-28T21:00:00.000Z','2023-07-02T21:00:00.000Z',219,'86e7190c-4e7b-4be7-9424-dc5f70a872e9.jpg'),(4,'Rome, Italy','A city steeped in history, Rome offers ancient ruins like the Colosseum and the Roman Forum, as well as magnificent churches and delicious cuisine.','2023-07-11T21:00:00.000Z','2023-07-26T21:00:00.000Z',1639,'6b583664-d094-45ad-8465-c290fb5739b8.jpg'),(5,'Cancun, Mexico','Famous for its crystal-clear waters and white sandy beaches, Cancun is a popular destination for relaxation and water activities. Visitors can also explore Mayan ruins nearby.','2023-07-29T21:00:00.000Z','2023-08-02T21:00:00.000Z',881,'40259d81-b63e-4f94-a798-c58116f72878.jpg'),(6,'Barcelona, Spain','Known for its stunning architecture, Barcelona offers the masterpieces of Antoni Gaudí, along with vibrant markets, delicious cuisine, and a lively nightlife scene. ','2023-07-11T21:00:00.000Z','2023-07-17T21:00:00.000Z',940,'10c59aac-deaa-4948-8185-2c2dc83f9870.jpg'),(7,'New York City, USA','The Big Apple is a city that never sleeps, with iconic landmarks like Times Square, Central Park, and the Statue of Liberty. Visitors can explore world-class museums, enjoy Broadway shows, and indulge in diverse cuisine.','2023-06-29T21:00:00.000Z','2023-07-09T21:00:00.000Z',2377,'b8e44a0d-796c-49e7-8fbd-970c16267db7.jpg'),(8,'Phuket, Thailand','With its pristine beaches, vibrant nightlife, and lush rainforests, Phuket is a popular tropical getaway. Visitors can also enjoy water sports, visit temples, and savor authentic Thai cuisine.','2023-08-28T21:00:00.000Z','2023-09-01T21:00:00.000Z',255,'9d79c10f-e49a-4ccc-80f4-5e830a664d24.jpg'),(9,'Sydney, Australia','Boasting stunning harbor views, beautiful beaches, and iconic landmarks like the Sydney Opera House, Sydney offers a mix of cosmopolitan attractions and natural beauty.','2023-08-08T21:00:00.000Z','2023-08-18T21:00:00.000Z',2701,'ca3005f0-3747-44a8-b02d-e96966f51e2b.jpg'),(10,'London, United Kingdom','This multicultural city is home to historical sites, world-class museums, and renowned theaters. Visitors can explore landmarks such as the Tower of London and Buckingham Palace.','2023-06-27T21:00:00.000Z','2023-06-30T21:00:00.000Z',671,'edbfa7df-f7a2-4c0a-afb8-93c2644f413a.jpg'),(11,'Santorini, Greece','Known for its breathtaking sunsets and whitewashed buildings, Santorini offers a romantic and picturesque setting. Visitors can explore charming villages, relax on volcanic beaches, and indulge in delicious Greek cuisine.','2023-06-29T21:00:00.000Z','2023-07-13T21:00:00.000Z',1969,'d604b862-6384-46a7-9b8e-4b44a79ef8e8.jpg'),(12,'Dubai, United Arab Emirates','A city of superlatives, Dubai showcases futuristic architecture, luxury shopping malls, and world-class entertainment. Visitors can enjoy desert safaris, visit the iconic Burj Khalifa, or unwind on pristine beaches.','2023-07-05T21:00:00.000Z','2023-07-09T21:00:00.000Z',1283,'1a74aa4f-513c-4906-9684-3125a22581ea.jpg'),(13,'Cape Town, South Africa','Nestled between the ocean and Table Mountain, Cape Town boasts stunning natural beauty and a diverse culture. Visitors can explore vibrant neighborhoods, visit wineries, and embark on wildlife safaris.','2023-07-30T21:00:00.000Z','2023-08-02T21:00:00.000Z',650,'72aec263-f280-4a53-8e98-3766a8055992.jpg'),(14,'Rio de Janeiro, Brazil','Known for its vibrant carnival and stunning beaches like Copacabana and Ipanema, Rio de Janeiro is a city full of energy and passion. Visitors can admire the iconic Christ the Redeemer statue, enjoy samba music, and explore lush rainforests. ','2023-06-27T21:00:00.000Z','2023-07-01T21:00:00.000Z',781,'b43d28a9-8c3f-4813-a8ed-a41f88e0efa8.jpg'),(15,'Bangkok, Thailand','A bustling city that seamlessly blends tradition and modernity, Bangkok offers vibrant street markets, ornate temples, and a lively nightlife scene. Visitors can indulge in delicious street food, explore ancient palaces, and cruise along the Chao Phraya River.','2023-09-28T21:00:00.000Z','2023-10-06T21:00:00.000Z',447,'9cc50c49-a46c-4618-b304-297423504091.jpg'),(16,'Florence, Italy','Known as the birthplace of the Renaissance, Florence is a treasure trove of art, architecture, and history. Visitors can marvel at masterpieces in world-renowned museums like the Uffizi Gallery, explore the charming streets, and savor Tuscan cuisine.','2023-06-30T21:00:00.000Z','2023-07-05T21:00:00.000Z',1189,'77377f0d-0c73-4e7b-a0c5-a7b3e55ac76c.jpg'),(17,'Amsterdam, Netherlands','With its picturesque canals, historic buildings, and vibrant cultural scene, Amsterdam offers a unique and charming atmosphere. Visitors can explore world-class museums, cycle along the canals, and experience the lively nightlife.','2023-09-12T21:00:00.000Z','2023-09-20T21:00:00.000Z',950,'0fbbfa3b-6218-49f9-97e8-c1a36bfeadf3.jpg'),(18,'Athens, Greece','The capital city of Greece, Athens is a blend of ancient history and modern charm. Visitors can explore iconic landmarks like the Acropolis and Parthenon, stroll through charming neighborhoods, and enjoy authentic Greek cuisine.','2023-07-31T21:00:00.000Z','2023-08-04T21:00:00.000Z',1012,'e8f6940f-9def-4923-bac1-389429cb327e.jpg'),(19,'Prague, Czech Republic','Known for its stunning architecture and rich history, Prague offers fairy-tale-like cobblestone streets, medieval castles, and charming squares. Visitors can explore the Prague Castle, enjoy traditional Czech beer, and experience the vibrant nightlife. ','2023-08-22T21:00:00.000Z','2023-08-25T21:00:00.000Z',511,'657f373e-f0b8-4f00-8f0f-d86b842bfbe5.jpg'),(20,'Goris, Armenia','Historic town surrounded by stunning landscapes, rock formations, and traditional stone houses. Visit Tatev Monastery, hike, indulge in Armenian cuisine. Warm hospitality and affordable prices. Immerse in culture, beauty, and make lasting memories in this hidden gem of Armenia.','2023-06-25T21:00:00.000Z','2023-07-05T21:00:00.000Z',721,'fa66ba58-4072-4676-9c59-fdb6410c1620.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-29  0:13:28
