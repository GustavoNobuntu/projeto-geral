module.exports = app => {
    const customers = require("../app/controllers/customers.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateCustomers = require("../app/validators/customers.validator.js") 

    const db = require("../models/index.js"); 
    const Customers = db.customers; 

    var router = require("express").Router(); 

    // Create a new Customers 
    router.post("/", verifyAccess.verifyAccess, validateCustomers, customers.create); 
    // Retrieve all customers 
    router.get("/", verifyAccess.verifyAccess, customers.findAll); 
    // Retrieve a single Customers with id 
    router.get("/:id", verifyAccess.verifyAccess, customers.findOne); 
    // Update a Customers with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateCustomers, checkIfDateIsOlder(Customers), customers.update); 
    // Delete a Customers with id 
    router.delete("/:id", verifyAccess.verifyAccess, customers.delete); 
    // Custom get Customers 
    router.post("/custom", verifyAccess.verifyAccess, customers.findCustom);

    app.use('/api/customers', router); 
  }; 
