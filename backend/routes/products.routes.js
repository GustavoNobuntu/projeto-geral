module.exports = app => {
    const products = require("../app/controllers/products.controller.js"); 
    const checkIfDateIsOlder = require("../app/middleware/checkIfDateIsOlder.middleware.js"); 
    const verifyAccess = require("../app/middleware/auth.middleware.js"); 
    const validateProducts = require("../app/validators/products.validator.js") 

    const db = require("../models/index.js"); 
    const Products = db.products; 

    var router = require("express").Router(); 

    // Create a new Products 
    router.post("/", verifyAccess.verifyAccess, validateProducts, products.create); 
    // Retrieve all products 
    router.get("/", verifyAccess.verifyAccess, products.findAll); 
    // Retrieve a single Products with id 
    router.get("/:id", verifyAccess.verifyAccess, products.findOne); 
    // Update a Products with id 
    router.patch("/:id", verifyAccess.verifyAccess, validateProducts, checkIfDateIsOlder(Products), products.update); 
    // Delete a Products with id 
    router.delete("/:id", verifyAccess.verifyAccess, products.delete); 
    // Custom get Products 
    router.post("/custom", verifyAccess.verifyAccess, products.findCustom);

    app.use('/api/products', router); 
  }; 
