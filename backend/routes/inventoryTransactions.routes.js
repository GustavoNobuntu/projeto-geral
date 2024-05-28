module.exports = app => {
    const inventoryTransaction = require("../app/controllers/inventoryTransactions.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateInventoryTransactions = require("../app/validators/inventoryTransactions.validator.js") 

    const db = require("../models/index.js"); 
    const InventoryTransactions = db.inventoryTransaction; 

    var router = require("express").Router(); 

    // Create a new InventoryTransactions 
    router.post("/", verifyAccess.verifyAccess, validateInventoryTransactions, inventoryTransaction.create); 
    // Retrieve all inventoryTransaction 
    router.get("/", verifyAccess.verifyAccess, inventoryTransaction.findAll); 
    // Retrieve a single InventoryTransactions with id 
    router.get("/:id", verifyAccess.verifyAccess, inventoryTransaction.findOne); 
    // Update a InventoryTransactions with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateInventoryTransactions, checkIfDateIsOlder(InventoryTransactions), inventoryTransaction.update); 
    // Delete a InventoryTransactions with id 
    router.delete("/:id", verifyAccess.verifyAccess, inventoryTransaction.delete); 
    // Custom get InventoryTransactions 
    router.post("/custom", verifyAccess.verifyAccess, inventoryTransaction.findCustom);

    app.use('/api/inventoryTransaction', router); 
  }; 
