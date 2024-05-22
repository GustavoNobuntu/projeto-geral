module.exports = app => {
    const clientes = require("../app/controllers/cliente.controller.js"); 
    const checkIfDateIsOlder = require("../app/middlewares/checkIfDateIsOlder.middleware.js"); 

    const db = require("../models/index.js"); 
    const Cliente = db.clientes; 

    var router = require("express").Router(); 

    // Create a new Cliente 
    router.post("/", clientes.create); 
    // Retrieve all clientes 
    router.get("/", clientes.findAll); 
    // Retrieve a single Cliente with id 
    router.get("/:id", clientes.findOne); 
    // Update a Cliente with id 
    router.patch("/:id", checkIfDateIsOlder(Cliente), clientes.update); 
    // Delete a Cliente with id 
    router.delete("/:id", clientes.delete); 
    // Create a new Cliente 
    router.delete("/", clientes.deleteAll);
    router.post("/custom", clientes.findCustom);
    app.use('/api/cliente', router); 
  }; 
