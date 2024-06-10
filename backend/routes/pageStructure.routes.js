const tenantFunctions = require("../app/middlewares/tenant.middleware.js");
const operationFunctions = require("../app/middlewares/operation.middleware");

module.exports = app => {

  const { verifyAccess } = require("../app/middlewares/auth.middleware");
  const pageStructure = require("../app/controllers/pageStructure.controller.js");
  // const authJwt = require("../app/middlewares/auth.middleware.js");
  const db = require("../models/index.js");
  // const pageStructure = db.pageStructure(router.require.databaseConnection);

  var router = require("express").Router();
  // Create a new pageStructure 
  router.post("/", verifyAccess, pageStructure.create);

  // router.get("/", pageStructure.findAll);

  // Retrieve a single pageStructure with id
  router.get("/:className", verifyAccess, pageStructure.findOne);
  // Update a pageStructure with id 
  router.patch("/:id", verifyAccess, pageStructure.update);
  // Delete a pageStructure with id 
  router.delete("/:id", verifyAccess, pageStructure.delete);
  // Custom Search
  // router.post("/custom", pageStructure.findCustom);
  // router.delete("/", verifyAccess ,pageStructure.deleteAll);

  
  app.use('/api/pageStructure', router);
}; 
