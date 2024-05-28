module.exports = app => {
    const inventoryTransactionTypes = require("../app/controllers/inventoryTransactionTypes.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateInventoryTransactionTypes = require("../app/validators/inventoryTransactionTypes.validator.js") 

    const db = require("../models/index.js"); 
    const InventoryTransactionTypes = db.inventoryTransactionTypes; 

    var router = require("express").Router(); 

    // Create a new InventoryTransactionTypes 
    router.post("/", verifyAccess.verifyAccess, validateInventoryTransactionTypes, inventoryTransactionTypes.create); 
    // Retrieve all inventoryTransactionTypes 
    router.get("/", verifyAccess.verifyAccess, inventoryTransactionTypes.findAll); 
    // Retrieve a single InventoryTransactionTypes with id 
    router.get("/:id", verifyAccess.verifyAccess, inventoryTransactionTypes.findOne); 
    // Update a InventoryTransactionTypes with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateInventoryTransactionTypes, checkIfDateIsOlder(InventoryTransactionTypes), inventoryTransactionTypes.update); 
    // Delete a InventoryTransactionTypes with id 
    router.delete("/:id", verifyAccess.verifyAccess, inventoryTransactionTypes.delete); 
    // Custom get InventoryTransactionTypes 
    router.post("/custom", verifyAccess.verifyAccess, inventoryTransactionTypes.findCustom);

    app.use('/api/inventoryTransactionTypes', router); 
  }; 
