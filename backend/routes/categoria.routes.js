module.exports = app => {
    const categoria = require("../app/controllers/categoria.controller.js"); 

    const db = require("../models/index.js"); 
    const Categoria = db.categoria; 

    var router = require("express").Router(); 

    // Create a new Categoria 
    router.post("/", categoria.create); 
    // Retrieve all categoria 
    router.get("/", categoria.findAll); 
    // Retrieve a single Categoria with id 
    router.get("/:id", categoria.findOne); 
    // Update a Categoria with id 
    router.put("/:id", categoria.update); 
    // Delete a Categoria with id 
    router.delete("/:id", categoria.delete); 
    // Create a new Categoria 
    router.delete("/", categoria.deleteAll); 
    app.use('/api/categoria', router); 
  }; 
