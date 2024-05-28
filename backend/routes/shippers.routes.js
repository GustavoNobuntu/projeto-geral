module.exports = app => {
    const shippers = require("../app/controllers/shippers.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateShippers = require("../app/validators/shippers.validator.js") 

    const db = require("../models/index.js"); 
    const Shippers = db.shippers; 

    var router = require("express").Router(); 

    // Create a new Shippers 
    router.post("/", verifyAccess.verifyAccess, validateShippers, shippers.create); 
    // Retrieve all shippers 
    router.get("/", verifyAccess.verifyAccess, shippers.findAll); 
    // Retrieve a single Shippers with id 
    router.get("/:id", verifyAccess.verifyAccess, shippers.findOne); 
    // Update a Shippers with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateShippers, checkIfDateIsOlder(Shippers), shippers.update); 
    // Delete a Shippers with id 
    router.delete("/:id", verifyAccess.verifyAccess, shippers.delete); 
    // Custom get Shippers 
    router.post("/custom", verifyAccess.verifyAccess, shippers.findCustom);

    app.use('/api/shippers', router); 
  }; 
