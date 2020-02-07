-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2019 at 01:24 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.2.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `controltower`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `createDispatch` (IN `sourceParam` INT, IN `destinationParam` INT, IN `transporterParam` INT, IN `transporterLrNoParam` INT, IN `driverParam` INT, IN `routeParam` INT, IN `vehicleTypeParam` INT, IN `vehicleNumberParam` VARCHAR(25), IN `tripStartDateTimeParam` DATETIME, IN `tripEndDateTimeParam` DATETIME, IN `tripStatusParam` INT, IN `SkuMasterIdParam` INT, IN `createdOnParam` DATETIME, IN `isDeletedParam` BOOLEAN, IN `shipmentNumberParam` VARCHAR(255), IN `deliveryNumberParam` VARCHAR(255), IN `customerNoParam` INT, IN `createdByParam` INT, OUT `isInserted` TINYINT(1), OUT `testParam` VARCHAR(50))  BEGIN
        BEGIN
                        -- GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE,
                        -- @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
                        -- SET @full_error = CONCAT("ERROR ", @errno, " (", @sqlstate, "): ", @text);
                        -- SELECT @full_error;
                        DECLARE EXIT HANDLER FOR SQLEXCEPTION
        
                ROLLBACK;
        
                        SET isInserted = 0;
    END;
  
    START TRANSACTION;
  
                 SET @shipmentDeliveryMappingId = (
													SELECT 
													shipmentdeliverymapping.shipmentDeliveryMappingId 
                                                    FROM 
                                                    shipmentdeliverymapping 
                                                    INNER JOIN delivery ON shipmentdeliverymapping.deliveryId = delivery.deliveryId 
                                                    WHERE 
                                                    delivery.deliveryNo=deliveryNumberParam AND shipmentdeliverymapping.isDeleted=0 AND delivery.isDeleted=0 LIMIT 1
												  );
         
          IF(@shipmentDeliveryMappingId IS NULL) THEN
                  IF(shipmentNumberParam IS NULL) THEN
                                SET @shipmentNo = deliveryNumberParam;
        
          ELSE 
                                SET  @shipmentNo = shipmentNumberParam;
                  END IF;   
          BEGIN
                        INSERT INTO shipment (shipmentNo, customerNo, createdBy, createdOn, isDeleted) VALUES (@shipmentNo,customerNoParam,createdByParam,createdOnParam,isDeletedParam);
                        SET @shipmentId = (SELECT LAST_INSERT_ID());
          END;
          BEGIN
                        INSERT INTO delivery (deliveryNo, customerNo, createdBy, createdOn, isDeleted) VALUES (deliveryNumberParam,customerNoParam,createdByParam,createdOnParam,isDeletedParam);
                        SET @deliveryId = (SELECT LAST_INSERT_ID()); 
                  END;
          BEGIN
                        INSERT INTO shipmentdeliverymapping (shipmentId, deliveryId, customerNo, createdBy,createdOn,isDeleted) VALUES (@shipmentId,@deliveryId,customerNoParam,createdByParam,createdOnParam,isDeletedParam);
                        SET @shipmentDeliveryMappingId = (SELECT LAST_INSERT_ID()); 
          END;
                END IF;
         -- creating the trip with available tables;
          BEGIN
                        INSERT INTO trip 
                        (
							shipmentDeliveryMappingId, 
							sourceId, 
                            destinationId, 
                            vehicleNo, 
                            startDateTime, 
                            endDateTime, 
                            transporterMasterId, 
                            transporterLrNo,
                            driverMasterId, 
                            routeMasterId, 
                            tripStatusMasterId, 
                            SkuMasterId, 
                            vehicleTypeMasterId, 
                            customerNo, 
                            createdBy, 
                            createdOn, 
                            isDeleted
						) 
                        VALUES (
                        @shipmentDeliveryMappingId,
                        sourceParam,
                        destinationParam,
                        vehicleNumberParam,
                        tripStartDateTimeParam,
                        tripEndDateTimeParam,
                        transporterParam,
                        transporterLrNoParam,
                        driverParam,
                        routeParam,
                        tripStatusParam,
                        SkuMasterIdParam,
                        vehicleTypeParam,
                        customerNoParam,
                        createdByParam,
                        createdOnParam,
                        isDeletedParam
                        );
                 END;
           -- SET @shipmentId;
           -- SET testParam='OK';
            SET isInserted = 1;
			SELECT isInserted;
            select deliveryNumberParam;
        COMMIT;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `checkpointmaster`
--

CREATE TABLE `checkpointmaster` (
  `checkPointMasterId` int(11) NOT NULL,
  `checkPointName` varchar(255) NOT NULL,
  `checkPointCode` varchar(255) NOT NULL,
  `checkPointCategory` int(11) NOT NULL COMMENT 'checkPointCategoryId from checkPointCategoryMaster',
  `circularLatLong` varchar(255) DEFAULT NULL,
  `polygonalLatLong` text,
  `description` varchar(255) DEFAULT NULL,
  `customerNo` int(11) NOT NULL COMMENT 'customerId from customerMaster which is available in parent database',
  `createdBy` int(11) DEFAULT NULL COMMENT 'userMasterId from userMaster',
  `createdOn` datetime DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL COMMENT 'userMasterId from userMaster',
  `updatedOn` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 - Not Deleted, 1 - Deleted'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `checkpointmaster`
--

INSERT INTO `checkpointmaster` (`checkPointMasterId`, `checkPointName`, `checkPointCode`, `checkPointCategory`, `circularLatLong`, `polygonalLatLong`, `description`, `customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES
(1, 'Aurangabad', 'AUR', 2, NULL, '[{\"cgeolat\":\"20.10494407213445\",\"cgeolong\":\"75.6903076171875\"},{\"cgeolat\":\" 19.818390093844958\",\"cgeolong\":\" 75.79193115234375\"},{\"cgeolat\":\" 19.70595044954283\",\"cgeolong\":\" 75.74798583984375\"},{\"cgeolat\":\" 19.717585810896804\",\"cgeolong\":\" 74.88418579101562\"},{\"cgeolat\":\" 20.15007387423521\",\"cgeolong\":\" 75.0311279296875\"},{\"cgeolat\":\" 20.107523268824004\",\"cgeolong\":\" 75.6353759765625\"},{\"cgeolat\":\" 20.10494407213445\",\"cgeolong\":\" 75.6903076171875\"}]', 'Aurangabad checkpoint', 132, 1, '2019-11-14 00:00:00', 0, '0000-00-00 00:00:00', 0),
(2, 'Mumbai All', 'MUM', 2, NULL, '[{\"cgeolat\":\"19.54943746814108\",\"cgeolong\":\"72.84210205078125\"},{\"cgeolat\":\" 19.489896743079\",\"cgeolong\":\" 72.7239990234375\"},{\"cgeolat\":\" 19.352610894378625\",\"cgeolong\":\" 72.7679443359375\"},{\"cgeolat\":\" 19.329286698998857\",\"cgeolong\":\" 72.8887939453125\"},{\"cgeolat\":\" 19.35779359620928\",\"cgeolong\":\" 72.88055419921875\"},{\"cgeolat\":\" 19.339653419491878\",\"cgeolong\":\" 72.806396484375\"},{\"cgeolat\":\" 19.316327373141174\",\"cgeolong\":\" 72.762451171875\"},{\"cgeolat\":\" 19.186677697957833\",\"cgeolong\":\" 72.7679443359375\"},{\"cgeolat\":\" 19.108838815166006\",\"cgeolong\":\" 72.82562255859375\"},{\"cgeolat\":\" 18.981623204500767\",\"cgeolong\":\" 72.77069091796875\"},{\"cgeolat\":\" 18.94266018631978\",\"cgeolong\":\" 72.79541015625\"},{\"cgeolat\":\" 19.01019029439606\",\"cgeolong\":\" 72.96844482421875\"},{\"cgeolat\":\" 19.199647272639126\",\"cgeolong\":\" 72.94647216796875\"},{\"cgeolat\":\" 18.96344159561895\",\"cgeolong\":\" 72.9766845703125\"},{\"cgeolat\":\" 18.956947683286696\",\"cgeolong\":\" 73.15658569335938\"},{\"cgeolat\":\" 19.145168196205297\",\"cgeolong\":\" 73.35296630859375\"},{\"cgeolat\":\" 19.30725523364181\",\"cgeolong\":\" 73.44841003417969\"},{\"cgeolat\":\" 19.557202031700267\",\"cgeolong\":\" 73.46694946289062\"},{\"cgeolat\":\" 19.663280219987662\",\"cgeolong\":\" 73.2623291015625\"},{\"cgeolat\":\" 19.580493479202527\",\"cgeolong\":\" 72.828369140625\"},{\"cgeolat\":\" 19.526141536032494\",\"cgeolong\":\" 72.84210205078125\"},{\"cgeolat\":\" 19.54943746814108\",\"cgeolong\":\" 72.84210205078125\"}]', 'Mumbai All', 132, 1, '2019-11-14 00:00:00', 0, '0000-00-00 00:00:00', 0),
(4, 'AHMEDABAD CITY', 'AHM', 2, NULL, '[{\"cgeolat\":\"23.06689622528111\",\"cgeolong\":\"72.45590106261352\"},{\"cgeolat\":\" 23.08837390297216\",\"cgeolong\":\" 72.68661395323852\"},{\"cgeolat\":\" 22.910131946893568\",\"cgeolong\":\" 72.71133319151977\"},{\"cgeolat\":\" 22.894951563748712\",\"cgeolong\":\" 72.46414080870727\"},{\"cgeolat\":\" 23.06689622528111\",\"cgeolong\":\" 72.45590106261352\"}]', 'AHMEDABAD CITY', 132, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `deliveryId` int(11) NOT NULL,
  `deliveryNo` varchar(255) NOT NULL,
  `customerNo` int(11) NOT NULL COMMENT 'customerId from customerMaster which is available in parent database',
  `createdBy` int(11) NOT NULL COMMENT 'userMasterId from userMaster',
  `createdOn` datetime NOT NULL,
  `updatedBy` int(11) NOT NULL COMMENT 'userMasterId from userMaster',
  `updatedOn` datetime NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 - Not Deleted, 1 - Deleted'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `drivermaster`
--

CREATE TABLE `drivermaster` (
  `driverMasterId` int(11) NOT NULL,
  `DriverName` varchar(255) NOT NULL,
  `DriverMobileNo` varchar(15) NOT NULL,
  `DriverLicenseNo` varchar(20) NOT NULL,
  `simCardProvider` varchar(255) NOT NULL,
  `customerNo` int(11) NOT NULL COMMENT 'customerId from customerMaster which is available in parent database',
  `createdBy` int(11) DEFAULT NULL COMMENT 'userMasterId from userMaster',
  `createdOn` datetime DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL COMMENT 'userMasterId from userMaster',
  `updatedOn` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 - Not Deleted, 1 - Deleted'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `drivermaster`
--

INSERT INTO `drivermaster` (`driverMasterId`, `DriverName`, `DriverMobileNo`, `DriverLicenseNo`, `simCardProvider`, `customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES
(1, 'Driver 1', '5689745623', 'kjnj5415', 'Airtel', 132, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `routecheckpointmapping`
--

CREATE TABLE `routecheckpointmapping` (
  `routeCheckPointMappingId` int(11) NOT NULL,
  `routeMasterId` int(11) NOT NULL COMMENT 'routeMasterId from routeMaster table',
  `checkPointMasterId` int(11) NOT NULL COMMENT 'checkPointMasterId from checkPointMaster table',
  `eta` time NOT NULL COMMENT 'estimated time of arrival',
  `etd` time NOT NULL COMMENT 'estimated time of departure',
  `customerNo` int(11) NOT NULL COMMENT 'customerId from customerMaster which is available in parent database',
  `createdBy` int(11) NOT NULL COMMENT 'userMasterId from userMaster',
  `createdOn` datetime NOT NULL,
  `updatedBy` int(11) NOT NULL COMMENT 'userMasterId from userMaster',
  `updatedOn` datetime NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 - Not Deleted, 1 - Deleted'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `routemaster`
--

CREATE TABLE `routemaster` (
  `routeMasterId` int(11) NOT NULL,
  `routeCode` varchar(255) NOT NULL,
  `routeName` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `routeTat` varchar(255) NOT NULL,
  `customerNo` int(11) NOT NULL COMMENT 'customerId from customerMaster which is available in parent database',
  `createdBy` int(11) DEFAULT NULL COMMENT 'userMasterId from userMaster',
  `createdOn` datetime DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL COMMENT 'userMasterId from userMaster',
  `updatedOn` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 - Not Deleted, 1 - Deleted'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `routemaster`
--

INSERT INTO `routemaster` (`routeMasterId`, `routeCode`, `routeName`, `description`, `routeTat`, `customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES
(1, 'ROUTE-1', 'Test Route 1', 'Test route 1', '10', 132, NULL, NULL, NULL, NULL, 0),
(2, 'ROUTE-2', 'Test Route 2 ', 'Test Route 2 ', '12', 132, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `shipment`
--

CREATE TABLE `shipment` (
  `shipmentId` int(11) NOT NULL,
  `shipmentNo` varchar(255) NOT NULL,
  `customerNo` int(11) NOT NULL COMMENT 'customerId from customerMaster which is available in parent database',
  `createdBy` int(11) NOT NULL COMMENT 'userMasterId from userMaster',
  `createdOn` datetime DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL COMMENT 'userMasterId from userMaster',
  `updatedOn` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 - Not Deleted, 1 - Deleted'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `shipmentdeliverymapping`
--

CREATE TABLE `shipmentdeliverymapping` (
  `shipmentDeliveryMappingId` int(11) NOT NULL,
  `shipmentId` int(11) NOT NULL COMMENT ' shipmentId from shipment table',
  `deliveryId` int(11) NOT NULL COMMENT 'deliveryId from delivery table',
  `customerNo` int(11) NOT NULL COMMENT 'customerId from customerMaster which is available in parent database',
  `createdBy` int(11) NOT NULL COMMENT 'userMasterId from userMaster',
  `createdOn` datetime NOT NULL,
  `updatedBy` int(11) NOT NULL COMMENT 'userMasterId from userMaster',
  `updatedOn` datetime NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 - Not Deleted, 1 - Deleted'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transportermaster`
--

CREATE TABLE `transportermaster` (
  `transporterMasterId` int(11) NOT NULL,
  `transporterName` varchar(255) NOT NULL,
  `transporterCode` varchar(255) NOT NULL,
  `customerNo` int(11) DEFAULT NULL COMMENT 'customerId from customerMaster which is available in parent database',
  `createdBy` int(11) DEFAULT NULL COMMENT 'userMasterId from userMaster',
  `createdOn` datetime DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL COMMENT 'userMasterId from userMaster',
  `updatedOn` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 - Not Deleted, 1 - Deleted'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transportermaster`
--

INSERT INTO `transportermaster` (`transporterMasterId`, `transporterName`, `transporterCode`, `customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES
(1, 'TEST-1 transporter', 'TEST-1', 132, NULL, NULL, NULL, NULL, 0),
(2, 'TEST-2 transporter', 'TEST-2', 132, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `trip`
--

CREATE TABLE `trip` (
  `tripId` int(11) NOT NULL,
  `shipmentDeliveryMappingId` int(11) NOT NULL COMMENT 'shipmentDeliveryMappingId from shipmentDeliveryMapping table',
  `sourceId` int(11) NOT NULL COMMENT 'checkPointMasterId from checkPointMaster table',
  `destinationId` int(11) NOT NULL COMMENT 'checkPointMasterId from checkPointMaster table',
  `vehicleNo` varchar(255) NOT NULL,
  `startDateTime` datetime NOT NULL,
  `endDateTime` datetime NOT NULL,
  `transporterMasterId` int(11) DEFAULT NULL COMMENT 'transporterMasterId from transporterMaster table',
  `transporterLrNo` varchar(255) DEFAULT NULL,
  `driverMasterId` int(11) DEFAULT NULL COMMENT 'driverMasterId from driverMaster table',
  `routeMasterId` int(11) DEFAULT NULL COMMENT 'routeMasterId from routeMaster table',
  `tripStatusMasterId` int(11) NOT NULL COMMENT 'tripStatusMasterId from tripStatusMaster table',
  `SkuMasterId` int(11) DEFAULT NULL COMMENT 'SkuMasterId from SkuMaster table, This columns will contains multiple SkuMasterId in JSON format as one dispatch may contains multiple Skus',
  `vehicleTypeMasterId` int(11) DEFAULT NULL COMMENT 'vehicleTypeMaster from vehicleTypeMaster table',
  `customerNo` int(11) NOT NULL COMMENT 'customerId from customerMaster which is available in parent database',
  `createdBy` int(11) DEFAULT NULL COMMENT 'userMasterId from userMaster',
  `createdOn` datetime DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL COMMENT 'userMasterId from userMaster',
  `updatedOn` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 - Not Deleted, 1 - Deleted'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tripstatusmaster`
--

CREATE TABLE `tripstatusmaster` (
  `tripStatusMasterId` int(11) NOT NULL,
  `statusName` varchar(255) NOT NULL,
  `customerNo` int(11) NOT NULL COMMENT 'customerId from customerMaster which is available in parent database',
  `createdBy` int(11) NOT NULL COMMENT 'userMasterId from userMaster',
  `createdOn` datetime NOT NULL,
  `updatedBy` int(11) NOT NULL COMMENT 'userMasterId from userMaster',
  `updatedOn` datetime NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 - Not Deleted, 1 - Deleted'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `usermaster`
--

CREATE TABLE `usermaster` (
  `userMasterId` int(11) NOT NULL,
  `userNo` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userRealName` varchar(255) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userMobileNo` varchar(15) NOT NULL,
  `customerNo` int(11) NOT NULL COMMENT 'customerId from customerMaster which is available in parent database',
  `createdBy` int(11) NOT NULL COMMENT 'userMasterId from userMaster',
  `createdOn` datetime NOT NULL,
  `updatedBy` int(11) NOT NULL COMMENT 'userMasterId from userMaster',
  `updatedOn` datetime NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 - Not Deleted, 1 - Deleted'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vehicletypemaster`
--

CREATE TABLE `vehicletypemaster` (
  `vehicleTypeMasterId` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `customerNo` int(11) NOT NULL COMMENT 'customerId from customerMaster which is available in parent database',
  `createdBy` int(11) DEFAULT NULL COMMENT 'userMasterId from userMaster',
  `createdOn` datetime DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL COMMENT 'userMasterId from userMaster',
  `updatedOn` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 - Not Deleted, 1 - Deleted'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicletypemaster`
--

INSERT INTO `vehicletypemaster` (`vehicleTypeMasterId`, `type`, `description`, `customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES
(1, 'Class 1- GVWR', 'Class 1- GVWR', 132, NULL, NULL, NULL, NULL, 0),
(2, 'Class 2- GVWR', 'Class 2- GVWR', 132, NULL, NULL, NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `checkpointmaster`
--
ALTER TABLE `checkpointmaster`
  ADD PRIMARY KEY (`checkPointMasterId`);

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`deliveryId`);

--
-- Indexes for table `drivermaster`
--
ALTER TABLE `drivermaster`
  ADD PRIMARY KEY (`driverMasterId`);

--
-- Indexes for table `routecheckpointmapping`
--
ALTER TABLE `routecheckpointmapping`
  ADD PRIMARY KEY (`routeCheckPointMappingId`);

--
-- Indexes for table `routemaster`
--
ALTER TABLE `routemaster`
  ADD PRIMARY KEY (`routeMasterId`);

--
-- Indexes for table `shipment`
--
ALTER TABLE `shipment`
  ADD PRIMARY KEY (`shipmentId`);

--
-- Indexes for table `shipmentdeliverymapping`
--
ALTER TABLE `shipmentdeliverymapping`
  ADD PRIMARY KEY (`shipmentDeliveryMappingId`);

--
-- Indexes for table `transportermaster`
--
ALTER TABLE `transportermaster`
  ADD PRIMARY KEY (`transporterMasterId`);

--
-- Indexes for table `trip`
--
ALTER TABLE `trip`
  ADD PRIMARY KEY (`tripId`);

--
-- Indexes for table `tripstatusmaster`
--
ALTER TABLE `tripstatusmaster`
  ADD PRIMARY KEY (`tripStatusMasterId`);

--
-- Indexes for table `usermaster`
--
ALTER TABLE `usermaster`
  ADD PRIMARY KEY (`userMasterId`);

--
-- Indexes for table `vehicletypemaster`
--
ALTER TABLE `vehicletypemaster`
  ADD PRIMARY KEY (`vehicleTypeMasterId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `checkpointmaster`
--
ALTER TABLE `checkpointmaster`
  MODIFY `checkPointMasterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `deliveryId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `drivermaster`
--
ALTER TABLE `drivermaster`
  MODIFY `driverMasterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `routecheckpointmapping`
--
ALTER TABLE `routecheckpointmapping`
  MODIFY `routeCheckPointMappingId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `routemaster`
--
ALTER TABLE `routemaster`
  MODIFY `routeMasterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shipment`
--
ALTER TABLE `shipment`
  MODIFY `shipmentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipmentdeliverymapping`
--
ALTER TABLE `shipmentdeliverymapping`
  MODIFY `shipmentDeliveryMappingId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transportermaster`
--
ALTER TABLE `transportermaster`
  MODIFY `transporterMasterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `trip`
--
ALTER TABLE `trip`
  MODIFY `tripId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tripstatusmaster`
--
ALTER TABLE `tripstatusmaster`
  MODIFY `tripStatusMasterId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usermaster`
--
ALTER TABLE `usermaster`
  MODIFY `userMasterId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicletypemaster`
--
ALTER TABLE `vehicletypemaster`
  MODIFY `vehicleTypeMasterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
