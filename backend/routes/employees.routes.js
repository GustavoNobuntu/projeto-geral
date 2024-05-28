module.exports = app => {
    const employees = require("../app/controllers/employees.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateEmployees = require("../app/validators/employees.validator.js") 

    const db = require("../models/index.js"); 
    const Employees = db.employees; 

    var router = require("express").Router(); 

    // Create a new Employees 
    router.post("/", verifyAccess.verifyAccess, validateEmployees, employees.create); 
    // Retrieve all employees 
    router.get("/", verifyAccess.verifyAccess, employees.findAll); 
    // Retrieve a single Employees with id 
    router.get("/:id", verifyAccess.verifyAccess, employees.findOne); 
    // Update a Employees with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateEmployees, checkIfDateIsOlder(Employees), employees.update); 
    // Delete a Employees with id 
    router.delete("/:id", verifyAccess.verifyAccess, employees.delete); 
    // Custom get Employees 
    router.post("/custom", verifyAccess.verifyAccess, employees.findCustom);

    app.use('/api/employees', router); 
  }; 
