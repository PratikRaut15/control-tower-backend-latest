const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const db = require('../config/db'); 
const mastersModel = require('../models/masters');

router.get('/',(req, res) => {
    res.json({"msg" : "Welcome to API"});
});

router.post('/',(req, res) => {
    res.json({"msg" : "From Post Welcome to API"});
});

// Checkpoint Master Starts from here 
router.post('/createCheckPointMaster',function(req, res,next) {
    db.connection.connect(function(err){
        if(!err){
            console.log(req.body);
            const checkPointName = req.body.checkPointName;
            const checkPointCode = req.body.checkPointCode;
            const checkPointCategory = req.body.checkPointCategory;
            const circularLatLong = req.body.circularLatLong;
            const polygonalLatLong = req.body.polygonalLatLong;
            const description = req.body.description;
            const customerNo = req.body.customerNo;
            const createdBy = req.body.createdBy;
            const createdOn = req.body.createdOn;
            const updatedBy = req.body.updatedBy;
            const updatedOn = req.body.updatedOn;
            const isDeleted = req.body.isDeleted;
            var err = {};
            var validation = []; 
            
            if(typeof checkPointName == 'undefined' || checkPointName ==""){
                
                res.json({
                    "code": 204,
                    "message": "checkPointName is missing"
                });
                
            } 

            if(typeof checkPointCode == 'undefined' || checkPointCode ==""){
                res.json({
                    "code": 204,
                    "message": "checkPointCode is missing"
                });
            } 
            if(typeof checkPointCategory == 'undefined' || checkPointCategory ==""){
                res.json({
                    "code": 204,
                    "message": "checkPointCategory is missing"
                });
            } 

            if(typeof circularLatLong == 'undefined' || circularLatLong ==""){
                res.json({
                    "code": 204,
                    "message": "circularLatLong is missing"
                });
            } 
            if(typeof polygonalLatLong == 'undefined' || polygonalLatLong ==""){
                res.json({
                    "code": 204,
                    "message": "polygonalLatLong is missing"
                });
            }
            if(typeof description == 'undefined' || description ==""){
                res.json({  
                    "code": 204,
                    "message": "description is missing"
                });
            } 
            if(typeof customerNo == 'undefined' || customerNo ==""){
                res.json({ 
                    "code": 204,
                    "message": "customerNo is missing"
                });
            }
            if(typeof createdBy == 'undefined' || createdBy ==""){
                res.json({
                    "code": 204,
                    "message": "createdBy is missing"
                });
            } 
            if(typeof createdOn == 'undefined' || createdOn ==""){
                res.json({
                    "code": 204,
                    "message": "createdOn is missing"
                });
            }
            if(typeof updatedBy == 'undefined' || updatedBy ==""){
                res.json({  
                    "code": 204,
                    "message": "updatedBy is missing"
                });
            } 
            if(typeof isDeleted == 'undefined' || isDeleted ==""){
                res.json({
                    "code": 204,
                    "message": "isDeleted is missing"
                });
            }

            

            if(Object.keys(err).length > 0){
                console.log(err);
            }else{
                // Inserting into MysqlDb
                const sql = mastersModel.insertCheckPointMasterQuery(db.connection,req);

                db.connection.query(sql,function(err, rows, fields){
                    if (err) throw err;
                    res.json({
                        "code":200,
                        "success":"Inserted",
                        "result" : rows

                    });
                });
            }
        } else {
            console.log("Something went wrong");
            res.json({"msg" : "0"});
        }
    });
});

router.post('/updateCheckPointMaster',function(req,res){
    const checkPointMasterId = req.body.checkPointMasterId;
    const checkPointName = req.body.checkPointName;
    var err = {};
    var validation = []; 
    console.log(req.body);
    

    if(typeof checkPointMasterId == 'undefined' || checkPointMasterId ==""){
        res.json({  
            "code": 204,
            "message": "checkPointMasterId is missing"
        });
    } 
    if(typeof checkPointName == 'undefined' || checkPointName ==""){
        res.json({  
            "code": 204,
            "message": "checkPointName is missing"
        });
    }
    const result = mastersModel.updateCheckPointMasterQuery(db.connection,req);
    
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"updated succesfully",
                "result" : rows.affectedRows + " record has been updated Successfully"
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success":false,
                "result" : rows.affectedRows + " record not found"
            });
       }

    });
});

router.post('/deleteCheckPointMaster',function(req,res){
    const checkPointMasterId = req.body.checkPointMasterId;
    var err = {};
    var validation = [];
    if(typeof req.body.checkPointMasterId == 'undefined' || req.body.checkPointMasterId ==""){
        res.json({  
            "code": 204,
            "message": "checkPointMasterId is missing"
        });
    } 
  
    const result = mastersModel.deleteCheckPointMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"Record has been Deleted",
                "result" : rows
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success":"Records Not Found",
                "result" : rows
            });
       }

    });
});


router.post('/getCheckPointMaster', async function(req,res){
    const checkPointMasterId = req.body.checkPointMasterId;
    var err = {};
    var validation = [];
    // if(typeof req.body.checkPointMasterId == 'undefined' || req.body.checkPointMasterId ==""){
    //     return res.json({  
    //         "code": 204,
    //         "message": "checkPointMasterId is missing"
    //     });
    // } 
   
    const result = mastersModel.getCheckPointMasterQuery(db.connection,req);
    

    // const result1 = await getPromiseData(pool);
    
    // res.json({
    //     "code":200,
    //     "success":"True",
    //     "result" : result1[0]
    // });
    
    // if (!result1[0].length < 1) {
    //   throw new Error('Post with this id was not found');
    // }
    
    
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        console.log(rows.length);
        if(typeof rows!="undefined" && rows.length > 0){
            res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
           res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
}); 


router.get('/getCheckPointMaster', async function(req,res){
    const checkPointMasterId = req.body.checkPointMasterId;
    var err = {};
    var validation = [];
    
    // if(typeof req.body.checkPointMasterId == 'undefined' || req.body.checkPointMasterId ==""){
    //     return res.json({  
    //         "code": 204,
    //         "message": "checkPointMasterId is missing"
    //     });
    // } 
   
    const result = mastersModel.getCheckPointMasterQuery(db.connection,req);
    

    // const result1 = await getPromiseData(pool);
    
    // res.json({
    //     "code":200,
    //     "success":"True",
    //     "result" : result1[0]
    // });
    
    // if (!result1[0].length < 1) {
    //   throw new Error('Post with this id was not found');
    // }
    
    
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        console.log(rows.length);
        if(typeof rows!="undefined" && rows.length > 0){
            res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
           res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
}); 



// Checkpoint Master Ends Here 

// Route Master Starts from here 

router.post('/createRouteMaster',function(req, res,next) {
    const routeCode = req.body.routeCode;
    const routeName = req.body.routeName;
    const description = req.body.description;
    const routeTat = req.body.routeTat;
    const customerNo = req.body.customerNo;
    const createdBy = req.body.createdBy;
    const createdOn = req.body.createdOn;
    const updatedBy = req.body.updatedBy;
    const updatedOn = req.body.updatedOn;
    const isDeleted = req.body.isDeleted;
    var err = {};
    var validation = []; 

    if(typeof routeCode == 'undefined' || routeCode ==""){
        res.json({ 
            "code": 204,
            "message": "routeCode is missing"
        });
    }

    if(typeof routeName == 'undefined' || routeName ==""){
        res.json({ 
            "code": 204,
            "message": "routeName is missing"
        });
    }

    if(typeof description == 'undefined' || description ==""){
        res.json({ 
            "code": 204,
            "message": "description is missing"
        });
    }

    if(typeof routeTat == 'undefined' || routeTat ==""){
        res.json({ 
            "code": 204,
            "message": "routeTat is missing"
        });
    }

    if(typeof customerNo == 'undefined' || customerNo ==""){
        res.json({ 
            "code": 204,
            "message": "customerNo is missing"
        });
    }
    if(typeof createdBy == 'undefined' || createdBy ==""){
        res.json({
            "code": 204,
            "message": "createdBy is missing"
        });
    } 
    if(typeof createdOn == 'undefined' || createdOn ==""){
        res.json({
            "code": 204,
            "message": "createdOn is missing"
        });
    }
    if(typeof updatedBy == 'undefined' || updatedBy ==""){
        res.json({  
            "code": 204,
            "message": "updatedBy is missing"
        });
    } 
    if(typeof isDeleted == 'undefined' || isDeleted ==""){
        res.json({
            "code": 204,
            "message": "isDeleted is missing"
        });
    }

    db.connection.connect(function(err){
        if(err){
            res.json({
                "code": 204,
                "message": "Something went wrong with Database"
            });
        }else{
            const sql = mastersModel.insertRouteMasterQuery(db.connection,req);
            console.log(sql);
            db.connection.query(sql,function(err, rows, fields){
                if (err) throw err;
                res.json({
                    "code":200,
                    "success":"Inserted",
                    "result" : rows
                });
            });
        }
       
    });   
});

router.post('/updateRouteMaster',function(req, res,next) {
    const routeMasterId = req.body.routeMasterId;
    const routeName = req.body.routeName;
    var err = {};
    var validation = []; 
    console.log(req.body);
    

    if(typeof routeMasterId == 'undefined' || routeMasterId ==""){
        res.json({  
            "code": 204,
            "message": "routeMasterId is missing"
        });
    } 
    if(typeof routeName == 'undefined' || routeName ==""){
        res.json({  
            "code": 204,
            "message": "routeName is missing"
        });
    }
    const result = mastersModel.updateRouteMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"updated succesfully",
                "result" : rows.affectedRows + " record has been updated Successfully"
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success": false,
                "result" : " No record found"
            });
       }

    });
});    

router.post('/deleteRouteMaster',function(req,res){
    const routeMasterId = req.body.routeMasterId;
    var err = {};
    var validation = [];
    if(typeof req.body.routeMasterId == 'undefined' || req.body.routeMasterId ==""){
        res.json({  
            "code": 204,
            "message": "routeMasterId is missing"
        });
    } 
  
    const result = mastersModel.deleteRouteMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"Record has been Deleted",
                "result" : rows
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success":"Records Not Found",
                "result" : rows
            });
       }

    });
});

router.post('/getRoutesMaster',function(req,res){
    const routeMasterId = req.body.routeMasterId;
    console.log(req.body);
    var err = {};
    var validation = [];
    // if(typeof req.body.routeMasterId == 'undefined' || req.body.routeMasterId ==""){
    //     res.json({  
    //         "code": 204,
    //         "message": "routeMasterId is missing"
    //     });
    // } 
  
    const result = mastersModel.getRouteMasterQuery(db.connection,req);
    console.log(result);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            return res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows!="undefined" && rows.length > 0){
            res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
           res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
}); 

// Route Master Ends Here 

// Shipment Master Starts from here 

router.post('/createShipmentMaster',function(req, res,next) {
    const shipmentNo = req.body.shipmentNo;
    const customerNo = req.body.customerNo;
    const createdBy = req.body.createdBy;
    const createdOn = req.body.createdOn;
    const updatedBy = req.body.updatedBy;
    const updatedOn = req.body.updatedOn;
    const isDeleted = req.body.isDeleted;
    var err = {};
    var validation = []; 

    if(typeof shipmentNo == 'undefined' || shipmentNo ==""){
        res.json({ 
            "code": 204,
            "message": "shipmentNo is missing"
        });
    }
    
    if(typeof customerNo == 'undefined' || customerNo ==""){
        res.json({ 
            "code": 204,
            "message": "customerNo is missing"
        });
    }
    if(typeof createdBy == 'undefined' || createdBy ==""){
        res.json({
            "code": 204,
            "message": "createdBy is missing"
        });
    } 
    if(typeof createdOn == 'undefined' || createdOn ==""){
        res.json({
            "code": 204,
            "message": "createdOn is missing"
        });
    }
    if(typeof updatedBy == 'undefined' || updatedBy ==""){
        res.json({  
            "code": 204,
            "message": "updatedBy is missing"
        });
    } 
    if(typeof isDeleted == 'undefined' || isDeleted ==""){
        res.json({
            "code": 204,
            "message": "isDeleted is missing"
        });
    }

    db.connection.connect(function(err){
        if(err){
            res.json({
                "code": 204,
                "message": "Something went wrong with Database"
            });
        }else{
            const sql = mastersModel.insertShipmentMasterQuery(db.connection,req);
            db.connection.query(sql,function(err, rows, fields){
                if (err) throw err;
                res.json({
                    "code":200,
                    "success":"Inserted",
                    "result" : rows
                });
            });
        }
       
    });   
});

router.post('/updateShipmentMaster',function(req, res,next) {
    const shipmentId = req.body.shipmentId;
    const shipmentNo = req.body.shipmentNo;
    var err = {};
    var validation = [];
    if(typeof shipmentId == 'undefined' || shipmentId ==""){
        res.json({  
            "code": 204,
            "message": "shipmentId is missing"
        });
    } 
    if(typeof shipmentNo == 'undefined' || shipmentNo ==""){
        res.json({  
            "code": 204,
            "message": "shipmentNo is missing"
        });
    }
    const result = mastersModel.updateShipmentMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"updated succesfully",
                "result" : rows.affectedRows + " record has been updated Successfully"
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success": false,
                "result" : " No record found"
            });
       }

    });
}); 

router.post('/deleteShipmentMaster',function(req,res){
    const shipmentId = req.body.shipmentId;
    var err = {};
    var validation = [];
    if(typeof req.body.shipmentId == 'undefined' || req.body.shipmentId ==""){
        res.json({  
            "code": 204,
            "message": "shipmentId is missing"
        });
    } 
  
    const result = mastersModel.deleteShipmentMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"Record has been Deleted",
                "result" : rows
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success":"Records Not Found",
                "result" : rows
            });
       }

    });
});

router.post('/getShipmentMaster',function(req,res){
    const shipmentId = req.body.shipmentId;
    var err = {};
    var validation = [];
    // if(typeof req.body.shipmentId == 'undefined' || req.body.shipmentId ==""){
    //     res.json({  
    //         "code": 204,
    //         "message": "shipmentId is missing"
    //     });
    // } 
  
    const result = mastersModel.getShipmentMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        console.log(rows.length);
        if(typeof rows!="undefined" && rows.length > 0){
            res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
           res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
});

// Shipment Master Ends here 




// Delivery starts from here 
router.post('/createDelivery',function(req, res,next) {
    const deliveryNo = req.body.deliveryNo;
    const customerNo = req.body.customerNo;
    const createdBy = req.body.createdBy;
    const createdOn = req.body.createdOn;
    const updatedBy = req.body.updatedBy;
    const updatedOn = req.body.updatedOn;
    const isDeleted = req.body.isDeleted;
    var err = {};
    var validation = []; 

    if(typeof deliveryNo == 'undefined' || deliveryNo ==""){
        res.json({ 
            "code": 204,
            "message": "deliveryNo is missing"
        });
    }
    
    if(typeof customerNo == 'undefined' || customerNo ==""){
        res.json({ 
            "code": 204,
            "message": "customerNo is missing"
        });
    }
    if(typeof createdBy == 'undefined' || createdBy ==""){
        res.json({
            "code": 204,
            "message": "createdBy is missing"
        });
    } 
    if(typeof createdOn == 'undefined' || createdOn ==""){
        res.json({
            "code": 204,
            "message": "createdOn is missing"
        });
    }
    if(typeof updatedBy == 'undefined' || updatedBy ==""){
        res.json({  
            "code": 204,
            "message": "updatedBy is missing"
        });
    } 
    if(typeof isDeleted == 'undefined' || isDeleted ==""){
        res.json({
            "code": 204,
            "message": "isDeleted is missing"
        });
    }

    db.connection.connect(function(err){
        if(err){
            res.json({
                "code": 204,
                "message": "Something went wrong with Database"
            });
        }else{
            const sql = mastersModel.insertDeliveryQuery(db.connection,req);
            db.connection.query(sql,function(err, rows, fields){
                if (err) throw err;
                res.json({
                    "code":200,
                    "success":"Inserted",
                    "result" : rows
                });
            });
        }
       
    });   
});

router.post('/updateDelivery',function(req, res,next) {
    const deliveryId = req.body.deliveryId;
    const deliveryNo = req.body.deliveryNo;
    var err = {};
    var validation = [];
    if(typeof deliveryId == 'undefined' || deliveryId ==""){
        res.json({  
            "code": 204,
            "message": "deliveryId is missing"
        });
    } 
    if(typeof deliveryNo == 'undefined' || deliveryNo ==""){
        res.json({  
            "code": 204,
            "message": "deliveryNo is missing"
        });
    }
    const result = mastersModel.updateDeliveryQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"updated succesfully",
                "result" : rows.affectedRows + " record has been updated Successfully"
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success": false,
                "result" : " No record found"
            });
       }

    });
}); 

router.post('/deleteDelivery',function(req,res){
    const deliveryId = req.body.deliveryId;
    var err = {};
    var validation = [];
    if(typeof req.body.deliveryId == 'undefined' || req.body.deliveryId ==""){
        res.json({  
            "code": 204,
            "message": "deliveryId is missing"
        });
    } 
  
    const result = mastersModel.deleteDeliveryQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"Record has been Deleted",
                "result" : rows
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success":"Records Not Found",
                "result" : rows
            });
       }

    });
});

router.post('/getDelivery',function(req,res){
    const deliveryId = req.body.deliveryId;
    var err = {};
    var validation = [];
    // if(typeof req.body.deliveryId == 'undefined' || req.body.deliveryId ==""){
    //     res.json({  
    //         "code": 204,
    //         "message": "deliveryId is missing"
    //     });
    // } 
  
    const result = mastersModel.getDeliveryQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        console.log(rows.length);
        if(typeof rows!="undefined" && rows.length > 0){
            res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
           res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
});

// Delivery starts from here 

// DriverMaster starts from here 
router.post('/createDriverMaster',function(req, res,next) {
    const DriverName = req.body.DriverName;
    const DriverMobileNo = req.body.DriverMobileNo;
    const DriverLicenseNo = req.body.DriverLicenseNo;
    const simCardProvider = req.body.simCardProvider;
    const customerNo = req.body.customerNo;
    const createdBy = req.body.createdBy;
    const createdOn = req.body.createdOn;
    const updatedBy = req.body.updatedBy;
    const updatedOn = req.body.updatedOn;
    const isDeleted = req.body.isDeleted;
    var err = {};
    var validation = []; 

    if(typeof DriverName == 'undefined' || DriverName ==""){
        res.json({ 
            "code": 204,
            "message": "DriverName is missing"
        });
    }

    if(typeof DriverMobileNo == 'undefined' || DriverMobileNo ==""){
        res.json({ 
            "code": 204,
            "message": "DriverMobileNo is missing"
        });
    }

    if(typeof DriverName == 'undefined' || DriverName ==""){
        res.json({ 
            "code": 204,
            "message": "DriverName is missing"
        });
    }

    if(typeof DriverLicenseNo == 'undefined' || DriverLicenseNo ==""){
        res.json({ 
            "code": 204,
            "message": "DriverLicenseNo is missing"
        });
    }
    
    if(typeof simCardProvider == 'undefined' || simCardProvider ==""){
        res.json({ 
            "code": 204,
            "message": "simCardProvider is missing"
        });
    }
    
    if(typeof customerNo == 'undefined' || customerNo ==""){
        res.json({ 
            "code": 204,
            "message": "customerNo is missing"
        });
    }
    if(typeof createdBy == 'undefined' || createdBy ==""){
        res.json({
            "code": 204,
            "message": "createdBy is missing"
        });
    } 
    if(typeof createdOn == 'undefined' || createdOn ==""){
        res.json({
            "code": 204,
            "message": "createdOn is missing"
        });
    }
    if(typeof updatedBy == 'undefined' || updatedBy ==""){
        res.json({  
            "code": 204,
            "message": "updatedBy is missing"
        });
    } 
    if(typeof isDeleted == 'undefined' || isDeleted ==""){
        res.json({
            "code": 204,
            "message": "isDeleted is missing"
        });
    }

    db.connection.connect(function(err){
        if(err){
            res.json({
                "code": 204,
                "message": "Something went wrong with Database"
            });
        }else{
            const sql = mastersModel.insertDriverMasterQuery(db.connection,req);
            db.connection.query(sql,function(err, rows, fields){
                if (err) throw err;
                res.json({
                    "code":200,
                    "success":"Inserted",
                    "result" : rows
                });
            });
        }
       
    });   
});

router.post('/updateDriverMaster',function(req, res,next) {
    const driverMasterId = req.body.driverMasterId;
    const DriverName = req.body.DriverName;
    var err = {};
    var validation = [];
    if(typeof driverMasterId == 'undefined' || driverMasterId ==""){
        res.json({  
            "code": 204,
            "message": "driverMasterId is missing"
        });
    } 
    if(typeof DriverName == 'undefined' || DriverName ==""){
        res.json({  
            "code": 204,
            "message": "DriverName is missing"
        });
    }
    const result = mastersModel.updateDriverMasterQuery(db.connection,req);
    
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"updated succesfully",
                "result" : rows.affectedRows + " record has been updated Successfully"
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success": false,
                "result" : " No record found"
            });
       }

    });
}); 

router.post('/deleteDriverMaster',function(req,res){
    const driverMasterId = req.body.driverMasterId;
    var err = {};
    var validation = [];
    if(typeof req.body.driverMasterId == 'undefined' || req.body.driverMasterId ==""){
        res.json({  
            "code": 204,
            "message": "driverMasterId is missing"
        });
    } 
  
    const result = mastersModel.deleteDeliveryQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"Record has been Deleted",
                "result" : rows
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success":"Records Not Found",
                "result" : rows
            });
       }

    });
});

router.post('/getDriverMaster',function(req,res){
    const driverMasterId = req.body.driverMasterId;
    var err = {};
    var validation = [];
    // if(typeof req.body.driverMasterId == 'undefined' || req.body.driverMasterId ==""){
    //     res.json({  
    //         "code": 204,
    //         "message": "driverMasterId is missing"
    //     });
    // } 
  
    const result = mastersModel.getDriverMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        console.log(rows.length);
        if(typeof rows!="undefined" && rows.length > 0){
            res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
           res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
});

// DriverMaster ends  here 

// shipmentDeliveryMapping starts from here 

router.post('/createShipmentDeliveryMapping',function(req, res,next) {
    const shipmentId = req.body.shipmentId;
    const deliveryId  = req.body.deliveryId;
    const customerNo = req.body.customerNo;
    const createdBy = req.body.createdBy;
    const createdOn = req.body.createdOn;
    const updatedBy = req.body.updatedBy;
    const updatedOn = req.body.updatedOn;
    const isDeleted = req.body.isDeleted;
    var err = {};
    var validation = []; 

    if(typeof shipmentId == 'undefined' || shipmentId ==""){
        res.json({ 
            "code": 204,
            "message": "shipmentId is missing"
        });
    }

    if(typeof deliveryId == 'undefined' || deliveryId ==""){
        res.json({ 
            "code": 204,
            "message": "deliveryId is missing"
        });
    }
    
    if(typeof customerNo == 'undefined' || customerNo ==""){
        res.json({ 
            "code": 204,
            "message": "customerNo is missing"
        });
    }
    if(typeof createdBy == 'undefined' || createdBy ==""){
        res.json({
            "code": 204,
            "message": "createdBy is missing"
        });
    } 
    if(typeof createdOn == 'undefined' || createdOn ==""){
        res.json({
            "code": 204,
            "message": "createdOn is missing"
        });
    }
    if(typeof updatedBy == 'undefined' || updatedBy ==""){
        res.json({  
            "code": 204,
            "message": "updatedBy is missing"
        });
    } 
    if(typeof isDeleted == 'undefined' || isDeleted ==""){
        res.json({
            "code": 204,
            "message": "isDeleted is missing"
        });
    }

    db.connection.connect(function(err){
        if(err){
            res.json({
                "code": 204,
                "message": "Something went wrong with Database"
            });
        }else{
            const sql = mastersModel.insertShipmentDeliveryMappingQuery(db.connection,req);
            db.connection.query(sql,function(err, rows, fields){
                if (err) throw err;
                res.json({
                    "code":200,
                    "success":"Inserted",
                    "result" : rows
                });
            });
        }
       
    });   
});

router.post('/updateShipmentDeliveryMapping',function(req, res,next) {
    const shipmentDeliveryMappingId = req.body.shipmentDeliveryMappingId;
    const shipmentId = req.body.shipmentId;
    var err = {};
    var validation = [];
    if(typeof shipmentDeliveryMappingId == 'undefined' || shipmentDeliveryMappingId ==""){
        res.json({  
            "code": 204,
            "message": "shipmentDeliveryMappingId is missing"
        });
    } 
    if(typeof shipmentId == 'undefined' || shipmentId ==""){
        res.json({  
            "code": 204,
            "message": "shipmentId is missing"
        });
    }
    const result = mastersModel.updateShipmentDeliveryMappingQuery(db.connection,req);
    
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"updated succesfully",
                "result" : rows.affectedRows + " record has been updated Successfully"
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success": false,
                "result" : " No record found"
            });
       }

    });
}); 

router.post('/deleteShipmentDeliveryMapping',function(req,res){
    const shipmentDeliveryMappingId = req.body.shipmentDeliveryMappingId;
    var err = {};
    var validation = [];
    if(typeof req.body.shipmentDeliveryMappingId == 'undefined' || req.body.shipmentDeliveryMappingId ==""){
        res.json({  
            "code": 204,
            "message": "shipmentDeliveryMappingId is missing"
        });
    } 
  
    const result = mastersModel.deleteShipmentDeliveryMappingQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"Record has been Deleted",
                "result" : rows
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success":"Records Not Found",
                "result" : rows
            });
       }

    });
});

router.post('/getshipmentDeliveryMapping',function(req,res){
    const shipmentDeliveryMappingId = req.body.shipmentDeliveryMappingId;
    var err = {};
    var validation = [];
    if(typeof req.body.shipmentDeliveryMappingId == 'undefined' || req.body.shipmentDeliveryMappingId ==""){
        res.json({  
            "code": 204,
            "message": "shipmentDeliveryMappingId is missing"
        });
    } 
  
    const result = mastersModel.getShipmentDeliveryMappingQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows!="undefined" && rows.length > 0){
            res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
           res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
});
// shipmentDeliveryMapping ends here 

// transporterMaster starts from here 

router.post('/createTransporterMaster',function(req, res,next) {
    const transporterName = req.body.transporterName;
    const transporterCode  = req.body.transporterCode;
    const customerNo = req.body.customerNo;
    const createdBy = req.body.createdBy;
    const createdOn = req.body.createdOn;
    const updatedBy = req.body.updatedBy;
    const updatedOn = req.body.updatedOn;
    const isDeleted = req.body.isDeleted;
    var err = {};
    var validation = []; 

    if(typeof transporterName == 'undefined' || transporterName ==""){
        res.json({ 
            "code": 204,
            "message": "transporterName is missing"
        });
    }

    if(typeof transporterCode == 'undefined' || transporterCode ==""){
        res.json({ 
            "code": 204,
            "message": "transporterCode is missing"
        });
    }
    
    if(typeof customerNo == 'undefined' || customerNo ==""){
        res.json({ 
            "code": 204,
            "message": "customerNo is missing"
        });
    }
    if(typeof createdBy == 'undefined' || createdBy ==""){
        res.json({
            "code": 204,
            "message": "createdBy is missing"
        });
    } 
    if(typeof createdOn == 'undefined' || createdOn ==""){
        res.json({
            "code": 204,
            "message": "createdOn is missing"
        });
    }
    if(typeof updatedBy == 'undefined' || updatedBy ==""){
        res.json({  
            "code": 204,
            "message": "updatedBy is missing"
        });
    } 
    if(typeof isDeleted == 'undefined' || isDeleted ==""){
        res.json({
            "code": 204,
            "message": "isDeleted is missing"
        });
    }

    db.connection.connect(function(err){
        if(err){
            res.json({
                "code": 204,
                "message": "Something went wrong with Database"
            });
        }else{
            const sql = mastersModel.insertTransporterMasterQuery(db.connection,req);
            db.connection.query(sql,function(err, rows, fields){
                if (err) throw err;
                res.json({
                    "code":200,
                    "success":"Inserted",
                    "result" : rows
                });
            });
        }
       
    });   
});

router.post('/updateTransporterMaster',function(req, res,next) {
    const transporterMasterId = req.body.transporterMasterId;
    const transporterName = req.body.transporterName;
    var err = {};
    var validation = [];
    if(typeof transporterMasterId == 'undefined' || transporterMasterId ==""){
        res.json({  
            "code": 204,
            "message": "transporterMasterId is missing"
        });
    } 
    if(typeof transporterName == 'undefined' || transporterName ==""){
        res.json({  
            "code": 204,
            "message": "transporterName is missing"
        });
    }
    const result = mastersModel.updateTransporterMasterQuery(db.connection,req);
    
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"updated succesfully",
                "result" : rows.affectedRows + " record has been updated Successfully"
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success": false,
                "result" : " No record found"
            });
       }

    });
}); 

router.post('/deleteTransporterMaster',function(req,res){
    const transporterMasterId = req.body.transporterMasterId;
    var err = {};
    var validation = [];
    if(typeof req.body.transporterMasterId == 'undefined' || req.body.transporterMasterId ==""){
        res.json({  
            "code": 204,
            "message": "transporterMasterId is missing"
        });
    } 
  
    const result = mastersModel.deleteTransporterMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"Record has been Deleted",
                "result" : rows
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success":"Records Not Found",
                "result" : rows
            });
       }

    });
});

router.post('/getTransporterMaster',function(req,res){
    const transporterMasterId = req.body.transporterMasterId;
    var err = {};
    var validation = [];
    // if(typeof req.body.transporterMasterId == 'undefined' || req.body.transporterMasterId ==""){
    //     res.json({  
    //         "code": 204,
    //         "message": "transporterMasterId is missing"
    //     });
    // } 
  
    const result = mastersModel.getTransporterMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows!="undefined" && rows.length > 0){
            res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
           res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
});

// transporterMaster ends here 

// RouteCheckpointMapping starts from here 

router.post('/createRouteCheckpointMapping',function(req, res,next) {
    const routeMasterId = req.body.routeMasterId;
    const checkPointMasterId  = req.body.checkPointMasterId;
    const eta  = req.body.eta;
    const etd  = req.body.etd;
    const customerNo = req.body.customerNo;
    const createdBy = req.body.createdBy;
    const createdOn = req.body.createdOn;
    const updatedBy = req.body.updatedBy;
    const updatedOn = req.body.updatedOn;
    const isDeleted = req.body.isDeleted;
    var err = {};
    var validation = []; 

    if(typeof routeMasterId == 'undefined' || routeMasterId ==""){
        res.json({ 
            "code": 204,
            "message": "routeMasterId is missing"
        });
    }

    if(typeof checkPointMasterId == 'undefined' || checkPointMasterId ==""){
        res.json({ 
            "code": 204,
            "message": "checkPointMasterId is missing"
        });
    }

    if(typeof eta == 'undefined' || eta ==""){
        res.json({ 
            "code": 204,
            "message": "eta is missing"
        });
    }

    if(typeof etd == 'undefined' || etd ==""){
        res.json({ 
            "code": 204,
            "message": "etd is missing"
        });
    }
    
    if(typeof customerNo == 'undefined' || customerNo ==""){
        res.json({ 
            "code": 204,
            "message": "customerNo is missing"
        });
    }
    if(typeof createdBy == 'undefined' || createdBy ==""){
        res.json({
            "code": 204,
            "message": "createdBy is missing"
        });
    } 
    if(typeof createdOn == 'undefined' || createdOn ==""){
        res.json({
            "code": 204,
            "message": "createdOn is missing"
        });
    }
    if(typeof updatedBy == 'undefined' || updatedBy ==""){
        res.json({  
            "code": 204,
            "message": "updatedBy is missing"
        });
    } 
    if(typeof isDeleted == 'undefined' || isDeleted ==""){
        res.json({
            "code": 204,
            "message": "isDeleted is missing"
        });
    }

    db.connection.connect(function(err){
        if(err){
            res.json({
                "code": 204,
                "message": "Something went wrong with Database"
            });
        }else{
            const sql = mastersModel.insertRouteCheckpointMappingQuery(db.connection,req);
            db.connection.query(sql,function(err, rows, fields){
                if (err) throw err;
                res.json({
                    "code":200,
                    "success":"Inserted",
                    "result" : rows
                });
            });
        }
       
    });   
});

router.post('/updateRouteCheckpointMapping',function(req, res,next) {
    const routeCheckPointMappingId = req.body.routeCheckPointMappingId;
    const routeMasterId = req.body.routeMasterId;
    const checkPointMasterId = req.body.checkPointMasterId;
    
    var err = {};
    var validation = [];
    if(typeof routeCheckPointMappingId == 'undefined' || routeCheckPointMappingId ==""){
        res.json({  
            "code": 204,
            "message": "routeCheckPointMappingId is missing"
        });
    } 
    if(typeof routeMasterId == 'undefined' || routeMasterId ==""){
        res.json({  
            "code": 204,
            "message": "routeMasterId is missing"
        });
    }

    if(typeof checkPointMasterId == 'undefined' || checkPointMasterId ==""){
        res.json({  
            "code": 204,
            "message": "checkPointMasterId is missing"
        });
    }
    const result = mastersModel.updateRouteCheckpointMappingQuery(db.connection,req);
    
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"updated succesfully",
                "result" : rows.affectedRows + " record has been updated Successfully"
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success": false,
                "result" : " No record found"
            });
       }

    });
}); 

router.post('/deleteRouteCheckpointMapping',function(req,res){
    const routeCheckPointMappingId = req.body.routeCheckPointMappingId;
    var err = {};
    var validation = [];
    if(typeof req.body.routeCheckPointMappingId == 'undefined' || req.body.routeCheckPointMappingId ==""){
        res.json({  
            "code": 204,
            "message": "routeCheckPointMappingId is missing"
        });
    } 
  
    const result = mastersModel.deleteRouteCheckpointMappingQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"Record has been Deleted",
                "result" : rows
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success":"Records Not Found",
                "result" : rows
            });
       }

    });
});

router.post('/getRouteCheckpointMapping',function(req,res){
    const routeCheckPointMappingId = req.body.routeCheckPointMappingId;
    var err = {};
    var validation = [];
    if(typeof req.body.routeCheckPointMappingId == 'undefined' || req.body.routeCheckPointMappingId ==""){
        res.json({  
            "code": 204,
            "message": "routeCheckPointMappingId is missing"
        });
    } 
  
    const result = mastersModel.getRouteCheckpointMappingQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows!="undefined" && rows.length > 0){
            res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
           res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
});

// routecheckpointmapping ends  here 

// trip starts from here
router.post('/createTrip',function(req, res,next) {
    const shipmentDeliveryMappingId = req.body.shipmentDeliveryMappingId;
    const sourceId  = req.body.sourceId;
    const destinationId  = req.body.destinationId;
    const vehicleNo  = req.body.vehicleNo;
    const startDateTime  = req.body.startDateTime;
    const endDateTime  = req.body.endDateTime;
    const transporterMasterId  = req.body.transporterMasterId;
    const driverMasterId  = req.body.driverMasterId;
    const routeMasterId  = req.body.routeMasterId;
    const tripStatusMasterId  = req.body.tripStatusMasterId;
    const SkuMasterId  = req.body.SkuMasterId;
    const vehicleTypeMasterId  = req.body.vehicleTypeMasterId;
    const customerNo = req.body.customerNo;
    const createdBy = req.body.createdBy;
    const createdOn = req.body.createdOn;
    const updatedBy = req.body.updatedBy;
    const updatedOn = req.body.updatedOn;
    const isDeleted = req.body.isDeleted;
    var err = {};
    var validation = []; 

    if(typeof shipmentDeliveryMappingId == 'undefined' || shipmentDeliveryMappingId ==""){
        res.json({ 
            "code": 204,
            "message": "shipmentDeliveryMappingId is missing"
        });
    }

    if(typeof sourceId == 'undefined' || sourceId ==""){
        res.json({ 
            "code": 204,
            "message": "sourceId is missing"
        });
    }

    if(typeof destinationId == 'undefined' || destinationId ==""){
        res.json({ 
            "code": 204,
            "message": "destinationId is missing"
        });
    }

    if(typeof vehicleNo == 'undefined' || vehicleNo ==""){
        res.json({ 
            "code": 204,
            "message": "vehicleNo is missing"
        });
    }

    if(typeof startDateTime == 'undefined' || startDateTime ==""){
        res.json({ 
            "code": 204,
            "message": "startDateTime is missing"
        });
    }

    if(typeof endDateTime == 'undefined' || endDateTime ==""){
        res.json({ 
            "code": 204,
            "message": "endDateTime is missing"
        });
    }

    if(typeof transporterMasterId == 'undefined' || transporterMasterId ==""){
        res.json({ 
            "code": 204,
            "message": "transporterMasterId is missing"
        });
    }

    if(typeof driverMasterId == 'undefined' || driverMasterId ==""){
        res.json({ 
            "code": 204,
            "message": "driverMasterId is missing"
        });
    }

    if(typeof routeMasterId == 'undefined' || routeMasterId ==""){
        res.json({ 
            "code": 204,
            "message": "routeMasterId is missing"
        });
    }

    if(typeof tripStatusMasterId == 'undefined' || tripStatusMasterId ==""){
        res.json({ 
            "code": 204,
            "message": "tripStatusMasterId is missing"
        });
    }

    if(typeof SkuMasterId == 'undefined' || SkuMasterId  ==""){
        res.json({ 
            "code": 204,
            "message": "SkuMasterId is missing"
        });
    }

    if(typeof vehicleTypeMasterId == 'undefined' || vehicleTypeMasterId ==""){
        res.json({ 
            "code": 204,
            "message": "vehicleTypeMasterId is missing"
        });
    }
    
    if(typeof customerNo == 'undefined' || customerNo ==""){
        res.json({ 
            "code": 204,
            "message": "customerNo is missing"
        });
    }
    if(typeof createdBy == 'undefined' || createdBy ==""){
        res.json({
            "code": 204,
            "message": "createdBy is missing"
        });
    } 
    if(typeof createdOn == 'undefined' || createdOn ==""){
        res.json({
            "code": 204,
            "message": "createdOn is missing"
        });
    }
    if(typeof updatedBy == 'undefined' || updatedBy ==""){
        res.json({  
            "code": 204,
            "message": "updatedBy is missing"
        });
    } 
    if(typeof isDeleted == 'undefined' || isDeleted ==""){
        res.json({
            "code": 204,
            "message": "isDeleted is missing"
        });
    }

    db.connection.connect(function(err){
        if(err){
            res.json({
                "code": 204,
                "message": "Something went wrong with Database"
            });
        }else{
            const sql = mastersModel.insertTripQuery(db.connection,req);
            db.connection.query(sql,function(err, rows, fields){
                if (err) throw err;
                res.json({
                    "code":200,
                    "success":"Inserted",
                    "result" : rows
                });
            });
        }
       
    });   
});

router.post('/updateTrip',function(req, res,next) {
    const tripId = req.body.tripId;
    const shipmentDeliveryMappingId = req.body.shipmentDeliveryMappingId;
    const sourceId = req.body.sourceId;
    
    var err = {};
    var validation = [];
    if(typeof tripId == 'undefined' || tripId ==""){
        res.json({  
            "code": 204,
            "message": "tripId is missing"
        });
    } 
    if(typeof shipmentDeliveryMappingId == 'undefined' || shipmentDeliveryMappingId ==""){
        res.json({  
            "code": 204,
            "message": "shipmentDeliveryMappingId is missing"
        });
    }

    if(typeof sourceId == 'undefined' || sourceId ==""){
        res.json({  
            "code": 204,
            "message": "sourceId is missing"
        });
    }
    const result = mastersModel.updateTripQuery(db.connection,req);
    
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"updated succesfully",
                "result" : rows.affectedRows + " record has been updated Successfully"
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success": false,
                "result" : " No record found"
            });
       }

    });
}); 

router.post('/deleteTrip',function(req,res){
    const tripId = req.body.tripId;
    var err = {};
    var validation = [];
    if(typeof req.body.tripId == 'undefined' || req.body.tripId ==""){
        res.json({  
            "code": 204,
            "message": "tripId is missing"
        });
    } 
  
    const result = mastersModel.deleteTripQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"Record has been Deleted",
                "result" : rows
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success":"Records Not Found",
                "result" : rows
            });
       }

    });
});

router.post('/getTrip',function(req,res){
    const tripId = req.body.tripId;
    var err = {};
    var validation = [];
    // if(typeof req.body.tripId == 'undefined' || req.body.tripId ==""){
    //     res.json({  
    //         "code": 204,
    //         "message": "tripId is missing"
    //     });
    // } 
  
    const result = mastersModel.getTripQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows!="undefined" && rows.length > 0){
            res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
           res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
});

// trip ends here

// tripstatusmaster starts from here 
router.post('/createTripStatusMaster',function(req, res,next) {
    const statusName  = req.body.statusName;
    const customerNo = req.body.customerNo;
    const createdBy = req.body.createdBy;
    const createdOn = req.body.createdOn;
    const updatedBy = req.body.updatedBy;
    const updatedOn = req.body.updatedOn;
    const isDeleted = req.body.isDeleted;
    var err = {};
    var validation = []; 

    if(typeof statusName == 'undefined' || statusName ==""){
        res.json({ 
            "code": 204,
            "message": "statusName is missing"
        });
    }
    
    if(typeof customerNo == 'undefined' || customerNo ==""){
        res.json({ 
            "code": 204,
            "message": "customerNo is missing"
        });
    }
    if(typeof createdBy == 'undefined' || createdBy ==""){
        res.json({
            "code": 204,
            "message": "createdBy is missing"
        });
    } 
    if(typeof createdOn == 'undefined' || createdOn ==""){
        res.json({
            "code": 204,
            "message": "createdOn is missing"
        });
    }
    if(typeof updatedBy == 'undefined' || updatedBy ==""){
        res.json({  
            "code": 204,
            "message": "updatedBy is missing"
        });
    } 
    if(typeof isDeleted == 'undefined' || isDeleted ==""){
        res.json({
            "code": 204,
            "message": "isDeleted is missing"
        });
    }

    db.connection.connect(function(err){
        if(err){
            res.json({
                "code": 204,
                "message": "Something went wrong with Database"
            });
        }else{
            const sql = mastersModel.insertTripStatusMasterQuery(db.connection,req);
            db.connection.query(sql,function(err, rows, fields){
                if (err) throw err;
                res.json({
                    "code":200,
                    "success":"Inserted",
                    "result" : rows
                });
            });
        }
       
    });   
});

router.post('/updateTripStatusMaster',function(req, res,next) {
    const tripStatusMasterId = req.body.tripStatusMasterId;
    const statusName = req.body.statusName;
    
    
    var err = {};
    var validation = [];
    if(typeof tripStatusMasterId == 'undefined' || tripStatusMasterId ==""){
        res.json({  
            "code": 204,
            "message": "tripStatusMasterId is missing"
        });
    } 
    if(typeof statusName == 'undefined' || statusName ==""){
        res.json({  
            "code": 204,
            "message": "statusName is missing"
        });
    }

   
    const result = mastersModel.updateTripStatusMasterQuery(db.connection,req);
    
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"updated succesfully",
                "result" : rows.affectedRows + " record has been updated Successfully"
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success": false,
                "result" : " No record found"
            });
       }

    });
}); 

router.post('/deleteTripStatusMaster',function(req,res){
    const tripStatusMasterId = req.body.tripStatusMasterId;
    var err = {};
    var validation = [];
    if(typeof req.body.tripStatusMasterId == 'undefined' || req.body.tripStatusMasterId ==""){
        res.json({  
            "code": 204,
            "message": "tripStatusMasterId is missing"
        });
    } 
  
    const result = mastersModel.deleteTripStatusMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"Record has been Deleted",
                "result" : rows
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success":"Records Not Found",
                "result" : rows
            });
       }

    });
});

router.post('/getTripStatusMaster',function(req,res){
    const tripStatusMasterId = req.body.tripStatusMasterId;
    var err = {};
    var validation = [];
    // if(typeof req.body.tripStatusMasterId == 'undefined' || req.body.tripStatusMasterId ==""){
    //     res.json({  
    //         "code": 204,
    //         "message": "tripStatusMasterId is missing"
    //     });
    // } 
  
    const result = mastersModel.getTripStatusMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows!="undefined" && rows.length > 0){
            res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
           res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
});
// tripstatusmaster ends here 

// vehicletypemaster starts from here 
router.post('/createVehicleTypeMaster',function(req, res,next) {
    const type  = req.body.type;
    const description  = req.body.description;
    const customerNo = req.body.customerNo;
    const createdBy = req.body.createdBy;
    const createdOn = req.body.createdOn;
    const updatedBy = req.body.updatedBy;
    const updatedOn = req.body.updatedOn;
    const isDeleted = req.body.isDeleted;
    var err = {};
    var validation = []; 

    if(typeof type == 'undefined' || type ==""){
        res.json({ 
            "code": 204,
            "message": "type is missing"
        });
    }

    if(typeof description == 'undefined' || description ==""){
        res.json({ 
            "code": 204,
            "message": "description is missing"
        });
    }
    
    if(typeof customerNo == 'undefined' || customerNo ==""){
        res.json({ 
            "code": 204,
            "message": "customerNo is missing"
        });
    }
    if(typeof createdBy == 'undefined' || createdBy ==""){
        res.json({
            "code": 204,
            "message": "createdBy is missing"
        });
    } 
    if(typeof createdOn == 'undefined' || createdOn ==""){
        res.json({
            "code": 204,
            "message": "createdOn is missing"
        });
    }
    if(typeof updatedBy == 'undefined' || updatedBy ==""){
        res.json({  
            "code": 204,
            "message": "updatedBy is missing"
        });
    } 
    if(typeof isDeleted == 'undefined' || isDeleted ==""){
        res.json({
            "code": 204,
            "message": "isDeleted is missing"
        });
    }

    db.connection.connect(function(err){
        if(err){
            res.json({
                "code": 204,
                "message": "Something went wrong with Database"
            });
        }else{
            const sql = mastersModel.insertVehicleTypeMasterQuery(db.connection,req);
            db.connection.query(sql,function(err, rows, fields){
                if (err) throw err;
                res.json({
                    "code":200,
                    "success":"Inserted",
                    "result" : rows
                });
            });
        }
       
    });   
});

router.post('/updateVehicleTypeMaster',function(req, res,next) {
    const vehicleTypeMasterId = req.body.vehicleTypeMasterId;
    const type = req.body.type;
    
    
    var err = {};
    var validation = [];
    if(typeof vehicleTypeMasterId == 'undefined' || vehicleTypeMasterId ==""){
        res.json({  
            "code": 204,
            "message": "vehicleTypeMasterId is missing"
        });
    } 
    if(typeof type == 'undefined' || type ==""){
        res.json({  
            "code": 204,
            "message": "type is missing"
        });
    }

   
    const result = mastersModel.updateVehicleTypeMasterQuery(db.connection,req);
    
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"updated succesfully",
                "result" : rows.affectedRows + " record has been updated Successfully"
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success": false,
                "result" : " No record found"
            });
       }

    });
});

router.post('/deleteVehicleTypeMaster',function(req,res){
    const vehicleTypeMasterId = req.body.vehicleTypeMasterId;
    var err = {};
    var validation = [];
    if(typeof req.body.vehicleTypeMasterId == 'undefined' || req.body.vehicleTypeMasterId ==""){
        res.json({  
            "code": 204,
            "message": "vehicleTypeMasterId is missing"
        });
    } 
  
    const result = mastersModel.deleteVehicleTypeMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"Record has been Deleted",
                "result" : rows
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success":"Records Not Found",
                "result" : rows
            });
       }

    });
});

router.post('/getVehicleTypeMaster',function(req,res){
    const vehicleTypeMasterId = req.body.vehicleTypeMasterId;
    var err = {};
    var validation = [];
    // if(typeof req.body.vehicleTypeMasterId == 'undefined' || req.body.vehicleTypeMasterId ==""){
    //     res.json({  
    //         "code": 204,
    //         "message": "vehicleTypeMasterId is missing"
    //     });
    // } 
  
    const result = mastersModel.getVehicleTypeMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows!="undefined" && rows.length > 0){
            res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
           res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
});
// vehicletypemaster ends  here 

// usermaster starts from here 
router.post('/createUserMaster',function(req, res,next) {
    const userNo  = req.body.userNo;
    const userName  = req.body.userName;
    const userRealName  = req.body.userRealName;
    const userEmail  = req.body.userEmail;
    const userMobileNo  = req.body.userMobileNo;
    const customerNo = req.body.customerNo;
    const createdBy = req.body.createdBy;
    const createdOn = req.body.createdOn;
    const updatedBy = req.body.updatedBy;
    const updatedOn = req.body.updatedOn;
    const isDeleted = req.body.isDeleted;
    var err = {};
    var validation = []; 

    if(typeof userNo == 'undefined' || userNo ==""){
        res.json({ 
            "code": 204,
            "message": "userNo is missing"
        });
    }

    if(typeof userName == 'undefined' || userName ==""){
        res.json({ 
            "code": 204,
            "message": "userName is missing"
        });
    }

    if(typeof userRealName == 'undefined' || userRealName ==""){
        res.json({ 
            "code": 204,
            "message": "userRealName is missing"
        });
    }

    if(typeof userEmail == 'undefined' || userEmail ==""){
        res.json({ 
            "code": 204,
            "message": "userEmail is missing"
        });
    }

    if(typeof userMobileNo == 'undefined' || userMobileNo ==""){
        res.json({ 
            "code": 204,
            "message": "userMobileNo is missing"
        });
    }
    
    if(typeof customerNo == 'undefined' || customerNo ==""){
        res.json({ 
            "code": 204,
            "message": "customerNo is missing"
        });
    }
    if(typeof createdBy == 'undefined' || createdBy ==""){
        res.json({
            "code": 204,
            "message": "createdBy is missing"
        });
    } 
    if(typeof createdOn == 'undefined' || createdOn ==""){
        res.json({
            "code": 204,
            "message": "createdOn is missing"
        });
    }
    if(typeof updatedBy == 'undefined' || updatedBy ==""){
        res.json({  
            "code": 204,
            "message": "updatedBy is missing"
        });
    } 
    if(typeof isDeleted == 'undefined' || isDeleted ==""){
        res.json({
            "code": 204,
            "message": "isDeleted is missing"
        });
    }

    db.connection.connect(function(err){
        if(err){
            res.json({
                "code": 204,
                "message": "Something went wrong with Database"
            });
        }else{
            const sql = mastersModel.insertUserMasterQuery(db.connection,req);
            db.connection.query(sql,function(err, rows, fields){
                if (err) throw err;
                res.json({
                    "code":200,
                    "success":"Inserted",
                    "result" : rows
                });
            });
        }
       
    });   
});

router.post('/updateUserMaster',function(req, res,next) {
    const userMasterId = req.body.userMasterId;
    const userNo = req.body.userNo;
    var err = {};
    var validation = [];
    if(typeof userMasterId == 'undefined' || userMasterId ==""){
        res.json({  
            "code": 204,
            "message": "userMasterId is missing"
        });
    } 
    if(typeof userNo == 'undefined' || userNo ==""){
        res.json({  
            "code": 204,
            "message": "userNo is missing"
        });
    }

   
    const result = mastersModel.updateUserMasterQuery(db.connection,req);
    
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"updated succesfully",
                "result" : rows.affectedRows + " record has been updated Successfully"
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success": false,
                "result" : " No record found"
            });
       }

    });
});

router.post('/deleteUserMaster',function(req,res){
    const userMasterId = req.body.userMasterId;
    var err = {};
    var validation = [];
    if(typeof req.body.userMasterId == 'undefined' || req.body.userMasterId ==""){
        res.json({  
            "code": 204,
            "message": "userMasterId is missing"
        });
    } 
  
    const result = mastersModel.deleteUserMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"Record has been Deleted",
                "result" : rows
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success":"Records Not Found",
                "result" : rows
            });
       }

    });
});

router.post('/getUserMaster',function(req,res){
    const userMasterId = req.body.userMasterId;
    var err = {};
    var validation = [];
    // if(typeof req.body.userMasterId == 'undefined' || req.body.userMasterId ==""){
    //     res.json({  
    //         "code": 204,
    //         "message": "userMasterId is missing"
    //     });
    // } 
  
    const result = mastersModel.getUserMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows!="undefined" && rows.length > 0){
            res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
           res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
});
// usermaster ends  here 

// skumaster starts from here 
router.post('/createSkuMaster',function(req, res,next) {
    const skuId  = req.body.skuId;
    const skuName  = req.body.skuName;
    const unitVolume  = req.body.unitVolume;
    const netUnitWeight  = req.body.netUnitWeight;
    const netGrossRatio  = req.body.netGrossRatio;
    const skuCode  = req.body.skuCode;
    const customerNo = req.body.customerNo;
    const createdBy = req.body.createdBy;
    const createdOn = req.body.createdOn;
    const updatedBy = req.body.updatedBy;
    const updatedOn = req.body.updatedOn;
    const isDeleted = req.body.isDeleted;
    var err = {};
    var validation = []; 

    if(typeof skuId == 'undefined' || skuId ==""){
        res.json({ 
            "code": 204,
            "message": "skuId is missing"
        });
    }

    if(typeof skuName == 'undefined' || skuName ==""){
        res.json({ 
            "code": 204,
            "message": "skuName is missing"
        });
    }

    if(typeof unitVolume == 'undefined' || unitVolume ==""){
        res.json({ 
            "code": 204,
            "message": "unitVolume is missing"
        });
    }

    if(typeof netUnitWeight == 'undefined' || netUnitWeight ==""){
        res.json({ 
            "code": 204,
            "message": "netUnitWeight is missing"
        });
    }

    if(typeof netGrossRatio == 'undefined' || netGrossRatio ==""){
        res.json({ 
            "code": 204,
            "message": "netGrossRatio is missing"
        });
    }

    if(typeof skuCode == 'undefined' || skuCode ==""){
        res.json({ 
            "code": 204,
            "message": "skuCode is missing"
        });
    }
    
    if(typeof customerNo == 'undefined' || customerNo ==""){
        res.json({ 
            "code": 204,
            "message": "customerNo is missing"
        });
    }
    if(typeof createdBy == 'undefined' || createdBy ==""){
        res.json({
            "code": 204,
            "message": "createdBy is missing"
        });
    } 
    if(typeof createdOn == 'undefined' || createdOn ==""){
        res.json({
            "code": 204,
            "message": "createdOn is missing"
        });
    }
    if(typeof updatedBy == 'undefined' || updatedBy ==""){
        res.json({  
            "code": 204,
            "message": "updatedBy is missing"
        });
    } 
    if(typeof isDeleted == 'undefined' || isDeleted ==""){
        res.json({
            "code": 204,
            "message": "isDeleted is missing"
        });
    }

    db.connection.connect(function(err){
        if(err){
            res.json({
                "code": 204,
                "message": "Something went wrong with Database"
            });
        }else{
            const sql = mastersModel.insertSkuMasterQuery(db.connection,req);
            db.connection.query(sql,function(err, rows, fields){
                if (err) throw err;
                res.json({
                    "code":200,
                    "success":"Inserted",
                    "result" : rows
                });
            });
        }
       
    });   
});

router.post('/updateSkuMaster',function(req, res,next) {
    const skuId = req.body.skuId;
    const skuName = req.body.skuName;
    var err = {};
    var validation = [];
    if(typeof skuId == 'undefined' || skuId ==""){
        res.json({  
            "code": 204,
            "message": "skuId is missing"
        });
    } 
    if(typeof skuName == 'undefined' || skuName ==""){
        res.json({  
            "code": 204,
            "message": "skuName is missing"
        });
    }

   
    const result = mastersModel.updateSkuMasterQuery(db.connection,req);
    
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"updated succesfully",
                "result" : rows.affectedRows + " record has been updated Successfully"
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success": false,
                "result" : " No record found"
            });
       }

    });
});

router.post('/deleteSkuMaster',function(req,res){
    const skuId = req.body.skuId;
    var err = {};
    var validation = [];
    if(typeof req.body.skuId == 'undefined' || req.body.skuId ==""){
        res.json({  
            "code": 204,
            "message": "skuId is missing"
        });
    } 
  
    const result = mastersModel.deleteSkuMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows.affectedRows !="undefined" && rows.affectedRows > 0 ){
            res.json({
                "code":200,
                "success":"Record has been Deleted",
                "result" : rows
            });
        }

       else if(typeof rows.affectedRows !=="undefined" && rows.affectedRows === 0 ){
           res.json({
                "code":404,
                "success":"Records Not Found",
                "result" : rows
            });
       }

    });
});

router.post('/getSkuMaster',function(req,res){
    const skuId = req.body.skuId;
    var err = {};
    var validation = [];
    console.log(req.body);
    // if(typeof req.body.skuId == 'undefined' || req.body.skuId ==""){
    //     return res.json({  
    //         "code": 204,
    //         "message": "skuId is missing"
    //     });
    // } 
   
  
    const result = mastersModel.getSkuMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows!="undefined" && rows.length > 0){
            return res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
        return res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
});

router.post('/getCityMaster',function(req,res){
    const cityId = req.body.cityId;
    var err = {};
    var validation = [];
    console.log(req.body);
    // if(typeof req.body.skuId == 'undefined' || req.body.skuId ==""){
    //     return res.json({  
    //         "code": 204,
    //         "message": "skuId is missing"
    //     });
    // } 
   
  
    const result = mastersModel.getCityMasterQuery(db.connection,req);
    db.connection.query(result,function(err, rows, fields){
        if (err) {
            res.json({
                "code":404,
                "success":"Not Found",
                "result" : err
            });
        }
        
        if(typeof rows!="undefined" && rows.length > 0){
            return res.json({
                "code":200,
                "success":true,
                "result" : rows
            });
        }

       else if(typeof rows !="undefined" && rows.length === 0 ){
        return res.json({
                "code":404,
                "success":false,
                "result" : "Records Not Found"
            });
       }

    });
});

//  function getPromiseData(pool) {
//     return new Promise((resolve,reject) => {
//         const result = pool.query('SELECT * from checkpointmaster limit 1',function(err,rows,fields){
//             if(err){
//                 reject(err);
//             }
//             resolve(rows);
//         });
//     });
  
//   }

// skumaster ends here 



module.exports = router;