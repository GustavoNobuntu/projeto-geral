module.exports = app => {
    const company = require("../app/controllers/company.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateCompany = require("../app/validators/company.validator.js") 

    const db = require("../models/index.js"); 
    const Company = db.company; 

    var router = require("express").Router(); 

    // Create a new Company 
    router.post("/", verifyAccess.verifyAccess, validateCompany, company.create); 
    // Retrieve all company 
    router.get("/", verifyAccess.verifyAccess, company.findAll); 
    // Retrieve a single Company with id 
    router.get("/:id", verifyAccess.verifyAccess, company.findOne); 
    // Update a Company with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateCompany, checkIfDateIsOlder(Company), company.update); 
    // Delete a Company with id 
    router.delete("/:id", verifyAccess.verifyAccess, company.delete); 
    // Custom get Company 
    router.post("/custom", verifyAccess.verifyAccess, company.findCustom);

    app.use('/api/company', router); 
  }; 
