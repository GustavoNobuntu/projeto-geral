module.exports = app => {
    const invoices = require("../app/controllers/invoices.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateInvoices = require("../app/validators/invoices.validator.js") 

    const db = require("../models/index.js"); 
    const Invoices = db.invoices; 

    var router = require("express").Router(); 

    // Create a new Invoices 
    router.post("/", verifyAccess.verifyAccess, validateInvoices, invoices.create); 
    // Retrieve all invoices 
    router.get("/", verifyAccess.verifyAccess, invoices.findAll); 
    // Retrieve a single Invoices with id 
    router.get("/:id", verifyAccess.verifyAccess, invoices.findOne); 
    // Update a Invoices with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateInvoices, checkIfDateIsOlder(Invoices), invoices.update); 
    // Delete a Invoices with id 
    router.delete("/:id", verifyAccess.verifyAccess, invoices.delete); 
    // Custom get Invoices 
    router.post("/custom", verifyAccess.verifyAccess, invoices.findCustom);

    app.use('/api/invoices', router); 
  }; 
