module.exports = app => {
    const purchaseOrders = require("../app/controllers/purchaseOrders.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validatePurchaseOrders = require("../app/validators/purchaseOrders.validator.js") 

    const db = require("../models/index.js"); 
    const PurchaseOrders = db.purchaseOrders; 

    var router = require("express").Router(); 

    // Create a new PurchaseOrders 
    router.post("/", verifyAccess.verifyAccess, validatePurchaseOrders, purchaseOrders.create); 
    // Retrieve all purchaseOrders 
    router.get("/", verifyAccess.verifyAccess, purchaseOrders.findAll); 
    // Retrieve a single PurchaseOrders with id 
    router.get("/:id", verifyAccess.verifyAccess, purchaseOrders.findOne); 
    // Update a PurchaseOrders with id 
    router.patch("/:id", verifyAccess.verifyAccess, validatePurchaseOrders, checkIfDateIsOlder(PurchaseOrders), purchaseOrders.update); 
    // Delete a PurchaseOrders with id 
    router.delete("/:id", verifyAccess.verifyAccess, purchaseOrders.delete); 
    // Custom get PurchaseOrders 
    router.post("/custom", verifyAccess.verifyAccess, purchaseOrders.findCustom);

    app.use('/api/purchaseOrders', router); 
  }; 
