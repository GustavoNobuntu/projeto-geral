module.exports = app => {
    const cartaoCliente = require("../app/controllers/cartaoCliente.controller.js"); 

    const db = require("../models/index.js"); 
    const CartaoCliente = db.cartaoCliente; 

    var router = require("express").Router(); 
    
    var createRouteDescription = "Cria um novo cartão do cliente";
    // Create a new CartaoCliente 
    router.post("/", cartaoCliente.create); 
    // Retrieve all cartaoCliente 
    app.findAllRouteDescription = "Obtem todos cartão do cliente";
    router.get("/", cartaoCliente.findAll); 
    // Retrieve a single CartaoCliente with id 
    app.findOneRouteDescription = "Obtem um cartão do cliente pelo id";
    router.get("/:id", cartaoCliente.findOne); 
    // Update a CartaoCliente with id 
    app.updateRouteDescription = "Atualiza um cartão do cliente pelo id";
    router.put("/:id", cartaoCliente.update); 
    // Delete a CartaoCliente with id 
    app.deleteRouteDescription = "Remove um cartão do cliente pelo id";
    router.delete("/:id", cartaoCliente.delete); 
    // Create a new CartaoCliente 
    app.deleteAllRouteDescription = "Remove todos os cartões do cliente";
    router.delete("/", cartaoCliente.deleteAll); 
    app.use('/api/cartaoCliente', router); 
  }; 
