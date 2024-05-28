module.exports = app => {
    const salesReports = require("../app/controllers/salesReports.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateSalesReports = require("../app/validators/salesReports.validator.js") 

    const db = require("../models/index.js"); 
    const SalesReports = db.salesReports; 

    var router = require("express").Router(); 

    // Create a new SalesReports 
    router.post("/", verifyAccess.verifyAccess, validateSalesReports, salesReports.create); 
    // Retrieve all salesReports 
    router.get("/", verifyAccess.verifyAccess, salesReports.findAll); 
    // Retrieve a single SalesReports with id 
    router.get("/:id", verifyAccess.verifyAccess, salesReports.findOne); 
    // Update a SalesReports with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateSalesReports, checkIfDateIsOlder(SalesReports), salesReports.update); 
    // Delete a SalesReports with id 
    router.delete("/:id", verifyAccess.verifyAccess, salesReports.delete); 
    // Custom get SalesReports 
    router.post("/custom", verifyAccess.verifyAccess, salesReports.findCustom);

    app.use('/api/salesReports', router); 
  }; 
