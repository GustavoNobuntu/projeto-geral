module.exports = app => {
    const application = require("../app/controllers/application.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateApplication = require("../app/validators/application.validator.js") 

    const db = require("../models/index.js"); 
    const Application = db.application; 

    var router = require("express").Router(); 

    // Create a new Application 
    router.post("/", verifyAccess.verifyAccess, validateApplication, application.create); 
    // Retrieve all application 
    router.get("/", verifyAccess.verifyAccess, application.findAll); 
    // Retrieve a single Application with id 
    router.get("/:id", verifyAccess.verifyAccess, application.findOne); 
    // Update a Application with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateApplication, checkIfDateIsOlder(Application), application.update); 
    // Delete a Application with id 
    router.delete("/:id", verifyAccess.verifyAccess, application.delete); 
    // Custom get Application 
    router.post("/custom", verifyAccess.verifyAccess, application.findCustom);

    app.use('/api/application', router); 
  }; 
