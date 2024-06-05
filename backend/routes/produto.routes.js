module.exports = app => {
    const produto = require("../app/controllers/produto.controller.js"); 
    

    const db = require("../models/index.js"); 
    const Produto = db.produto; 

    var router = require("express").Router(); 

    // Create a new Produto 
    router.post("/", produto.create); 
    // Retrieve all produto 
    router.get("/", produto.findAll); 
    // Retrieve a single Produto with id 
    router.get("/:id", produto.findOne); 
    // Update a Produto with id 
    router.put("/:id", produto.update); 
    // Delete a Produto with id 
    router.delete("/:id", produto.delete); 
    // Create a new Produto 
    router.delete("/", produto.deleteAll); 
    app.use('/api/produto', router); 
  }; 
