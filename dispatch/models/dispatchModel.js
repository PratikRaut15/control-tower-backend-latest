const dbConnection = require("../config/databaseConfiguration");
const safeJsonStringify = require("safe-json-stringify");
createDispatch = function(req, res) {
  //res(req);

  return new Promise((resolve, reject) => {
    let sentDate = JSON.parse(req);
    let sourceParam = sentDate.source;
    let destinationParam = sentDate.destination;
    let transporterParam = sentDate.transporter;
    let transporterLrNoParam = null;
    let driverParam = sentDate.driver;
    let routeParam = sentDate.route;
    let vehicleTypeParam = sentDate.vehicleType;
    let vehicleNumberParam = sentDate.vehicleNumber;
    let tripStartDateTimeParam = "2019-11-20 00:00:00"; //sentDate.tripStartDateTime ;
    let tripEndDateTimeParam = "2019-11-30 00:00:00"; //sentDate.tripEndDateTime ;
    let tripStatusParam = sentDate.tripStatus;
    let SkuMasterIdParam = sentDate.SkuMasterId;
    let createdOnParam = sentDate.createdOn;
    let isDeletedParam = sentDate.isDeleted;
    let shipmentNumberParam = sentDate.shipmentNumber;
    let deliveryNumberParam = sentDate.deliveryNumber;
    let customerNoParam = sentDate.customerNo;
    let createdByParam = sentDate.createdBy;

    try {
      dbConnection.pool.query(
        "CALL createDispatch(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@isInserted,@testParam)",
        [
          sourceParam,
          destinationParam,
          transporterParam,
          transporterLrNoParam,
          driverParam,
          routeParam,
          vehicleTypeParam,
          vehicleNumberParam,
          tripStartDateTimeParam,
          tripEndDateTimeParam,
          tripStatusParam,
          SkuMasterIdParam,
          createdOnParam,
          isDeletedParam,
          shipmentNumberParam,
          deliveryNumberParam,
          customerNoParam,
          createdByParam
        ],
        /* 'SELECT @isInserted,@testParam;', */ function(
          error,
          results,
          fields
        ) {
          if (error) {
            //throw error;
            reject(false);
          } else {
            //res(null, results[0][0]["isInserted"]);
            resolve(true);
            // if (results[0][0]["isInserted"] === 1) resolve(1);
          }
        }
      );
    } catch (error) {
      reject(false);
    }
  });
};

getCheckPointIdBySourceName = function(req, res) {
  dbConnection.pool.query(
    "select checkPointMasterId from checkpointmaster where checkPointName=? and isDeleted=0",
    [req],
    function(error, results, fields) {
      if (error) {
        throw error;
      } else {
        if (results.length > 0) {
          res(null, results[0]["checkPointMasterId"]);
        } else {
          res(null, null);
        }
      }
    }
  );
};

getCheckPointIdByDestinationName = function(req, res) {
  dbConnection.pool.query(
    "select checkPointMasterId from checkpointmaster where checkPointName=? and isDeleted=0",
    [req],
    function(error, results, fields) {
      if (error) {
        throw error;
      } else {
        if (results.length > 0) {
          res(null, results[0]["checkPointMasterId"]);
        } else {
          res(null, null);
        }
      }
    }
  );
};

getTransporterIdByName = function(req, res) {
  dbConnection.pool.query(
    `select transporterMasterId from transportermaster where transporterName=? and isDeleted=0`,
    [req],
    function(error, results, fields) {
      if (error) {
        throw error;
      } else {
        if (results.length > 0) {
          res(null, results[0]["transporterMasterId"]);
        } else {
          res(null, null);
        }
      }
    }
  );
};

getDriverIdByName = function(req, res) {
  dbConnection.pool.query(
    `select driverMasterId from drivermaster where DriverName=? and isDeleted=0`,
    [req],
    function(error, results, fields) {
      if (error) {
        throw error;
      } else {
        if (results.length > 0) {
          res(null, results[0]["driverMasterId"]);
        } else {
          res(null, null);
        }
      }
    }
  );
};

getRouteIdByName = function(req, res) {
  dbConnection.pool.query(
    `select routeMasterId from routemaster where routeName=? and isDeleted=0`,
    [req],
    function(error, results, fields) {
      if (error) {
        throw error;
      } else {
        if (results.length > 0) {
          res(null, results[0]["routeMasterId"]);
        } else {
          res(null, null);
        }
      }
    }
  );
};

getVehicleTypeByName = function(req, res) {
  dbConnection.pool.query(
    `select vehicleTypeMasterId from vehicletypemaster where type=? and isDeleted=0`,
    [req],
    function(error, results, fields) {
      if (error) {
        throw error;
      } else {
        if (results.length > 0) {
          res(null, results[0]["vehicleTypeMasterId"]);
        } else {
          res(null, null);
        }
      }
    }
  );
};

checkUserId = function(req, res) {
  dbConnection.pool.query(
    `select userMasterId from usermaster where userMasterId=? and isDeleted=0`,
    [req],
    function(error, results, fields) {
      try {
        if (error) {
          res(null, 500);
        } else {
          if (results.length > 0) {
            res(null, 200);
          } else {
            res(null, 201);
          }
        }
      } catch (error) {
        res(null, 500);
      }
    }
  );
};

isDeliveryNumberAvailable = function(req, res) {
  dbConnection.pool.query(
    `SELECT deliveryId FROM delivery WHERE deliveryNo=?`,
    [req],
    function(error, results, fields) {
      try {
        if (error) {
          res(null, 500);
        } else {
          if (results.length > 0) {
            res(null, 1);
          } else {
            res(null, 0);
          }
        }
      } catch (error) {
        res(null, 500);
      }
    }
  );
};

getAllDispatch = function(req, res) {
  dbConnection.pool.query(
    `SELECT tripId, 
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
    updatedBy,
    updatedOn,
    isDeleted FROM trip`,
    function(error, results, fields) {
      try {
        if (error) {
          // res(null,500);
        } else {
          res(null, results);
          //console.log("Data from resultset is: "+results);
          if (results.length > 0) {
            // res(null,results);
          } else {
            // res(null,0);
            //  console.log("Data from resultset is: "+results);
          }
        }
      } catch (error) {
        console.log("error is: " + error);
        // res(null,500);
      }
    }
  );
};

getSourceName = function(req, res) {
  dbConnection.pool.query(
    `SELECT checkPointName FROM checkpointmaster WHERE checkPointMasterId=?`,
    [req],
    function(error, results, fields) {
      try {
        if (error) {
          res(null, 500);
        } else {
          res(null, results[0]["checkPointName"]);
          /*  if(results.length>0){
                    res(null,results[0]['checkPointName']);
                } else {
                    res(null,0);
                } */
        }
      } catch (error) {
        res(null, 500);
      }
    }
  );
};

getTransporterName = function(req, res) {
  dbConnection.pool.query(
    `SELECT transporterName FROM transportermaster WHERE transporterMasterId=?`,
    [req],
    function(error, results, fields) {
      try {
        if (error) {
          res(null, 500);
        } else {
          res(null, results[0]["transporterName"]);
          /* if(results.length>0){
                    res(null,1);
                } else {
                    res(null,0);
                } */
        }
      } catch (error) {
        res(null, 500);
      }
    }
  );
};

getDriverName = function(req, res) {
  dbConnection.pool.query(
    `SELECT DriverName FROM drivermaster WHERE driverMasterId=?`,
    [req],
    function(error, results, fields) {
      try {
        if (error) {
          res(null, 500);
        } else {
          res(null, results[0]["DriverName"]);
          /* if(results.length>0){
                    res(null,1);
                } else {
                    res(null,0);
                } */
        }
      } catch (error) {
        res(null, 500);
      }
    }
  );
};

getRouteName = function(req, res) {
  dbConnection.pool.query(
    `SELECT routeName FROM routemaster WHERE routeMasterId=?`,
    [req],
    function(error, results, fields) {
      try {
        if (error) {
          res(null, 500);
        } else {
          res(null, results[0]["routeName"]);
          /* if(results.length>0){
                    res(null,1);
                } else {
                    res(null,0);
                } */
        }
      } catch (error) {
        res(null, 500);
      }
    }
  );
};

getTripStatusName = function(req, res) {
  dbConnection.pool.query(
    `SELECT statusName FROM tripstatusmaster WHERE tripStatusMasterId=?`,
    [req],
    function(error, results, fields) {
      try {
        if (error) {
          res(null, 500);
        } else {
          res(null, results[0]["statusName"]);
          /*  if(results.length>0){
                    res(null,1);
                } else {
                    res(null,0);
                } */
        }
      } catch (error) {
        res(null, 500);
      }
    }
  );
};

getSkuCode = function(req, res) {
  dbConnection.pool.query(
    `SELECT deliveryId FROM delivery limit 1`,
    [req],
    function(error, results, fields) {
      try {
        if (error) {
          res(null, 500);
        } else {
          res(null, "null");
          /* if(results.length>0){
                    res(null,1);
                } else {
                    res(null,0);
                } */
        }
      } catch (error) {
        res(null, 500);
      }
    }
  );
};

getVehicleTypeByName = function(req, res) {
  dbConnection.pool.query(
    `SELECT type FROM vehicletypemaster WHERE vehicleTypeMasterId=?`,
    [req],
    function(error, results, fields) {
      try {
        if (error) {
          res(null, 500);
        } else {
          res(null, results[0]["type"]);
          /* if(results.length>0){
                    res(null,1);
                } else {
                    res(null,0);
                } */
        }
      } catch (error) {
        res(null, 500);
      }
    }
  );
};

getDriverNumber = function(req, res) {
  dbConnection.pool.query(
    `SELECT DriverMobileNo FROM drivermaster WHERE driverMasterId=?`,
    [req],
    function(error, results, fields) {
      try {
        if (error) {
          res(null, 500);
        } else {
          res(null, results[0]["DriverMobileNo"]);
        }
      } catch (error) {
        res(null, 500);
      }
    }
  );
};
getLatLong = function(req, res) {
  dbConnection.pool.query(
    `SELECT polygonalLatLong FROM checkpointmaster WHERE checkPointMasterId=?`,
    [req],
    function(error, results, fields) {
      try {
        if (error) {
          res(null, 500);
        } else {
          const arrTemp = results[0]["polygonalLatLong"];
          var array = JSON.parse("[" + arrTemp + "]");
          var count = array[0].length;
          const arrData = array[0];
          res(null, arrData[count - 1]);
        }
      } catch (error) {
        res(null, 500);
      }
    }
  );
};

module.exports = {
  createDispatch,
  getCheckPointIdBySourceName,
  getCheckPointIdByDestinationName,
  getTransporterIdByName,
  getDriverIdByName,
  getRouteIdByName,
  getVehicleTypeByName,
  getAllDispatch,
  checkUserId,
  isDeliveryNumberAvailable,
  getSourceName,
  getTransporterName,
  getDriverName,
  getRouteName,
  getTripStatusName,
  getSkuCode,
  getVehicleTypeByName,
  getDriverNumber,
  getLatLong
};
