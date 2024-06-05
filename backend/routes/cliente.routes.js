module.exports = app => {
    const clientes = require("../app/controllers/cliente.controller.js"); 

    var router = require("express").Router(); 

    // Create a new Cliente 
    router.post("/", clientes.create); 
    // Retrieve all clientes 
    router.get("/", clientes.findAll); 
    // Retrieve a single Cliente with id 
    router.get("/:id", clientes.findOne); 
    // Update a Cliente with id 
    router.patch("/:id", clientes.update); 
    // Delete a Cliente with id 
    router.delete("/:id", clientes.delete); 
    // Create a new Cliente 
    router.delete("/", clientes.deleteAll);
    router.post("/custom", clientes.findCustom);
    app.use('/api/cliente', router); 
  }; 
