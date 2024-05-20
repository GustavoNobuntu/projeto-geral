module.exports = app => {
    const cozinha = require("../app/controllers/cozinha.controller.js"); 
    const checkIfDateIsOlder = require("../app/middlewares/checkIfDateIsOlder.middleware.js"); 

    const db = require("../models/index.js"); 
    const Cozinha = db.cozinha; 

    var router = require("express").Router(); 

    // Create a new Cozinha 
    router.post("/", cozinha.create); 
    // Retrieve all cozinha 
    router.get("/", cozinha.findAll); 
    // Retrieve a single Cozinha with id 
    router.get("/:id", cozinha.findOne); 
    // Update a Cozinha with id 
    router.put("/:id", checkIfDateIsOlder(Cozinha), cozinha.update); 
    // Delete a Cozinha with id 
    router.delete("/:id", cozinha.delete); 
    // Create a new Cozinha 
    router.delete("/", cozinha.deleteAll); 
    app.use('/api/cozinha', router); 
  }; 
