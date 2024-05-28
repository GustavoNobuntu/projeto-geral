module.exports = app => {
    const companyApplicationToken = require("../app/controllers/companyApplicationToken.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateCompanyApplicationToken = require("../app/validators/companyApplicationToken.validator.js") 

    const db = require("../models/index.js"); 
    const CompanyApplicationToken = db.companyApplicationToken; 

    var router = require("express").Router(); 

    // Create a new CompanyApplicationToken 
    router.post("/", verifyAccess.verifyAccess, validateCompanyApplicationToken, companyApplicationToken.create); 
    // Retrieve all companyApplicationToken 
    router.get("/", verifyAccess.verifyAccess, companyApplicationToken.findAll); 
    // Retrieve a single CompanyApplicationToken with id 
    router.get("/:id", verifyAccess.verifyAccess, companyApplicationToken.findOne); 
    // Update a CompanyApplicationToken with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateCompanyApplicationToken, checkIfDateIsOlder(CompanyApplicationToken), companyApplicationToken.update); 
    // Delete a CompanyApplicationToken with id 
    router.delete("/:id", verifyAccess.verifyAccess, companyApplicationToken.delete); 
    // Custom get CompanyApplicationToken 
    router.post("/custom", verifyAccess.verifyAccess, companyApplicationToken.findCustom);

    app.use('/api/companyApplicationToken', router); 
  }; 
