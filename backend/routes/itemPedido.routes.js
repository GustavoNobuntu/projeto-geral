module.exports = app => {
    const itemPedido = require("../app/controllers/itemPedido.controller.js"); 
    const checkIfDateIsOlder = require("../app/middlewares/checkIfDateIsOlder.middleware.js"); 

    const db = require("../models/index.js"); 
    const ItemPedido = db.itemPedido; 

    var router = require("express").Router(); 

    // Create a new ItemPedido 
    router.post("/", itemPedido.create); 
    // Retrieve all itemPedido 
    router.get("/", itemPedido.findAll); 
    // Retrieve a single ItemPedido with id 
    router.get("/:id", itemPedido.findOne); 
    // Update a ItemPedido with id 
    router.put("/:id", checkIfDateIsOlder(ItemPedido), itemPedido.update); 
    // Delete a ItemPedido with id 
    router.delete("/:id", itemPedido.delete); 
    // Create a new ItemPedido 
    router.delete("/", itemPedido.deleteAll); 
    app.use('/api/itemPedido', router); 
  }; 
