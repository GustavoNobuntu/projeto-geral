module.exports = app => {
    const opcional = require("../app/controllers/opcional.controller.js"); 
    

    const db = require("../models/index.js"); 
    const Opcional = db.opcional; 

    var router = require("express").Router(); 

    // Create a new Opcional 
    router.post("/", opcional.create); 
    // Retrieve all opcional 
    router.get("/", opcional.findAll); 
    // Retrieve a single Opcional with id 
    router.get("/:id", opcional.findOne); 
    // Update a Opcional with id 
    router.put("/:id", opcional.update); 
    // Delete a Opcional with id 
    router.delete("/:id", opcional.delete); 
    // Create a new Opcional 
    router.delete("/", opcional.deleteAll); 
    app.use('/api/opcional', router); 
  }; 
