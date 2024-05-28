module.exports = app => {
    const orderDetails = require("../app/controllers/orderDetails.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateOrderDetails = require("../app/validators/orderDetails.validator.js") 

    const db = require("../models/index.js"); 
    const OrderDetails = db.orderDetails; 

    var router = require("express").Router(); 

    // Create a new OrderDetails 
    router.post("/", verifyAccess.verifyAccess, validateOrderDetails, orderDetails.create); 
    // Retrieve all orderDetails 
    router.get("/", verifyAccess.verifyAccess, orderDetails.findAll); 
    // Retrieve a single OrderDetails with id 
    router.get("/:id", verifyAccess.verifyAccess, orderDetails.findOne); 
    // Update a OrderDetails with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateOrderDetails, checkIfDateIsOlder(OrderDetails), orderDetails.update); 
    // Delete a OrderDetails with id 
    router.delete("/:id", verifyAccess.verifyAccess, orderDetails.delete); 
    // Custom get OrderDetails 
    router.post("/custom", verifyAccess.verifyAccess, orderDetails.findCustom);

    app.use('/api/orderDetails', router); 
  }; 
