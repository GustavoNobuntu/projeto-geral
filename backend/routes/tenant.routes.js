const tenantFunctions = require("../app/middlewares/tenant.middleware.js");
const operationFunctions = require("../app/middlewares/operation.middleware");


module.exports = app => {
  const { verifyAccess } = require("../app/middlewares/auth.middleware");
  const tenant = require("../app/controllers/tenant.controller.js");

  var router = require("express").Router();
  // Create a new tenant 
  router.post("/", verifyAccess, tenant.create);

  // router.get("/", tenant.findAll);

  // Retrieve a single tenant with id
  router.get("/:className", verifyAccess, tenant.findOne);
  // Update a tenant with id 
  router.patch("/:id", verifyAccess, tenant.update);
  // Delete a tenant with id 
  router.delete("/:id", verifyAccess, tenant.delete);
  // Custom Search
  // router.post("/custom", tenant.findCustom);
  // router.delete("/", verifyAccess ,tenant.deleteAll);

  app.use('/api/tenant', router);
  // app.use([tenantFunctions.changeTenant, operationFunctions.registerOperation]);
}; 
