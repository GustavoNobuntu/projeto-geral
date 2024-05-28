module.exports = app => {
    const ordersStatus = require("../app/controllers/ordersStatus.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateOrdersStatus = require("../app/validators/ordersStatus.validator.js") 

    const db = require("../models/index.js"); 
    const OrdersStatus = db.ordersStatus; 

    var router = require("express").Router(); 

    // Create a new OrdersStatus 
    router.post("/", verifyAccess.verifyAccess, validateOrdersStatus, ordersStatus.create); 
    // Retrieve all ordersStatus 
    router.get("/", verifyAccess.verifyAccess, ordersStatus.findAll); 
    // Retrieve a single OrdersStatus with id 
    router.get("/:id", verifyAccess.verifyAccess, ordersStatus.findOne); 
    // Update a OrdersStatus with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateOrdersStatus, checkIfDateIsOlder(OrdersStatus), ordersStatus.update); 
    // Delete a OrdersStatus with id 
    router.delete("/:id", verifyAccess.verifyAccess, ordersStatus.delete); 
    // Custom get OrdersStatus 
    router.post("/custom", verifyAccess.verifyAccess, ordersStatus.findCustom);

    app.use('/api/ordersStatus', router); 
  }; 
