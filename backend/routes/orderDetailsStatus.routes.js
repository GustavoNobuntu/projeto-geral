module.exports = app => {
    const orderDetailsStatus = require("../app/controllers/orderDetailsStatus.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateOrderDetailsStatus = require("../app/validators/orderDetailsStatus.validator.js") 

    const db = require("../models/index.js"); 
    const OrderDetailsStatus = db.orderDetailsStatus; 

    var router = require("express").Router(); 

    // Create a new OrderDetailsStatus 
    router.post("/", verifyAccess.verifyAccess, validateOrderDetailsStatus, orderDetailsStatus.create); 
    // Retrieve all orderDetailsStatus 
    router.get("/", verifyAccess.verifyAccess, orderDetailsStatus.findAll); 
    // Retrieve a single OrderDetailsStatus with id 
    router.get("/:id", verifyAccess.verifyAccess, orderDetailsStatus.findOne); 
    // Update a OrderDetailsStatus with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateOrderDetailsStatus, checkIfDateIsOlder(OrderDetailsStatus), orderDetailsStatus.update); 
    // Delete a OrderDetailsStatus with id 
    router.delete("/:id", verifyAccess.verifyAccess, orderDetailsStatus.delete); 
    // Custom get OrderDetailsStatus 
    router.post("/custom", verifyAccess.verifyAccess, orderDetailsStatus.findCustom);

    app.use('/api/orderDetailsStatus', router); 
  }; 
