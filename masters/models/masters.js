const mysql = require("mysql");

module.exports.insertCheckPointMasterQuery = function(connection, req) {
  if (connection) {
    let sql =
      "INSERT INTO checkpointmaster(checkPointMasterId, checkPointName, checkPointCode, checkPointCategory, circularLatLong, polygonalLatLong, description, customerNo, createdBy, createdOn, updatedBy, updatedOn, isDeleted)VALUES (null,'" +
      req.body.checkPointName +
      "','" +
      req.body.checkPointCode +
      "','" +
      req.body.checkPointCategory +
      "','" +
      req.body.circularLatLong +
      "','" +
      req.body.polygonalLatLong +
      "','" +
      req.body.description +
      "','" +
      req.body.customerNo +
      "','" +
      req.body.createdBy +
      "','" +
      req.body.createdOn +
      "','" +
      req.body.updatedBy +
      "','" +
      req.body.updatedOn +
      "','" +
      req.body.isDeleted +
      "')";
    return sql;
  }
};

module.exports.updateCheckPointMasterQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and checkPointMasterId = '" +
      req.body.checkPointMasterId +
      "' ";
    let sql = "update checkPointMaster set ";

    if (
      typeof req.body.checkPointName != "undefined" &&
      req.body.checkPointName != ""
    ) {
      sql += "checkPointName = '" + req.body.checkPointName + "'";
      //where += " and checkPointName = '"+req.body.checkPointName+"'";
    }

    if (
      typeof req.body.checkPointCode != "undefined" &&
      req.body.checkPointCode != ""
    ) {
      sql += ",checkPointCode = '" + req.body.checkPointCode + "'";
      // where += " and checkPointCode = '"+req.body.checkPointCode+"'";
    }

    if (
      typeof req.body.checkPointCategory != "undefined" &&
      req.body.checkPointCategory != ""
    ) {
      sql += ",checkPointCategory = '" + req.body.checkPointCategory + "'";
      //  where += " and checkPointCategory = '"+req.body.checkPointCategory+"'";
    }

    if (
      typeof req.body.circularLatLong != "undefined" &&
      req.body.circularLatLong != ""
    ) {
      sql += "circularLatLong = '" + req.body.circularLatLong + "'";
    }

    if (
      typeof req.body.polygonalLatLong != "undefined" &&
      req.body.polygonalLatLong != ""
    ) {
      sql += ",polygonalLatLong = '" + req.body.polygonalLatLong + "'";
    }

    if (
      typeof req.body.description != "undefined" &&
      req.body.description != ""
    ) {
      sql += ",description = '" + req.body.description + "'";
    }

    sql += where;

    return sql;
  }
};

module.exports.deleteCheckPointMasterQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and checkPointMasterId = '" +
      req.body.checkPointMasterId +
      "' ";
    let sql = "delete from checkpointmaster  ";
    sql += where;
    return sql;
  }
};

module.exports.getCheckPointMasterQuery = function(connection, req) {
  if (connection) {
    if (typeof req.body.checkPointMasterId !== "undefined") {
      var where =
        " Where 1 = 1 and checkPointMasterId = '" +
        req.body.checkPointMasterId +
        "' ";
    } else {
      var where = " Where 1 = 1 order by checkPointMasterId ASC ";
    }
    let sql = "SELECT * from checkpointmaster ";
    sql += where;
    return sql;
  }
};

module.exports.insertRouteMasterQuery = function(connection, req) {
  if (connection) {
    let sql =
      "INSERT INTO `routemaster` (`routeMasterId`, `routeCode`, `routeName`, `description`, `routeTat`, `customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES (NULL, '" +
      req.body.routeCode +
      "', '" +
      req.body.routeName +
      "', '" +
      req.body.description +
      "', '" +
      req.body.routeTat +
      "', '" +
      req.body.customerNo +
      "', '" +
      req.body.createdBy +
      "', '" +
      req.body.createdOn +
      "', '" +
      req.body.updatedBy +
      "', '" +
      req.body.updatedOn +
      "', '" +
      req.body.isDeleted +
      "');";
    return sql;
  }
};

module.exports.updateRouteMasterQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and routeMasterId = '" + req.body.routeMasterId + "' ";
    let sql = "update routemaster set ";

    if (typeof req.body.routeName != "undefined" && req.body.routeName != "") {
      sql += "routeName = '" + req.body.routeName + "'";
      //where += " and checkPointName = '"+req.body.checkPointName+"'";
    }

    if (typeof req.body.routeCode != "undefined" && req.body.routeCode != "") {
      sql += ",routeCode = '" + req.body.routeCode + "'";
      // where += " and checkPointCode = '"+req.body.checkPointCode+"'";
    }

    if (typeof req.body.routeTat != "undefined" && req.body.routeTat != "") {
      sql += ",routeTat = '" + req.body.routeTat + "'";
      //  where += " and checkPointCategory = '"+req.body.checkPointCategory+"'";
    }

    if (
      typeof req.body.customerNo != "undefined" &&
      req.body.customerNo != ""
    ) {
      sql += ",customerNo = '" + req.body.customerNo + "'";
    }

    if (typeof req.body.createdBy != "undefined" && req.body.createdBy != "") {
      sql += ",createdBy = '" + req.body.createdBy + "'";
    }

    if (typeof req.body.createdOn != "undefined" && req.body.createdOn != "") {
      sql += ",createdOn = '" + req.body.createdOn + "'";
    }

    if (typeof req.body.updatedOn != "undefined" && req.body.updatedOn != "") {
      sql += ",updatedOn = '" + req.body.updatedOn + "'";
    }

    if (typeof req.body.updatedBy != "undefined" && req.body.updatedBy != "") {
      sql += ",updatedBy = '" + req.body.updatedBy + "'";
    }

    if (typeof req.body.isDeleted != "undefined" && req.body.isDeleted != "") {
      sql += ",isDeleted = '" + req.body.isDeleted + "'";
    }

    sql += where;

    return sql;
  }
};

module.exports.deleteRouteMasterQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and routeMasterId = '" + req.body.routeMasterId + "' ";
    let sql = "delete from routemaster  ";
    sql += where;
    return sql;
  }
};

module.exports.getRouteMasterQuery = function(connection, req) {
  if (connection) {
    if (typeof req.body.routeMasterId != "undefined") {
      var where =
        " Where 1 = 1 and routeMasterId = '" + req.body.routeMasterId + "' ";
    } else {
      var where = " Where 1 = 1 order by routeMasterId ASC";
    }

    let sql = "SELECT * from routemaster ";
    sql += where;
    return sql;
  }
};

module.exports.insertShipmentMasterQuery = function(connection, req) {
  if (connection) {
    let sql =
      "INSERT INTO `shipment` (`shipmentId`, `shipmentNo`, `customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES (NULL, '" +
      req.body.shipmentNo +
      "', '" +
      req.body.customerNo +
      "', '" +
      req.body.createdBy +
      "', '" +
      req.body.createdOn +
      "', '" +
      req.body.updatedBy +
      "', '" +
      req.body.updatedOn +
      "', '" +
      req.body.isDeleted +
      "');";
    return sql;
  }
};

module.exports.updateShipmentMasterQuery = function(connection, req) {
  if (connection) {
    let where = " Where 1 = 1 and shipmentId = '" + req.body.shipmentId + "' ";
    let sql = "update shipment set ";

    if (
      typeof req.body.shipmentNo != "undefined" &&
      req.body.shipmentNo != ""
    ) {
      sql += "shipmentNo = '" + req.body.shipmentNo + "'";
      //where += " and checkPointName = '"+req.body.checkPointName+"'";
    }

    if (
      typeof req.body.customerNo != "undefined" &&
      req.body.customerNo != ""
    ) {
      sql += ",customerNo = '" + req.body.customerNo + "'";
    }

    if (typeof req.body.createdBy != "undefined" && req.body.createdBy != "") {
      sql += ",createdBy = '" + req.body.createdBy + "'";
    }

    if (typeof req.body.createdOn != "undefined" && req.body.createdOn != "") {
      sql += ",createdOn = '" + req.body.createdOn + "'";
    }

    if (typeof req.body.updatedOn != "undefined" && req.body.updatedOn != "") {
      sql += ",updatedOn = '" + req.body.updatedOn + "'";
    }

    if (typeof req.body.updatedBy != "undefined" && req.body.updatedBy != "") {
      sql += ",updatedBy = '" + req.body.updatedBy + "'";
    }

    if (typeof req.body.isDeleted != "undefined" && req.body.isDeleted != "") {
      sql += ",isDeleted = '" + req.body.isDeleted + "'";
    }

    sql += where;

    return sql;
  }
};

module.exports.deleteShipmentMasterQuery = function(connection, req) {
  if (connection) {
    let where = " Where 1 = 1 and shipmentId = '" + req.body.shipmentId + "' ";
    let sql = "delete from shipment  ";
    sql += where;
    return sql;
  }
};

module.exports.getShipmentMasterQuery = function(connection, req) {
  if (connection) {
    if (typeof req.body.shipmentId !== "undefined") {
      var where =
        " Where 1 = 1 and shipmentId = '" + req.body.shipmentId + "' ";
    } else {
      var where = " order by shipmentId ";
    }

    let sql = "SELECT * from shipment ";
    sql += where;
    return sql;
  }
};

module.exports.insertDeliveryQuery = function(connection, req) {
  if (connection) {
    let sql =
      "INSERT INTO `delivery` (`deliveryId`, `deliveryNo`, `customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES (NULL, '" +
      req.body.deliveryNo +
      "', '" +
      req.body.customerNo +
      "', '" +
      req.body.createdBy +
      "', '" +
      req.body.createdOn +
      "', '" +
      req.body.updatedBy +
      "', '" +
      req.body.updatedOn +
      "', '" +
      req.body.isDeleted +
      "');";
    return sql;
  }
};

module.exports.updateDeliveryQuery = function(connection, req) {
  if (connection) {
    let where = " Where 1 = 1 and deliveryId = '" + req.body.deliveryId + "' ";
    let sql = "update delivery set ";

    if (
      typeof req.body.deliveryNo != "undefined" &&
      req.body.deliveryNo != ""
    ) {
      sql += "deliveryNo = '" + req.body.deliveryNo + "'";
      //where += " and checkPointName = '"+req.body.checkPointName+"'";
    }

    if (
      typeof req.body.customerNo != "undefined" &&
      req.body.customerNo != ""
    ) {
      sql += ",customerNo = '" + req.body.customerNo + "'";
    }

    if (typeof req.body.createdBy != "undefined" && req.body.createdBy != "") {
      sql += ",createdBy = '" + req.body.createdBy + "'";
    }

    if (typeof req.body.createdOn != "undefined" && req.body.createdOn != "") {
      sql += ",createdOn = '" + req.body.createdOn + "'";
    }

    if (typeof req.body.updatedOn != "undefined" && req.body.updatedOn != "") {
      sql += ",updatedOn = '" + req.body.updatedOn + "'";
    }

    if (typeof req.body.updatedBy != "undefined" && req.body.updatedBy != "") {
      sql += ",updatedBy = '" + req.body.updatedBy + "'";
    }

    if (typeof req.body.isDeleted != "undefined" && req.body.isDeleted != "") {
      sql += ",isDeleted = '" + req.body.isDeleted + "'";
    }

    sql += where;

    return sql;
  }
};

module.exports.deleteDeliveryQuery = function(connection, req) {
  if (connection) {
    let where = " Where 1 = 1 and deliveryId = '" + req.body.deliveryId + "' ";
    let sql = "delete from delivery  ";
    sql += where;
    return sql;
  }
};

module.exports.getDeliveryQuery = function(connection, req) {
  if (connection) {
    if (typeof req.body.deliveryId !== "undefined") {
      var where =
        " Where 1 = 1 and deliveryId = '" + req.body.deliveryId + "' ";
    } else {
      var where = " order by deliveryId  ";
    }

    let sql = "SELECT * from delivery ";
    sql += where;
    return sql;
  }
};

module.exports.insertDriverMasterQuery = function(connection, req) {
  if (connection) {
    let sql =
      "INSERT INTO `drivermaster` (`driverMasterId`, `DriverName`, `DriverMobileNo`, `DriverLicenseNo`, `simCardProvider`, `customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES (NULL, '" +
      req.body.DriverName +
      "', '" +
      req.body.DriverMobileNo +
      "', '" +
      req.body.DriverLicenseNo +
      "', '" +
      req.body.simCardProvider +
      "', '" +
      req.body.customerNo +
      "', '" +
      req.body.createdBy +
      "', '" +
      req.body.createdOn +
      "', '" +
      req.body.updatedBy +
      "', '" +
      req.body.updatedOn +
      "', '" +
      req.body.isDeleted +
      "');";
    return sql;
  }
};

module.exports.updateDriverMasterQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and driverMasterId = '" + req.body.driverMasterId + "' ";
    let sql = "update drivermaster set ";

    if (
      typeof req.body.DriverName != "undefined" &&
      req.body.DriverName != ""
    ) {
      sql += "DriverName = '" + req.body.DriverName + "'";
    }

    if (
      typeof req.body.DriverMobileNo != "undefined" &&
      req.body.DriverMobileNo != ""
    ) {
      sql += ", DriverMobileNo = '" + req.body.DriverMobileNo + "'";
    }

    if (
      typeof req.body.DriverLicenseNo != "undefined" &&
      req.body.DriverLicenseNo != ""
    ) {
      sql += ", DriverLicenseNo = '" + req.body.DriverLicenseNo + "'";
    }

    if (
      typeof req.body.simCardProvider != "undefined" &&
      req.body.simCardProvider != ""
    ) {
      sql += ", simCardProvider = '" + req.body.simCardProvider + "'";
    }

    if (
      typeof req.body.customerNo != "undefined" &&
      req.body.customerNo != ""
    ) {
      sql += ",customerNo = '" + req.body.customerNo + "'";
    }

    if (typeof req.body.createdBy != "undefined" && req.body.createdBy != "") {
      sql += ",createdBy = '" + req.body.createdBy + "'";
    }

    if (typeof req.body.createdOn != "undefined" && req.body.createdOn != "") {
      sql += ",createdOn = '" + req.body.createdOn + "'";
    }

    if (typeof req.body.updatedOn != "undefined" && req.body.updatedOn != "") {
      sql += ",updatedOn = '" + req.body.updatedOn + "'";
    }

    if (typeof req.body.updatedBy != "undefined" && req.body.updatedBy != "") {
      sql += ",updatedBy = '" + req.body.updatedBy + "'";
    }

    if (typeof req.body.isDeleted != "undefined" && req.body.isDeleted != "") {
      sql += ",isDeleted = '" + req.body.isDeleted + "'";
    }

    sql += where;

    return sql;
  }
};

module.exports.deleteDeliveryQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and driverMasterId = '" + req.body.driverMasterId + "' ";
    let sql = "delete from drivermaster  ";
    sql += where;
    return sql;
  }
};

module.exports.getDriverMasterQuery = function(connection, req) {
  if (connection) {
    if (typeof req.body.driverMasterId !== "undefined") {
      var where =
        " Where 1 = 1 and driverMasterId = '" + req.body.driverMasterId + "' ";
    } else {
      var where = " order by driverMasterId";
    }

    let sql = "SELECT * from drivermaster ";
    sql += where;
    return sql;
  }
};

module.exports.insertShipmentDeliveryMappingQuery = function(connection, req) {
  if (connection) {
    let sql =
      "INSERT INTO `shipmentdeliverymapping` (`shipmentDeliveryMappingId`, `shipmentId`, `deliveryId`,  `customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES (NULL, '" +
      req.body.shipmentId +
      "', '" +
      req.body.deliveryId +
      "', '" +
      req.body.customerNo +
      "', '" +
      req.body.createdBy +
      "', '" +
      req.body.createdOn +
      "', '" +
      req.body.updatedBy +
      "', '" +
      req.body.updatedOn +
      "', '" +
      req.body.isDeleted +
      "');";
    return sql;
  }
};

module.exports.updateShipmentDeliveryMappingQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and shipmentDeliveryMappingId = '" +
      req.body.shipmentDeliveryMappingId +
      "' ";
    let sql = "update shipmentdeliverymapping set ";

    if (
      typeof req.body.shipmentId != "undefined" &&
      req.body.shipmentId != ""
    ) {
      sql += "shipmentId = '" + req.body.shipmentId + "'";
    }

    if (
      typeof req.body.deliveryId != "undefined" &&
      req.body.deliveryId != ""
    ) {
      sql += ", deliveryId = '" + req.body.deliveryId + "'";
    }

    if (
      typeof req.body.customerNo != "undefined" &&
      req.body.customerNo != ""
    ) {
      sql += ",customerNo = '" + req.body.customerNo + "'";
    }

    if (typeof req.body.createdBy != "undefined" && req.body.createdBy != "") {
      sql += ",createdBy = '" + req.body.createdBy + "'";
    }

    if (typeof req.body.createdOn != "undefined" && req.body.createdOn != "") {
      sql += ",createdOn = '" + req.body.createdOn + "'";
    }

    if (typeof req.body.updatedOn != "undefined" && req.body.updatedOn != "") {
      sql += ",updatedOn = '" + req.body.updatedOn + "'";
    }

    if (typeof req.body.updatedBy != "undefined" && req.body.updatedBy != "") {
      sql += ",updatedBy = '" + req.body.updatedBy + "'";
    }

    if (typeof req.body.isDeleted != "undefined" && req.body.isDeleted != "") {
      sql += ",isDeleted = '" + req.body.isDeleted + "'";
    }

    sql += where;

    return sql;
  }
};

module.exports.deleteShipmentDeliveryMappingQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and shipmentDeliveryMappingId = '" +
      req.body.shipmentDeliveryMappingId +
      "' ";
    let sql = "delete from shipmentdeliverymapping  ";
    sql += where;
    return sql;
  }
};

module.exports.getShipmentDeliveryMappingQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and shipmentDeliveryMappingId = '" +
      req.body.shipmentDeliveryMappingId +
      "' ";
    let sql = "SELECT * from shipmentdeliverymapping ";
    sql += where;
    return sql;
  }
};

module.exports.insertTransporterMasterQuery = function(connection, req) {
  if (connection) {
    let sql =
      "INSERT INTO `transportermaster` (`transporterMasterId`, `transporterName`, `transporterCode`,  `customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES (NULL, '" +
      req.body.transporterName +
      "', '" +
      req.body.transporterCode +
      "', '" +
      req.body.customerNo +
      "', '" +
      req.body.createdBy +
      "', '" +
      req.body.createdOn +
      "', '" +
      req.body.updatedBy +
      "', '" +
      req.body.updatedOn +
      "', '" +
      req.body.isDeleted +
      "');";
    return sql;
  }
};

module.exports.updateTransporterMasterQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and transporterMasterId = '" +
      req.body.transporterMasterId +
      "' ";
    let sql = "update transportermaster set ";

    if (
      typeof req.body.transporterName != "undefined" &&
      req.body.transporterName != ""
    ) {
      sql += "transporterName = '" + req.body.transporterName + "'";
    }

    if (
      typeof req.body.transporterCode != "undefined" &&
      req.body.transporterCode != ""
    ) {
      sql += ", transporterCode = '" + req.body.transporterCode + "'";
    }

    if (
      typeof req.body.customerNo != "undefined" &&
      req.body.customerNo != ""
    ) {
      sql += ",customerNo = '" + req.body.customerNo + "'";
    }

    if (typeof req.body.createdBy != "undefined" && req.body.createdBy != "") {
      sql += ",createdBy = '" + req.body.createdBy + "'";
    }

    if (typeof req.body.createdOn != "undefined" && req.body.createdOn != "") {
      sql += ",createdOn = '" + req.body.createdOn + "'";
    }

    if (typeof req.body.updatedOn != "undefined" && req.body.updatedOn != "") {
      sql += ",updatedOn = '" + req.body.updatedOn + "'";
    }

    if (typeof req.body.updatedBy != "undefined" && req.body.updatedBy != "") {
      sql += ",updatedBy = '" + req.body.updatedBy + "'";
    }

    if (typeof req.body.isDeleted != "undefined" && req.body.isDeleted != "") {
      sql += ",isDeleted = '" + req.body.isDeleted + "'";
    }

    sql += where;

    return sql;
  }
};

module.exports.deleteTransporterMasterQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and transporterMasterId = '" +
      req.body.transporterMasterId +
      "' ";
    let sql = "delete from transportermaster  ";
    sql += where;
    return sql;
  }
};

module.exports.getTransporterMasterQuery = function(connection, req) {
  if (connection) {
    if (typeof req.body.transporterMasterId !== "undefined") {
      var where =
        " Where 1 = 1 and transporterMasterId = '" +
        req.body.transporterMasterId +
        "' ";
    } else {
      var where = " order by transporterMasterId";
    }

    let sql = "SELECT * from transportermaster ";
    sql += where;
    return sql;
  }
};

module.exports.insertRouteCheckpointMappingQuery = function(connection, req) {
  if (connection) {
    let sql =
      "INSERT INTO `routecheckpointmapping` (`routeCheckPointMappingId`, `routeMasterId`, `checkPointMasterId`, `eta`, `etd`, `customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES (NULL, '" +
      req.body.routeMasterId +
      "', '" +
      req.body.checkPointMasterId +
      "', '" +
      req.body.eta +
      "','" +
      req.body.etd +
      "','" +
      req.body.customerNo +
      "', '" +
      req.body.createdBy +
      "', '" +
      req.body.createdOn +
      "', '" +
      req.body.updatedBy +
      "', '" +
      req.body.updatedOn +
      "', '" +
      req.body.isDeleted +
      "');";
    return sql;
  }
};

module.exports.updateRouteCheckpointMappingQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and routeCheckPointMappingId = '" +
      req.body.routeCheckPointMappingId +
      "' ";
    let sql = "update routecheckpointmapping set ";

    if (
      typeof req.body.routeMasterId != "undefined" &&
      req.body.routeMasterId != ""
    ) {
      sql += "routeMasterId = '" + req.body.routeMasterId + "'";
    }

    if (
      typeof req.body.checkPointMasterId != "undefined" &&
      req.body.checkPointMasterId != ""
    ) {
      sql += ", checkPointMasterId = '" + req.body.checkPointMasterId + "'";
    }

    if (typeof req.body.eta != "undefined" && req.body.eta != "") {
      sql += ", eta = '" + req.body.eta + "'";
    }

    if (typeof req.body.etd != "undefined" && req.body.etd != "") {
      sql += ", etd = '" + req.body.etd + "'";
    }

    if (
      typeof req.body.customerNo != "undefined" &&
      req.body.customerNo != ""
    ) {
      sql += ",customerNo = '" + req.body.customerNo + "'";
    }

    if (typeof req.body.createdBy != "undefined" && req.body.createdBy != "") {
      sql += ",createdBy = '" + req.body.createdBy + "'";
    }

    if (typeof req.body.createdOn != "undefined" && req.body.createdOn != "") {
      sql += ",createdOn = '" + req.body.createdOn + "'";
    }

    if (typeof req.body.updatedOn != "undefined" && req.body.updatedOn != "") {
      sql += ",updatedOn = '" + req.body.updatedOn + "'";
    }

    if (typeof req.body.updatedBy != "undefined" && req.body.updatedBy != "") {
      sql += ",updatedBy = '" + req.body.updatedBy + "'";
    }

    if (typeof req.body.isDeleted != "undefined" && req.body.isDeleted != "") {
      sql += ",isDeleted = '" + req.body.isDeleted + "'";
    }

    sql += where;

    return sql;
  }
};

module.exports.deleteRouteCheckpointMappingQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and routeCheckPointMappingId = '" +
      req.body.routeCheckPointMappingId +
      "' ";
    let sql = "delete from routecheckpointmapping  ";
    sql += where;
    return sql;
  }
};

module.exports.getRouteCheckpointMappingQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and routeCheckPointMappingId = '" +
      req.body.routeCheckPointMappingId +
      "' ";
    let sql = "SELECT * from routecheckpointmapping ";
    sql += where;
    return sql;
  }
};

module.exports.insertTripQuery = function(connection, req) {
  if (connection) {
    let sql =
      "INSERT INTO `trip` (`tripId`, `shipmentDeliveryMappingId`, `sourceId`, `destinationId`, `vehicleNo`, `startDateTime`,`endDateTime`,`transporterMasterId`,`driverMasterId`,`routeMasterId`,`tripStatusMasterId`,`SkuMasterId`,`vehicleTypeMasterId`, `customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES (NULL, '" +
      req.body.shipmentDeliveryMappingId +
      "', '" +
      req.body.sourceId +
      "', '" +
      req.body.destinationId +
      "','" +
      req.body.vehicleNo +
      "','" +
      req.body.startDateTime +
      "','" +
      req.body.endDateTime +
      "','" +
      req.body.transporterMasterId +
      "','" +
      req.body.driverMasterId +
      "','" +
      req.body.routeMasterId +
      "','" +
      req.body.tripStatusMasterId +
      "','" +
      req.body.SkuMasterId +
      "','" +
      req.body.vehicleTypeMasterId +
      "','" +
      req.body.customerNo +
      "', '" +
      req.body.createdBy +
      "', '" +
      req.body.createdOn +
      "', '" +
      req.body.updatedBy +
      "', '" +
      req.body.updatedOn +
      "', '" +
      req.body.isDeleted +
      "');";
    return sql;
  }
};

module.exports.updateTripQuery = function(connection, req) {
  if (connection) {
    let where = " Where 1 = 1 and tripId = '" + req.body.tripId + "' ";
    let sql = "update trip set ";

    if (
      typeof req.body.shipmentDeliveryMappingId != "undefined" &&
      req.body.shipmentDeliveryMappingId != ""
    ) {
      sql +=
        "shipmentDeliveryMappingId = '" +
        req.body.shipmentDeliveryMappingId +
        "'";
    }

    if (typeof req.body.sourceId != "undefined" && req.body.sourceId != "") {
      sql += ", sourceId = '" + req.body.sourceId + "'";
    }

    if (
      typeof req.body.destinationId != "undefined" &&
      req.body.destinationId != ""
    ) {
      sql += ", destinationId = '" + req.body.destinationId + "'";
    }

    if (typeof req.body.vehicleNo != "undefined" && req.body.vehicleNo != "") {
      sql += ", vehicleNo = '" + req.body.vehicleNo + "'";
    }

    if (
      typeof req.body.startDateTime != "undefined" &&
      req.body.startDateTime != ""
    ) {
      sql += ", startDateTime = '" + req.body.startDateTime + "'";
    }

    if (
      typeof req.body.endDateTime != "undefined" &&
      req.body.endDateTime != ""
    ) {
      sql += ", endDateTime = '" + req.body.endDateTime + "'";
    }

    if (
      typeof req.body.transporterMasterId != "undefined" &&
      req.body.transporterMasterId != ""
    ) {
      sql += ", transporterMasterId = '" + req.body.transporterMasterId + "'";
    }

    if (
      typeof req.body.driverMasterId != "undefined" &&
      req.body.driverMasterId != ""
    ) {
      sql += ", driverMasterId = '" + req.body.driverMasterId + "'";
    }

    if (
      typeof req.body.routeMasterId != "undefined" &&
      req.body.routeMasterId != ""
    ) {
      sql += ", routeMasterId = '" + req.body.routeMasterId + "'";
    }

    if (
      typeof req.body.tripStatusMasterId != "undefined" &&
      req.body.tripStatusMasterId != ""
    ) {
      sql += ", tripStatusMasterId = '" + req.body.tripStatusMasterId + "'";
    }

    if (
      typeof req.body.SkuMasterId != "undefined" &&
      req.body.SkuMasterId != ""
    ) {
      sql += ", SkuMasterId = '" + req.body.SkuMasterId + "'";
    }

    if (
      typeof req.body.vehicleTypeMasterId != "undefined" &&
      req.body.vehicleTypeMasterId != ""
    ) {
      sql += ", vehicleTypeMasterId = '" + req.body.vehicleTypeMasterId + "'";
    }

    if (
      typeof req.body.customerNo != "undefined" &&
      req.body.customerNo != ""
    ) {
      sql += ",customerNo = '" + req.body.customerNo + "'";
    }

    if (typeof req.body.createdBy != "undefined" && req.body.createdBy != "") {
      sql += ",createdBy = '" + req.body.createdBy + "'";
    }

    if (typeof req.body.createdOn != "undefined" && req.body.createdOn != "") {
      sql += ",createdOn = '" + req.body.createdOn + "'";
    }

    if (typeof req.body.updatedOn != "undefined" && req.body.updatedOn != "") {
      sql += ",updatedOn = '" + req.body.updatedOn + "'";
    }

    if (typeof req.body.updatedBy != "undefined" && req.body.updatedBy != "") {
      sql += ",updatedBy = '" + req.body.updatedBy + "'";
    }

    if (typeof req.body.isDeleted != "undefined" && req.body.isDeleted != "") {
      sql += ",isDeleted = '" + req.body.isDeleted + "'";
    }

    sql += where;

    return sql;
  }
};

module.exports.deleteTripQuery = function(connection, req) {
  if (connection) {
    let where = " Where 1 = 1 and tripId = '" + req.body.tripId + "' ";
    let sql = "delete from trip  ";
    sql += where;
    return sql;
  }
};

module.exports.getTripQuery = function(connection, req) {
  if (connection) {
    if (typeof req.body.tripId !== "undefined") {
      var where = " Where 1 = 1 and tripId = '" + req.body.tripId + "' ";
    } else {
      var where = " order by tripId";
    }

    let sql = "SELECT * from trip ";
    sql += where;
    return sql;
  }
};

module.exports.insertTripStatusMasterQuery = function(connection, req) {
  if (connection) {
    let sql =
      "INSERT INTO `tripstatusmaster` (`tripStatusMasterId`, `statusName`, `customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES (NULL, '" +
      req.body.statusName +
      "','" +
      req.body.customerNo +
      "', '" +
      req.body.createdBy +
      "', '" +
      req.body.createdOn +
      "', '" +
      req.body.updatedBy +
      "', '" +
      req.body.updatedOn +
      "', '" +
      req.body.isDeleted +
      "');";
    return sql;
  }
};

module.exports.updateTripStatusMasterQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and tripStatusMasterId = '" +
      req.body.tripStatusMasterId +
      "' ";
    let sql = "update tripstatusmaster set ";

    if (
      typeof req.body.statusName != "undefined" &&
      req.body.statusName != ""
    ) {
      sql += "statusName = '" + req.body.statusName + "'";
    }

    if (
      typeof req.body.customerNo != "undefined" &&
      req.body.customerNo != ""
    ) {
      sql += ",customerNo = '" + req.body.customerNo + "'";
    }

    if (typeof req.body.createdBy != "undefined" && req.body.createdBy != "") {
      sql += ",createdBy = '" + req.body.createdBy + "'";
    }

    if (typeof req.body.createdOn != "undefined" && req.body.createdOn != "") {
      sql += ",createdOn = '" + req.body.createdOn + "'";
    }

    if (typeof req.body.updatedOn != "undefined" && req.body.updatedOn != "") {
      sql += ",updatedOn = '" + req.body.updatedOn + "'";
    }

    if (typeof req.body.updatedBy != "undefined" && req.body.updatedBy != "") {
      sql += ",updatedBy = '" + req.body.updatedBy + "'";
    }

    if (typeof req.body.isDeleted != "undefined" && req.body.isDeleted != "") {
      sql += ",isDeleted = '" + req.body.isDeleted + "'";
    }

    sql += where;

    return sql;
  }
};

module.exports.deleteTripStatusMasterQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and tripStatusMasterId = '" +
      req.body.tripStatusMasterId +
      "' ";
    let sql = "delete from tripstatusmaster  ";
    sql += where;
    return sql;
  }
};

module.exports.getTripStatusMasterQuery = function(connection, req) {
  if (connection) {
    if (typeof req.body.tripStatusMasterId !== "undefined") {
      var where =
        " Where 1 = 1 and tripStatusMasterId = '" +
        req.body.tripStatusMasterId +
        "' ";
    } else {
      var where = " order by tripStatusMasterId";
    }

    let sql = "SELECT * from tripstatusmaster ";
    sql += where;
    return sql;
  }
};

module.exports.insertVehicleTypeMasterQuery = function(connection, req) {
  if (connection) {
    let sql =
      "INSERT INTO `vehicletypemaster` (`vehicleTypeMasterId`, `type`, `description`,`customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES (NULL, '" +
      req.body.type +
      "','" +
      req.body.description +
      "','" +
      req.body.customerNo +
      "', '" +
      req.body.createdBy +
      "', '" +
      req.body.createdOn +
      "', '" +
      req.body.updatedBy +
      "', '" +
      req.body.updatedOn +
      "', '" +
      req.body.isDeleted +
      "');";
    return sql;
  }
};

module.exports.updateVehicleTypeMasterQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and vehicleTypeMasterId = '" +
      req.body.vehicleTypeMasterId +
      "' ";
    let sql = "update vehicletypemaster set ";

    if (typeof req.body.type != "undefined" && req.body.type != "") {
      sql += "type = '" + req.body.type + "'";
    }

    if (
      typeof req.body.description != "undefined" &&
      req.body.description != ""
    ) {
      sql += ",description = '" + req.body.description + "'";
    }

    if (
      typeof req.body.customerNo != "undefined" &&
      req.body.customerNo != ""
    ) {
      sql += ",customerNo = '" + req.body.customerNo + "'";
    }

    if (typeof req.body.createdBy != "undefined" && req.body.createdBy != "") {
      sql += ",createdBy = '" + req.body.createdBy + "'";
    }

    if (typeof req.body.createdOn != "undefined" && req.body.createdOn != "") {
      sql += ",createdOn = '" + req.body.createdOn + "'";
    }

    if (typeof req.body.updatedOn != "undefined" && req.body.updatedOn != "") {
      sql += ",updatedOn = '" + req.body.updatedOn + "'";
    }

    if (typeof req.body.updatedBy != "undefined" && req.body.updatedBy != "") {
      sql += ",updatedBy = '" + req.body.updatedBy + "'";
    }

    if (typeof req.body.isDeleted != "undefined" && req.body.isDeleted != "") {
      sql += ",isDeleted = '" + req.body.isDeleted + "'";
    }

    sql += where;

    return sql;
  }
};

module.exports.deleteVehicleTypeMasterQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and vehicleTypeMasterId = '" +
      req.body.vehicleTypeMasterId +
      "' ";
    let sql = "delete from vehicletypemaster  ";
    sql += where;
    return sql;
  }
};

module.exports.getVehicleTypeMasterQuery = function(connection, req) {
  if (connection) {
    if (typeof req.body.vehicleTypeMasterId !== "undefined") {
      var where =
        " Where 1 = 1 and vehicleTypeMasterId = '" +
        req.body.vehicleTypeMasterId +
        "' ";
    } else {
      var where = " order by vehicleTypeMasterId ";
    }

    let sql = "SELECT * from vehicletypemaster ";
    sql += where;
    return sql;
  }
};

module.exports.insertUserMasterQuery = function(connection, req) {
  if (connection) {
    let sql =
      "INSERT INTO `usermaster` (`userMasterId`, `userNo`, `userName`,`userRealName`,`userEmail`,`userMobileNo`,`customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES (NULL, '" +
      req.body.userNo +
      "','" +
      req.body.userName +
      "','" +
      req.body.userRealName +
      "','" +
      req.body.userEmail +
      "','" +
      req.body.userMobileNo +
      "','" +
      req.body.customerNo +
      "', '" +
      req.body.createdBy +
      "', '" +
      req.body.createdOn +
      "', '" +
      req.body.updatedBy +
      "', '" +
      req.body.updatedOn +
      "', '" +
      req.body.isDeleted +
      "');";
    return sql;
  }
};

module.exports.updateUserMasterQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and userMasterId = '" + req.body.userMasterId + "' ";
    let sql = "update usermaster set ";

    if (typeof req.body.userNo != "undefined" && req.body.userNo != "") {
      sql += "userNo = '" + req.body.userNo + "'";
    }

    if (typeof req.body.userName != "undefined" && req.body.userName != "") {
      sql += ",userName = '" + req.body.userName + "'";
    }

    if (
      typeof req.body.userRealName != "undefined" &&
      req.body.userRealName != ""
    ) {
      sql += ",userRealName = '" + req.body.userRealName + "'";
    }

    if (typeof req.body.userEmail != "undefined" && req.body.userEmail != "") {
      sql += ",userEmail = '" + req.body.userEmail + "'";
    }

    if (
      typeof req.body.userMobileNo != "undefined" &&
      req.body.userMobileNo != ""
    ) {
      sql += ",userMobileNo = '" + req.body.userMobileNo + "'";
    }

    if (
      typeof req.body.customerNo != "undefined" &&
      req.body.customerNo != ""
    ) {
      sql += ",customerNo = '" + req.body.customerNo + "'";
    }

    if (typeof req.body.createdBy != "undefined" && req.body.createdBy != "") {
      sql += ",createdBy = '" + req.body.createdBy + "'";
    }

    if (typeof req.body.createdOn != "undefined" && req.body.createdOn != "") {
      sql += ",createdOn = '" + req.body.createdOn + "'";
    }

    if (typeof req.body.updatedOn != "undefined" && req.body.updatedOn != "") {
      sql += ",updatedOn = '" + req.body.updatedOn + "'";
    }

    if (typeof req.body.updatedBy != "undefined" && req.body.updatedBy != "") {
      sql += ",updatedBy = '" + req.body.updatedBy + "'";
    }

    if (typeof req.body.isDeleted != "undefined" && req.body.isDeleted != "") {
      sql += ",isDeleted = '" + req.body.isDeleted + "'";
    }

    sql += where;

    return sql;
  }
};

module.exports.deleteUserMasterQuery = function(connection, req) {
  if (connection) {
    let where =
      " Where 1 = 1 and userMasterId = '" + req.body.userMasterId + "' ";
    let sql = "delete from usermaster  ";
    sql += where;
    return sql;
  }
};

module.exports.getUserMasterQuery = function(connection, req) {
  if (connection) {
    if (typeof req.body.userMasterId !== "undefined") {
      var where =
        " Where 1 = 1 and userMasterId = '" + req.body.userMasterId + "' ";
    } else {
      var where = " order by userMasterId ";
    }

    let sql = "SELECT * from usermaster ";
    sql += where;
    return sql;
  }
};

module.exports.insertSkuMasterQuery = function(connection, req) {
  if (connection) {
    let sql =
      "INSERT INTO `skumaster` (`skuId`, `skuName`, `unitVolume`,`netUnitWeight`,`netGrossRatio`,`skuCode`,`customerNo`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES (NULL, '" +
      req.body.skuName +
      "','" +
      req.body.unitVolume +
      "','" +
      req.body.netUnitWeight +
      "','" +
      req.body.netGrossRatio +
      "','" +
      req.body.skuCode +
      "','" +
      req.body.customerNo +
      "', '" +
      req.body.createdBy +
      "', '" +
      req.body.createdOn +
      "', '" +
      req.body.updatedBy +
      "', '" +
      req.body.updatedOn +
      "', '" +
      req.body.isDeleted +
      "');";
    return sql;
  }
};

module.exports.updateSkuMasterQuery = function(connection, req) {
  if (connection) {
    let where = " Where 1 = 1 and skuId = '" + req.body.skuId + "' ";
    let sql = "update skumaster set ";

    if (typeof req.body.skuName != "undefined" && req.body.skuName != "") {
      sql += "skuName = '" + req.body.skuName + "'";
    }

    if (
      typeof req.body.unitVolume != "undefined" &&
      req.body.unitVolume != ""
    ) {
      sql += ",unitVolume = '" + req.body.unitVolume + "'";
    }

    if (
      typeof req.body.netUnitWeight != "undefined" &&
      req.body.netUnitWeight != ""
    ) {
      sql += ",netUnitWeight = '" + req.body.netUnitWeight + "'";
    }

    if (
      typeof req.body.netGrossRatio != "undefined" &&
      req.body.netGrossRatio != ""
    ) {
      sql += ",netGrossRatio = '" + req.body.netGrossRatio + "'";
    }

    if (typeof req.body.skuCode != "undefined" && req.body.skuCode != "") {
      sql += ",skuCode = '" + req.body.skuCode + "'";
    }

    if (
      typeof req.body.customerNo != "undefined" &&
      req.body.customerNo != ""
    ) {
      sql += ",customerNo = '" + req.body.customerNo + "'";
    }

    if (typeof req.body.createdBy != "undefined" && req.body.createdBy != "") {
      sql += ",createdBy = '" + req.body.createdBy + "'";
    }

    if (typeof req.body.createdOn != "undefined" && req.body.createdOn != "") {
      sql += ",createdOn = '" + req.body.createdOn + "'";
    }

    if (typeof req.body.updatedOn != "undefined" && req.body.updatedOn != "") {
      sql += ",updatedOn = '" + req.body.updatedOn + "'";
    }

    if (typeof req.body.updatedBy != "undefined" && req.body.updatedBy != "") {
      sql += ",updatedBy = '" + req.body.updatedBy + "'";
    }

    if (typeof req.body.isDeleted != "undefined" && req.body.isDeleted != "") {
      sql += ",isDeleted = '" + req.body.isDeleted + "'";
    }

    sql += where;

    return sql;
  }
};

module.exports.deleteSkuMasterQuery = function(connection, req) {
  if (connection) {
    let where = " Where 1 = 1 and skuId = '" + req.body.skuId + "' ";
    let sql = "delete from skumaster  ";
    sql += where;
    return sql;
  }
};

module.exports.getSkuMasterQuery = function(connection, req) {
  if (connection) {
    if (typeof req.body.skuId !== "undefined") {
      var where = " Where 1 = 1 and skuId = '" + req.body.skuId + "' ";
    } else {
      var where = " order by skuId";
    }

    let sql = "SELECT * from skumaster ";
    sql += where;
    return sql;
  }
};

module.exports.getCityMasterQuery = function(connection, req) {
  if (connection) {
    if (typeof req.body.cityId !== "undefined") {
      var where = " Where 1 = 1 and cityId = '" + req.body.cityId + "' ";
    } else {
      var where = " order by cityId";
    }

    let sql = "SELECT * from citymaster ";
    sql += where;
    return sql;
  }
};
