const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const dispatchController = require("../controller/dispatchController");
const safeJsonStringify = require("safe-json-stringify");
const asyncLoop = require("node-async-loop");
const locationController = require("../controller/locationController");

router.post("/", (req, res) => {
  res.json({ msg: "Welcome to API" });
});

router.post(
  "/dispatch",
  /* verifyToken, */ async (req, res) => {
    const dataFromController = await dispatchController.createDispatch(
      req,
      res
    );
    //res.json(safeJsonStringify(dataFromController));
  }
);

router.post(
  "/dispatch/getDispatchDetails",
  /* verifyToken, */ async (req, res) => {
    res, send("received");
    // const dataFromController = await dispatchController.createDispatch(
    //   req,
    //   res
    // );
    //res.json(safeJsonStringify(dataFromController));
  }
);

router.get("/dispatch", async (req, res) => {
  let resultDataArray = {};

  let getAllDispatchesDataArray = await dispatchController.getAllDispatch(
    req,
    res
  );

  //return res.json({ msg: getAllDispatchesDataArray });

  let ArrTemp = [];

  try {
    const response = await Promise.all(
      getAllDispatchesDataArray.map(async item => {
        resultDataArray["sourceName"] = await dispatchController.getSourceName(
          item.sourceId,
          res
        ); //sourceName;
        resultDataArray[
          "destinationName"
        ] = await dispatchController.getSourceName(item.destinationId, res);

        resultDataArray[
          "transporterName"
        ] = await dispatchController.getTransporterName(
          item.transporterMasterId,
          res
        );
        resultDataArray["driverName"] = await dispatchController.getDriverName(
          item.driverMasterId,
          res
        );
        resultDataArray["routeName"] = await dispatchController.getRouteName(
          item.routeMasterId,
          res
        );
        resultDataArray[
          "tripStatus"
        ] = await dispatchController.getTripStatusName(
          item.tripStatusMasterId,
          res
        );
        resultDataArray["skuCode"] = await dispatchController.getSkuCode(
          item.SkuMasterId,
          res
        );
        resultDataArray[
          "vehicleType"
        ] = await dispatchController.getVehicleTypeByName(
          item.vehicleTypeMasterId,
          res
        );

        resultDataArray["vehicleNo"] = item.vehicleNo;
        resultDataArray[
          "driverMobileNo"
        ] = await dispatchController.getDriverNumber(item.driverMasterId, res);

        resultDataArray["latLong"] = await dispatchController.getLatLong(
          item.destinationId,
          res
        );

        const address = locationController.getLocationbyLatLong(
          "18.15699959",
          "73.29570007"
        );
        //console.log("-------------------", address);
        resultDataArray[
          "currentLocation"
        ] = await locationController.getLocationfromGoogle(address);
        //console.log(data2);

        ArrTemp = resultDataArray;
        return ArrTemp;
      })
    );

    return res.json({
      status: 200,
      result: response
    });
  } catch (e) {
    return res.json({
      msg: e
    });
  }

  /* Promises testing ends here */
});

router.get("/dispatch/:id", async (req, res) => {
  //dispatchController.getDispatchById(req,res);
  return res.json({
    message: "I am in GET with specific id"
  });
});

router.put("/dispatch/:id", async (req, res) => {
  return res.json({
    message: "I am in PUT"
  });
});

router.delete("/dispatch/:id", async (req, res) => {
  return res.json({
    message: "I am in DELETE"
  });
});

module.exports = router;
