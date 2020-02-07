const dbConnection = require('../config/databaseConfiguration'); 
const safeJsonStringify = require('safe-json-stringify');
createDispatch = function(req,res){
    //res(req);
    let sentDate = JSON.parse(req);
    let sourceParam = sentDate.source ;
    let destinationParam = sentDate.destination ;
    let transporterParam = sentDate.transporter ;
    let transporterLrNoParam = null ;
    let driverParam = sentDate.driver ;
    let routeParam = sentDate.route ;
    let vehicleTypeParam = sentDate.vehicleType ;
    let vehicleNumberParam = sentDate.vehicleNumber ;
    let tripStartDateTimeParam ='2019-11-20 00:00:00'; //sentDate.tripStartDateTime ;
    let tripEndDateTimeParam = '2019-11-30 00:00:00';//sentDate.tripEndDateTime ;
    let tripStatusParam = sentDate.tripStatus ;
    let SkuMasterIdParam = sentDate.SkuMasterId ;
    let createdOnParam = sentDate.createdOn ;
    let isDeletedParam = sentDate.isDeleted ;
    let shipmentNumberParam = sentDate.shipmentNumber ;
    let deliveryNumberParam = sentDate.deliveryNumber ;
    let customerNoParam = sentDate.customerNo ;
    let createdByParam = sentDate.createdBy ;
    
    try {
        dbConnection.pool.query('CALL createDispatch(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@isInserted,@testParam)',[sourceParam,destinationParam,transporterParam,transporterLrNoParam,driverParam,
            routeParam,vehicleTypeParam,vehicleNumberParam,tripStartDateTimeParam,tripEndDateTimeParam,tripStatusParam,SkuMasterIdParam,createdOnParam,isDeletedParam,shipmentNumberParam,deliveryNumberParam,customerNoParam,createdByParam],/* 'SELECT @isInserted,@testParam;', */function(error,results,fields){
            if (error) {
                //throw error;
                res(null,0);
            } else {
                res(null,results[0][0]['isInserted']);
            }    
        });
    } catch (error) {
        res(null,0);
    }
    
};


getCheckPointIdBySourceName = function(req,res){
    dbConnection.pool.query('select checkPointMasterId from checkpointmaster where checkPointName=? and isDeleted=0',[req],function(error,results,fields){
        if (error) {
            throw error;
        } else {
            if(results.length > 0){
                res(null,results[0]['checkPointMasterId']);
            } else {
                res(null,null);
            }
        }    
    });
};

getCheckPointIdByDestinationName = function(req,res){ 
    dbConnection.pool.query('select checkPointMasterId from checkpointmaster where checkPointName=? and isDeleted=0',[req],function(error,results,fields){
            if (error) {
                throw error;
            } else {
                if(results.length > 0){
                    res(null,results[0]['checkPointMasterId']);
                } else {
                    res(null,null);
                }
            }
    });
};

getTransporterIdByName = function(req,res){
    dbConnection.pool.query(`select transporterMasterId from transportermaster where transporterName=? and isDeleted=0`,[req],function(error,results,fields){
        if (error) {
            throw error;
        } else {
            if(results.length > 0){
                res(null,results[0]['transporterMasterId']);
            } else {
                res(null,null);
            }
        }
    });
};

getDriverIdByName = function(req,res){
    dbConnection.pool.query(`select driverMasterId from drivermaster where DriverName=? and isDeleted=0`,[req],function(error,results,fields){
        if (error) {
            throw error;
        } else {
            if(results.length > 0){
                res(null,results[0]['driverMasterId']);
            } else {
                res(null,null);
            }
        }
    });
};

getRouteIdByName = function(req,res){
    dbConnection.pool.query(`select routeMasterId from routemaster where routeName=? and isDeleted=0`,[req],function(error,results,fields){
        if (error) {
            throw error;
        } else {
            if(results.length > 0){
                res(null,results[0]['routeMasterId']);
            } else {
                res(null,null);
            }
        }
    });
};

getVehicleTypeByName = function(req,res){
    dbConnection.pool.query(`select vehicleTypeMasterId from vehicletypemaster where type=? and isDeleted=0`,[req],function(error,results,fields){
        if (error) {
            throw error;
        } else {
            if(results.length > 0){
                res(null,results[0]['vehicleTypeMasterId']);
            } else {
                res(null,null);
            }
        }
    });
};

checkUserId = function(req,res){
    dbConnection.pool.query(`select userMasterId from usermaster where userMasterId=? and isDeleted=0`,[req],function(error,results,fields){
        try {
            if(error){
                res(null,500);
            } else {
                if(results.length > 0){
                    res(null,200);
                } else {
                    res(null,201);
                }
            }
        } catch (error) {
            res(null,500);
        }
    });
};

getAllDispatch = function(req,res){
   // dbConnection.pool.query(`select `)
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
    checkUserId
}


