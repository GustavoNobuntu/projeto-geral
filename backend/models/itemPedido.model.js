var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nomePedido: String,
      descricao: String,
      quantidadePedido: Number,
      precoPedido: Number,
      numeroMesa: Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const ItemPedido = mongoose.model("itemPedido", schema);
  return ItemPedido;
};
