module.exports = app => {
    const orders = require("../app/controllers/orders.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateOrders = require("../app/validators/orders.validator.js") 

    const db = require("../models/index.js"); 
    const Orders = db.orders; 

    var router = require("express").Router(); 

    // Create a new Orders 
    router.post("/", verifyAccess.verifyAccess, validateOrders, orders.create); 
    // Retrieve all orders 
    router.get("/", verifyAccess.verifyAccess, orders.findAll); 
    // Retrieve a single Orders with id 
    router.get("/:id", verifyAccess.verifyAccess, orders.findOne); 
    // Update a Orders with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateOrders, checkIfDateIsOlder(Orders), orders.update); 
    // Delete a Orders with id 
    router.delete("/:id", verifyAccess.verifyAccess, orders.delete); 
    // Custom get Orders 
    router.post("/custom", verifyAccess.verifyAccess, orders.findCustom);

    app.use('/api/orders', router); 
  }; 
