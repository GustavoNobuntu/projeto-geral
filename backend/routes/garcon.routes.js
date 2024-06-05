module.exports = app => {
    const garcon = require("../app/controllers/garcon.controller.js"); 
    

    const db = require("../models/index.js"); 
    const Garcon = db.garcon; 

    var router = require("express").Router(); 

    // Create a new Garcon 
    router.post("/", garcon.create); 
    // Retrieve all garcon 
    router.get("/", garcon.findAll); 
    // Retrieve a single Garcon with id 
    router.get("/:id", garcon.findOne); 
    // Update a Garcon with id 
    router.put("/:id", garcon.update); 
    // Delete a Garcon with id 
    router.delete("/:id", garcon.delete); 
    // Create a new Garcon 
    router.delete("/", garcon.deleteAll); 
    app.use('/api/garcon', router); 
  }; 
