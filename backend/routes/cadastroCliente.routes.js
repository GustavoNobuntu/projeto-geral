module.exports = app => {
    const cadastroCliente = require("../app/controllers/cadastroCliente.controller.js"); 

    const db = require("../models/index.js"); 
    const CadastroCliente = db.cadastroCliente; 

    var router = require("express").Router(); 

    // Create a new CadastroCliente 
    app.createRouteDescription = "Cria um novo cliente";
    router.post("/", cadastroCliente.create); 
    // Retrieve all cadastroCliente 
    router.get("/", cadastroCliente.findAll); 
    // Retrieve a single CadastroCliente with id 
    router.get("/:id", cadastroCliente.findOne); 
    // Update a CadastroCliente with id 
    router.put("/:id", cadastroCliente.update); 
    // Delete a CadastroCliente with id 
    router.delete("/:id", cadastroCliente.delete); 
    // Create a new CadastroCliente 
    router.delete("/", cadastroCliente.deleteAll); 
    app.use('/api/cadastroCliente', router); 
  }; 
