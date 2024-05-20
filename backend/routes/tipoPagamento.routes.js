module.exports = app => {
    const tipoPagamento = require("../app/controllers/tipoPagamento.controller.js"); 
    const checkIfDateIsOlder = require("../app/middlewares/checkIfDateIsOlder.middleware.js"); 

    const db = require("../models/index.js"); 
    const TipoPagamento = db.tipoPagamento; 

    var router = require("express").Router(); 

    // Create a new TipoPagamento 
    router.post("/", tipoPagamento.create); 
    // Retrieve all tipoPagamento 
    router.get("/", tipoPagamento.findAll); 
    // Retrieve a single TipoPagamento with id 
    router.get("/:id", tipoPagamento.findOne); 
    // Update a TipoPagamento with id 
    router.put("/:id", checkIfDateIsOlder(TipoPagamento), tipoPagamento.update); 
    // Delete a TipoPagamento with id 
    router.delete("/:id", tipoPagamento.delete); 
    // Create a new TipoPagamento 
    router.delete("/", tipoPagamento.deleteAll); 
    app.use('/api/tipoPagamento', router); 
  }; 
