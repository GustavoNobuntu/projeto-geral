module.exports = app => {
    const purchaseOrderStatus = require("../app/controllers/purchaseOrderStatus.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validatePurchaseOrderStatus = require("../app/validators/purchaseOrderStatus.validator.js") 

    const db = require("../models/index.js"); 
    const PurchaseOrderStatus = db.purchaseOrderStatus; 

    var router = require("express").Router(); 

    // Create a new PurchaseOrderStatus 
    router.post("/", verifyAccess.verifyAccess, validatePurchaseOrderStatus, purchaseOrderStatus.create); 
    // Retrieve all purchaseOrderStatus 
    router.get("/", verifyAccess.verifyAccess, purchaseOrderStatus.findAll); 
    // Retrieve a single PurchaseOrderStatus with id 
    router.get("/:id", verifyAccess.verifyAccess, purchaseOrderStatus.findOne); 
    // Update a PurchaseOrderStatus with id 
    router.patch("/:id", verifyAccess.verifyAccess, validatePurchaseOrderStatus, checkIfDateIsOlder(PurchaseOrderStatus), purchaseOrderStatus.update); 
    // Delete a PurchaseOrderStatus with id 
    router.delete("/:id", verifyAccess.verifyAccess, purchaseOrderStatus.delete); 
    // Custom get PurchaseOrderStatus 
    router.post("/custom", verifyAccess.verifyAccess, purchaseOrderStatus.findCustom);

    app.use('/api/purchaseOrderStatus', router); 
  }; 
