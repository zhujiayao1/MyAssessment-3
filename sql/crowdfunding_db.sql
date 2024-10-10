/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : localhost:3306
 Source Schema         : crowdfunding_db

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 10/10/2024 15:26:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `CATEGORY_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'medical');
INSERT INTO `category` VALUES (2, 'education');
INSERT INTO `category` VALUES (7, 'crisis relief');
INSERT INTO `category` VALUES (8, 'Animal');
INSERT INTO `category` VALUES (9, 'social impact');

-- ----------------------------
-- Table structure for donation
-- ----------------------------
DROP TABLE IF EXISTS `donation`;
CREATE TABLE `donation`  (
  `DONATION_ID` int NOT NULL AUTO_INCREMENT,
  `DATE` datetime NULL DEFAULT NULL,
  `AMOUNT` decimal(10, 2) NULL DEFAULT NULL,
  `GIVER` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `FUNDRAISER_ID` int NOT NULL,
  PRIMARY KEY (`DONATION_ID`) USING BTREE,
  INDEX `FUNDRAISER_ID`(`FUNDRAISER_ID` ASC) USING BTREE,
  CONSTRAINT `donation_ibfk_1` FOREIGN KEY (`FUNDRAISER_ID`) REFERENCES `fundraiser` (`FUNDRAISER_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of donation
-- ----------------------------
INSERT INTO `donation` VALUES (1, '2024-10-08 15:16:14', 2000.00, 'AA', 1);
INSERT INTO `donation` VALUES (2, '2024-10-08 15:20:42', 1000.00, 'BB', 2);
INSERT INTO `donation` VALUES (3, '2024-10-08 15:21:34', 1000.00, 'BB', 2);
INSERT INTO `donation` VALUES (4, '2024-10-08 15:21:34', 1000.00, 'cc', 3);
INSERT INTO `donation` VALUES (5, '2024-10-08 15:21:34', 1000.00, 'DD', 3);
INSERT INTO `donation` VALUES (6, '2024-10-08 15:21:34', 1000.00, 'EE', 4);
INSERT INTO `donation` VALUES (7, '2024-10-08 15:21:34', 1000.00, 'FF', 5);
INSERT INTO `donation` VALUES (8, '2024-10-08 15:21:34', 1000.00, 'gg', 6);
INSERT INTO `donation` VALUES (9, '2024-10-08 15:21:34', 1000.00, 'HH', 8);
INSERT INTO `donation` VALUES (10, '2024-10-08 15:21:34', 1000.00, 'II', 9);
INSERT INTO `donation` VALUES (11, '2024-10-08 15:21:34', 1000.00, 'jj', 10);

-- ----------------------------
-- Table structure for fundraiser
-- ----------------------------
DROP TABLE IF EXISTS `fundraiser`;
CREATE TABLE `fundraiser`  (
  `FUNDRAISER_ID` int NOT NULL AUTO_INCREMENT,
  `ORGANIZER` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CAPTION` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `TARGET_FUNDING` decimal(10, 2) NULL DEFAULT NULL,
  `CURRENT_FUNDING` decimal(10, 2) NULL DEFAULT NULL,
  `CITY` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `ACTIVE` tinyint(1) NULL DEFAULT 1,
  `CATEGORY_ID` int NULL DEFAULT NULL,
  PRIMARY KEY (`FUNDRAISER_ID`) USING BTREE,
  INDEX `CATEGORY_ID`(`CATEGORY_ID` ASC) USING BTREE,
  CONSTRAINT `fundraiser_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`CATEGORY_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of fundraiser
-- ----------------------------
INSERT INTO `fundraiser` VALUES (1, 'Laura Green', 'Aid for Earthquake Victims', 20000.00, 15000.00, 'San Francisco', 1, 7);
INSERT INTO `fundraiser` VALUES (2, 'Michael Lee', 'Animal Rescue Fund', 7000.00, 4000.00, 'Denver', 1, 8);
INSERT INTO `fundraiser` VALUES (3, 'Nina Patel', 'Building Community Gardens', 3000.00, 2500.00, 'Phoenix', 1, 9);
INSERT INTO `fundraiser` VALUES (4, 'Oscar Wilde', 'Support for Homeless Families', 10000.00, 6000.00, 'Atlanta', 1, 9);
INSERT INTO `fundraiser` VALUES (5, 'Penny Lane', 'Water Purification Project', 8000.00, 5000.00, 'Portland', 1, 7);
INSERT INTO `fundraiser` VALUES (6, 'Jackson', 'Help The Jackson\'s Rebuild After Flood', 100000.00, 7350.00, ' Byron Bay', 1, 7);
INSERT INTO `fundraiser` VALUES (7, 'Aya Hodroj', ' Support for Homeless Animals', 20000.00, 4657.00, 'Lebanon', 1, 8);
INSERT INTO `fundraiser` VALUES (8, 'Jackson', 'test the same name\'s test', 1000.00, 735.00, ' Byron Bay', 1, 8);
INSERT INTO `fundraiser` VALUES (9, 'Test the same city', 'Test the same city', 2222.00, 1111.00, 'Denver', 1, 8);
INSERT INTO `fundraiser` VALUES (10, 'Test the same city', 'Test the same city', 2222.00, 1111.00, 'Denver', 1, 8);

SET FOREIGN_KEY_CHECKS = 1;
