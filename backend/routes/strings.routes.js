module.exports = app => {
    const strings = require("../app/controllers/strings.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateStrings = require("../app/validators/strings.validator.js") 

    const db = require("../models/index.js"); 
    const Strings = db.strings; 

    var router = require("express").Router(); 

    // Create a new Strings 
    router.post("/", verifyAccess.verifyAccess, validateStrings, strings.create); 
    // Retrieve all strings 
    router.get("/", verifyAccess.verifyAccess, strings.findAll); 
    // Retrieve a single Strings with id 
    router.get("/:id", verifyAccess.verifyAccess, strings.findOne); 
    // Update a Strings with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateStrings, checkIfDateIsOlder(Strings), strings.update); 
    // Delete a Strings with id 
    router.delete("/:id", verifyAccess.verifyAccess, strings.delete); 
    // Custom get Strings 
    router.post("/custom", verifyAccess.verifyAccess, strings.findCustom);

    app.use('/api/strings', router); 
  }; 
