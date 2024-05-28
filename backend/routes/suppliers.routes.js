module.exports = app => {
    const suppliers = require("../app/controllers/suppliers.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateSuppliers = require("../app/validators/suppliers.validator.js") 

    const db = require("../models/index.js"); 
    const Suppliers = db.suppliers; 

    var router = require("express").Router(); 

    // Create a new Suppliers 
    router.post("/", verifyAccess.verifyAccess, validateSuppliers, suppliers.create); 
    // Retrieve all suppliers 
    router.get("/", verifyAccess.verifyAccess, suppliers.findAll); 
    // Retrieve a single Suppliers with id 
    router.get("/:id", verifyAccess.verifyAccess, suppliers.findOne); 
    // Update a Suppliers with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateSuppliers, checkIfDateIsOlder(Suppliers), suppliers.update); 
    // Delete a Suppliers with id 
    router.delete("/:id", verifyAccess.verifyAccess, suppliers.delete); 
    // Custom get Suppliers 
    router.post("/custom", verifyAccess.verifyAccess, suppliers.findCustom);

    app.use('/api/suppliers', router); 
  }; 
