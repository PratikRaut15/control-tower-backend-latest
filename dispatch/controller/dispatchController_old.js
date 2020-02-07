//const mysql = require('mysql');
const safeJsonStringify = require("safe-json-stringify");
const dispatchModel = require("../models/dispatchModel");
const utilities = require("../utilities/utilities");

require("make-promises-safe");
//const makePromisesSafe = require('make-promises-safe');
/* process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`)
  }); */

// Create dispatch
createDispatch = async function(req, res, next) {
  let responseJson;
  let tripStartDateTime;
  let tripEndDateTime;

  let tripStatus = 1; // Created
  let SkuMasterId = null; // for now need to discuss
  let createdOn = await utilities.getCurrentDateTime();
  let isDeleted = 0;
  let source;
  let destination;
  let driver;
  let customerNo;
  let createdBy;
  let createdById;
  let shipmentNumber;
  let transporter;
  let vehicleNumber;
  let deliveryNumber;

  if (req.body.tripStartDateTime && req.body.tripEndDateTime) {
    let tripStartDateTime = req.body.tripStartDateTime;
    let tripEndDateTime = req.body.tripEndDateTime;
  } else {
    /**
     *
     * Changes Made By  : pratik Raut
     * Date : 30-12-2019
     * Reason : As discussed with Bajrang in his UI tripStartDateTime  field and tripEndDateTime field is not there as of now passing the current time to  both filed
     */
    tripStartDateTime = createdOn;
    //tripEndDateTime = createdOn;
    /**
     * Changes Ends Here
     */
    // return res.json({
    //   code: 204,
    //   message: "tripStartDateTime and  tripEndDateTime can not be blank",
    //   resultSet: ""
    // });
  }

  if (req.body.deliveryNumber) {
    let isDeliveryNumberAvailableData = await isDeliveryNumberAvailable(
      req.body.deliveryNumber
    );
    if (isDeliveryNumberAvailableData === 1) {
      return res.json({
        code: 400,
        message: "deliveryNumber is already available",
        resultSet: ""
      });
    } else if (isDeliveryNumberAvailableData === 500) {
      return res.json({
        code: 500,
        message: "Please try again API is down",
        resultSet: ""
      });
    } else {
      /*  return res.json({
                'code':200,
                'message':'OKk',
                'resultSet':''
            }); */
      deliveryNumber = req.body.deliveryNumber;
    }
  } else {
    return res.json({
      code: 204,
      message: "deliveryNumber can not be blank",
      resultSet: ""
    });

    // send validation response
  }

  if (req.body.shipmentNumber) {
    shipmentNumber = req.body.shipmentNumber;
  } else {
    shipmentNumber = null;
    // send validation response
  }

  if (req.body.customerNo) {
    customerNo = req.body.customerNo;
  } else {
    return res.json({
      code: 204,
      message: "customerNo can not be blank",
      resultSet: ""
    });

    // send validation response
  }

  if (req.body.userId) {
    createdById = req.body.userId;

    createdBy = await checkUserid(req.body.userId);

    if (createdBy !== 200) {
      return res.json({
        code: 204,
        message: "Please check userId",
        resultSet: ""
      });
    }
  } else {
    return res.json({
      code: 204,
      message: "userId can not be blank",
      resultSet: ""
    });

    // send validation response
  }

  if (req.body.vehicleNumber) {
    vehicleNumber = req.body.vehicleNumber;
  } else {
    return res.json({
      code: 204,
      message: "vehicleNumber can not be blank",
      resultSet: ""
    });

    // send validation response
  }

  if (req.body.source) {
    if (req.body.destination) {
      if (req.body.source === req.body.destination) {
        /* res.status(204).send('source and destination can not be same'); */
        return res.json({
          code: 204,
          message: "Source and destination can not be same",
          resultSet: ""
        });
      } else {
        source = await getCheckPointIdBySourceName(req.body.source);
        destination = await getCheckPointIdByDestinationName(
          req.body.destination
        );
        if (source === null) {
          return res.json({
            code: 204,
            message: "Please provide valid source name",
            resultSet: ""
          });
        }

        if (destination === null) {
          return res.json({
            code: 204,
            message: "Please provide valid destination name",
            resultSet: ""
          });
        }
      }
    } else {
      destination = null;
    }
  } else {
    source = null;
  }

  if (req.body.transporter) {
    transporter = await getTransporterIdByName(req.body.transporter);
    if (transporter === null) {
      return res.json({
        code: 204,
        message: "Please provide valid transporter name",
        resultSet: ""
      });
    }
  } else {
    return res.json({
      code: 204,
      message: "transporter can not be blank",
      resultSet: ""
    });
  }

  if (req.body.driver) {
    driver = await getDriverIdByName(req.body.driver);
    if (driver === null) {
      return res.json({
        code: 204,
        message: "Please provide valid driver name",
        resultSet: ""
      });
    }
  } else {
    driver = null;
  }

  if (req.body.route) {
    let route = await getRouteIdByName(req.body.route);
    if (route === null) {
      return res.json({
        code: 204,
        message: "Please provide valid route name",
        resultSet: ""
      });
    }
  } else {
    route = null;
  }

  if (req.body.vehicleType) {
    let vehicleType = await getVehicleTypeByName(req.body.vehicleType);
    if (vehicleType === null) {
      return res.json({
        code: 204,
        message: "Please provide valid vehicleType name",
        resultSet: ""
      });
    }
  } else {
    vehicleType = null;
  }

  let dataPassedToSp = {
    tripStartDateTime: tripStartDateTime,
    tripEndDateTime: tripEndDateTime,
    tripStatus: tripStatus,
    SkuMasterId: SkuMasterId,
    createdOn: createdOn,
    isDeleted: isDeleted,
    source: source,
    destination: destination,
    driver: driver,
    customerNo: customerNo,
    createdBy: createdById,
    shipmentNumber: shipmentNumber,
    transporter: transporter,
    vehicleNumber: vehicleNumber,
    deliveryNumber: deliveryNumber,
    route: route,
    vehicleType: vehicleType
  };
  //console.log("Data for SP is: "+ JSON.stringify(dataPassedToSp));

  let responseFromCreateDispatchSP = await insertDispatch(
    JSON.stringify(dataPassedToSp),
    res
  );
  //console.log(responseFromCreateDispatchSP);
  if (responseFromCreateDispatchSP === true) {
    return res.json({
      code: 200,
      message: "Dispatch created sucessfully",
      resultSet: ""
    });
  } else {
    return res.json({
      code: 500,
      message:
        "Error occured at server while creating the dispatch, please try again",
      resultSet: ""
    });
  }
};

insertDispatch = function(data, res) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await dispatchModel.createDispatch(data, res);
      if (response === true) {
        resolve(true);
      } else {
        reject(false);
      }
    } catch (error) {
      reject(error);
      console.log("controller insertDispatch catch block error is: " + error);
    }
  });
};

isDeliveryNumberAvailable = function(data) {
  return new Promise((resolve, reject) => {
    try {
      dispatchModel.isDeliveryNumberAvailable(data, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {}
  });
};

checkUserid = function(data) {
  return new Promise((resolve, reject) => {
    try {
      dispatchModel.checkUserId(data, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {}
  });
};

getAllDispatch = async function(req, res, next) {
  var resultSetArray = {};
  return new Promise((resolve, reject) => {
    try {
      dispatchModel.getAllDispatch(res, function(err, results) {
        if (err) {
          reject(err);
        } else {
          /*  if(results[0]['sourceId']){
                        dispatchModel.getSourceName(results[0]['sourceId'],function(err1,sourceName){
                            console.log("I am here in source id: and value is: "+sourceName);
                            resultSetArray['source'] = sourceName;
                        });
                    } else {
                        resultSetArray['source'] = null;
                    }

                   
                    if(results[0]['destinationId']){
                        dispatchModel.getSourceName(results[0]['destinationId'],function(err2,destinationName){
                            resultSetArray['destination'] = destinationName;
                        });
                    } else {
                        resultSetArray['destination'] = null;
                    }

                   
                    if(results[0]['transporterMasterId']){
                        dispatchModel.getTransporterName(results[0]['transporterMasterId'],function(err3,transporterName){
                            resultSetArray['transporterName'] = transporterName;
                        });
                    } else {
                        resultSetArray['transporterName'] = null;
                    }
                    
                    if(results[0]['driverMasterId']){
                        dispatchModel.getDriverName(results[0]['driverMasterId'],function(err4,driverName){
                            resultSetArray['driverName'] = driverName;
                        });
                    } else {
                        resultSetArray['driverName'] = null;
                    }
                   
                    if(results[0]['routeMasterId']){
                        dispatchModel.getRouteName(results[0]['routeMasterId'],function(err5,routeName){
                            resultSetArray['routeName'] = routeName;
                        });
                    } else {
                        resultSetArray['routeName'] = null;
                    }
                    
                    if(results[0]['tripStatusMasterId']){
                        dispatchModel.getTripStatusName(results[0]['tripStatusMasterId'],function(err6,tripStatus){
                            resultSetArray['tripStatus'] = tripStatus;
                        });
                    } else {
                        resultSetArray['tripStatus'] = null;
                    }
                   
                    if(results[0]['SkuMasterId']){
                        dispatchModel.getSkuCode(results[0]['SkuMasterId'],function(err7,skuCode){
                            resultSetArray['skuCode'] = skuCode;
                        });
                    } else {
                        resultSetArray['skuCode'] = null;
                    }
                    
                    if(results[0]['vehicleTypeMasterId']){
                        dispatchModel.getVehicleTypeByName(results[0]['vehicleTypeMasterId'],function(err8,vehicleType){
                            resultSetArray['vehicleType'] = vehicleType;
                        });
                    } else {
                        resultSetArray['vehicleType'] = null;
                    }
                   

                   
                    console.log('get all dispatch data is: '+results[0]['customerNo']);
                    resolve(resultSetArray); */
          resolve(results);
        }
      });
    } catch (error) {}
  });
};

getSourceName = function(req, res, next) {
  return new Promise((resolve, reject) => {
    try {
      dispatchModel.getSourceName(req, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      // console.log("controller catch block error is: "+error);
    }
  });
};

getTransporterName = function(req, res, next) {
  return new Promise((resolve, reject) => {
    try {
      dispatchModel.getTransporterName(req, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      // console.log("controller catch block error is: "+error);
    }
  });
};

getDriverName = function(req, res, next) {
  return new Promise((resolve, reject) => {
    try {
      dispatchModel.getDriverName(req, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      // console.log("controller catch block error is: "+error);
    }
  });
};

getRouteName = function(req, res, next) {
  return new Promise((resolve, reject) => {
    try {
      dispatchModel.getRouteName(req, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      // console.log("controller catch block error is: "+error);
    }
  });
};

getTripStatusName = function(req, res, next) {
  return new Promise((resolve, reject) => {
    try {
      dispatchModel.getTripStatusName(req, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      // console.log("controller catch block error is: "+error);
    }
  });
};

getSkuCode = function(req, res, next) {
  return new Promise((resolve, reject) => {
    try {
      dispatchModel.getSkuCode(req, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      // console.log("controller catch block error is: "+error);
    }
  });
};

getVehicleTypeByName = function(req, res, next) {
  return new Promise((resolve, reject) => {
    try {
      dispatchModel.getVehicleTypeByName(req, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      // console.log("controller catch block error is: "+error);
    }
  });
};

/* getDispatch all ends here */

getCheckPointIdBySourceName = function(checkPointName) {
  return new Promise((resolve, reject) => {
    try {
      dispatchModel.getCheckPointIdBySourceName(checkPointName, function(
        err,
        results
      ) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      console.log("controller catch block error is: " + error);
    }
  });
};

getCheckPointIdByDestinationName = function(checkPointName) {
  return new Promise((resolve, reject) => {
    try {
      dispatchModel.getCheckPointIdByDestinationName(checkPointName, function(
        err,
        results
      ) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      console.log("controller catch blcok error is: " + error);
    }
  });
};
getTransporterIdByName = function(transporterName) {
  return new Promise((resolve, reject) => {
    try {
      dispatchModel.getTransporterIdByName(transporterName, function(
        err,
        results
      ) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      console.log("controller catch blcok error is: " + error);
    }
  });
};

getDriverIdByName = function(driverName) {
  return new Promise((resolve, reject) => {
    dispatchModel.getDriverIdByName(driverName, function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

getRouteIdByName = function(routeName) {
  return new Promise((resolve, reject) => {
    dispatchModel.getRouteIdByName(routeName, function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

getVehicleTypeByName = function(getVehicleType) {
  return new Promise((resolve, reject) => {
    dispatchModel.getVehicleTypeByName(getVehicleType, function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  //return dispatchModel.getVehicleTypeByName(getVehicleType);
};

getDriverNumber = function(driverId) {
  return new Promise((resolve, reject) => {
    dispatchModel.getDriverNumber(driverId, function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

getLatLong = function(checkPointMasterId) {
  return new Promise((resolve, reject) => {
    dispatchModel.getLatLong(checkPointMasterId, function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  createDispatch,
  getAllDispatch,
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
