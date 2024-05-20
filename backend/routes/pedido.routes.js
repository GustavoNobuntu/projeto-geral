module.exports = app => {
    const pedido = require("../app/controllers/pedido.controller.js"); 
    const checkIfDateIsOlder = require("../app/middlewares/checkIfDateIsOlder.middleware.js"); 

    const db = require("../models/index.js"); 
    const Pedido = db.pedido; 

    var router = require("express").Router(); 

    // Create a new Pedido 
    router.post("/", pedido.create); 
    // Retrieve all pedido 
    router.get("/", pedido.findAll); 
    // Retrieve a single Pedido with id 
    router.get("/:id", pedido.findOne); 
    // Update a Pedido with id 
    router.put("/:id", checkIfDateIsOlder(Pedido), pedido.update); 
    // Delete a Pedido with id 
    router.delete("/:id", pedido.delete); 
    // Create a new Pedido 
    router.delete("/", pedido.deleteAll); 
    app.use('/api/pedido', router); 
  }; 
