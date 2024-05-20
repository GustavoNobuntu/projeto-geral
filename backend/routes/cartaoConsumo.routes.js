
module.exports = app => {
  const { verifyAccess } = require("../app/middlewares/auth.middleware");
  const authJwt = require("../app/middlewares/auth.middleware.js");
  
  const cartaoConsumo = require("../app/controllers/cartaoConsumo.controller.js");
  const checkIfDateIsOlder = require("../app/middlewares/checkIfDateIsOlder.middleware.js");

  const db = require("../models/index.js");
  const CartaoConsumo = db.cartaoConsumo;

  var router = require("express").Router();

  // Create a new CartaoConsumo 
  router.post("/", verifyAccess ,cartaoConsumo.create);
  // router.get("/", [authJwt.verifyToken, authJwt.isAuthorized], cartaoConsumo.findAll);
  router.get("/", verifyAccess, cartaoConsumo.findAll);
  // Retrieve a single CartaoConsumo with id
  router.get("/:id",verifyAccess ,cartaoConsumo.findOne);
  // Update a CartaoConsumo with id 
  router.patch("/:id", [verifyAccess ,checkIfDateIsOlder(CartaoConsumo)], cartaoConsumo.update);
  // Delete a CartaoConsumo with id 
  router.delete("/:id" ,cartaoConsumo.delete);
  // Custom Search
  router.post("/custom", cartaoConsumo.findCustom);
  // Create a new CartaoConsumo 
  router.delete("/", verifyAccess ,cartaoConsumo.deleteAll);
  app.use('/api/cartaoConsumo', router);
}; 
