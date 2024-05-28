module.exports = app => {
    const purchaseOrderDetails = require("../app/controllers/purchaseOrderDetails.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validatePurchaseOrderDetails = require("../app/validators/purchaseOrderDetails.validator.js") 

    const db = require("../models/index.js"); 
    const PurchaseOrderDetails = db.purchaseOrderDetails; 

    var router = require("express").Router(); 

    // Create a new PurchaseOrderDetails 
    router.post("/", verifyAccess.verifyAccess, validatePurchaseOrderDetails, purchaseOrderDetails.create); 
    // Retrieve all purchaseOrderDetails 
    router.get("/", verifyAccess.verifyAccess, purchaseOrderDetails.findAll); 
    // Retrieve a single PurchaseOrderDetails with id 
    router.get("/:id", verifyAccess.verifyAccess, purchaseOrderDetails.findOne); 
    // Update a PurchaseOrderDetails with id 
    router.patch("/:id", verifyAccess.verifyAccess, validatePurchaseOrderDetails, checkIfDateIsOlder(PurchaseOrderDetails), purchaseOrderDetails.update); 
    // Delete a PurchaseOrderDetails with id 
    router.delete("/:id", verifyAccess.verifyAccess, purchaseOrderDetails.delete); 
    // Custom get PurchaseOrderDetails 
    router.post("/custom", verifyAccess.verifyAccess, purchaseOrderDetails.findCustom);

    app.use('/api/purchaseOrderDetails', router); 
  }; 
