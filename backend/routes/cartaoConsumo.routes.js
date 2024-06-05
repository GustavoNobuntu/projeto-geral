
module.exports = app => {
  const { verifyAccess } = require("../app/middlewares/auth.middleware");
  const cartaoConsumo = require("../app/controllers/cartaoConsumo.controller.js");
  // const authJwt = require("../app/middlewares/auth.middleware.js");
  const db = require("../models/index.js");
  // const CartaoConsumo = db.cartaoConsumo(router.require.databaseConnection);

  var router = require("express").Router();
  // Create a new CartaoConsumo 
  router.post("/", verifyAccess, cartaoConsumo.create);
  // router.get("/", [authJwt.verifyToken, authJwt.isAuthorized], cartaoConsumo.findAll);
  router.get("/", cartaoConsumo.findAll);
  // Retrieve a single CartaoConsumo with id
  router.get("/:id",verifyAccess ,cartaoConsumo.findOne);
  // Update a CartaoConsumo with id 
  router.patch("/:id", verifyAccess, cartaoConsumo.update);
  // Delete a CartaoConsumo with id 
  router.delete("/:id" ,cartaoConsumo.delete);
  // Custom Search
  router.post("/custom", cartaoConsumo.findCustom);
  // Create a new CartaoConsumo 
  router.delete("/", verifyAccess ,cartaoConsumo.deleteAll);
  app.use('/api/cartaoConsumo', router);
}; 
