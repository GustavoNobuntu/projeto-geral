module.exports = app => {
    const ordersTaxStatus = require("../app/controllers/ordersTaxStatus.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateOrdersTaxStatus = require("../app/validators/ordersTaxStatus.validator.js") 

    const db = require("../models/index.js"); 
    const OrdersTaxStatus = db.ordersTaxStatus; 

    var router = require("express").Router(); 

    // Create a new OrdersTaxStatus 
    router.post("/", verifyAccess.verifyAccess, validateOrdersTaxStatus, ordersTaxStatus.create); 
    // Retrieve all ordersTaxStatus 
    router.get("/", verifyAccess.verifyAccess, ordersTaxStatus.findAll); 
    // Retrieve a single OrdersTaxStatus with id 
    router.get("/:id", verifyAccess.verifyAccess, ordersTaxStatus.findOne); 
    // Update a OrdersTaxStatus with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateOrdersTaxStatus, checkIfDateIsOlder(OrdersTaxStatus), ordersTaxStatus.update); 
    // Delete a OrdersTaxStatus with id 
    router.delete("/:id", verifyAccess.verifyAccess, ordersTaxStatus.delete); 
    // Custom get OrdersTaxStatus 
    router.post("/custom", verifyAccess.verifyAccess, ordersTaxStatus.findCustom);

    app.use('/api/ordersTaxStatus', router); 
  }; 
