-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2018 at 05:52 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `timesheetdb`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_clients` ()  NO SQL
    COMMENT 'get all records in clients table'
SELECT * from clients$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_employees` ()  NO SQL
    COMMENT 'get all records in employees table'
SELECT * FROM employees$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_results` ()  NO SQL
    COMMENT 'get all records in time_results table'
SELECT * from time_results$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `results_entry` (IN `tname` VARCHAR(255), IN `stime` VARCHAR(50), IN `etime` VARCHAR(50), IN `sdate` VARCHAR(50), IN `comms` VARCHAR(255))  NO SQL
INSERT INTO time_results(task_name, start_time, end_time, sdate, comments) VALUES(tname, stime, etime, sdate, comms)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(12) NOT NULL,
  `client_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `manager_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `position` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `client_name`, `manager_name`, `position`) VALUES
(1, 'Burt Solomon', 'Burt Solomon', 'Manager'),
(2, 'Perry White', 'Morgan Edge', 'Photographer'),
(3, 'Sophia Freeman', 'Cindy Lapor', 'Junior Dev'),
(4, 'Dilan MattLand', 'Cherl White', 'Payroll Officer\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(12) UNSIGNED NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `email`, `password`, `first_name`, `last_name`, `address`) VALUES
(1, 'tjae@gmail.com', 'password', 'Tjae', 'Fiore', '52 Goldsmith Villa'),
(2, 'joe@gmail.com', 'password1', 'Joe', 'Bidden', '20 Oxford Park Avenue'),
(3, 'erza@yahoo.com', 'password2', 'Erza', 'Scarlet', '31 Barbican Road'),
(4, 'bob@yahoo.com', 'password2', 'Bobby', 'Stone', '36 Old Hope Road');

-- --------------------------------------------------------

--
-- Table structure for table `time_results`
--

CREATE TABLE `time_results` (
  `id` int(12) NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `start_time` varchar(50) NOT NULL,
  `end_time` varchar(50) NOT NULL,
  `sdate` varchar(50) NOT NULL,
  `comments` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`) USING BTREE;

--
-- Indexes for table `time_results`
--
ALTER TABLE `time_results`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `time_results`
--
ALTER TABLE `time_results`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
