/*
 Navicat Premium Data Transfer

 Source Server         : paddy
 Source Server Type    : MySQL
 Source Server Version : 50635
 Source Host           : localhost:3307
 Source Schema         : mysql

 Target Server Type    : MySQL
 Target Server Version : 50635
 File Encoding         : 65001

 Date: 14/08/2017 13:06:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for img
-- ----------------------------
DROP TABLE IF EXISTS `img`;
CREATE TABLE `img` (
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
