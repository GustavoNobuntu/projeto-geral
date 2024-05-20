module.exports = app => {
    const endereco = require("../app/controllers/endereco.controller.js"); 
    const checkIfDateIsOlder = require("../app/middlewares/checkIfDateIsOlder.middleware.js"); 

    const db = require("../models/index.js"); 
    const Endereco = db.endereco; 

    var router = require("express").Router(); 

    // Create a new Endereco 
    router.post("/", endereco.create); 
    // Retrieve all endereco 
    router.get("/", endereco.findAll); 
    // Retrieve a single Endereco with id 
    router.get("/:id", endereco.findOne); 
    // Update a Endereco with id 
    router.put("/:id", checkIfDateIsOlder(Endereco), endereco.update); 
    // Delete a Endereco with id 
    router.delete("/:id", endereco.delete); 
    // Create a new Endereco 
    router.delete("/", endereco.deleteAll); 
    app.use('/api/endereco', router); 
  }; 
