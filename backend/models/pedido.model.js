var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      pedidoCancelado: String,
      datahoraPedido: Number,
        pagamento: {type: Schema.Types.ObjectId, ref: 'Pagamento'}, 
        garcon: {type: Schema.Types.ObjectId, ref: 'Garcon'}, 
        itemPedido: {type: Schema.Types.ObjectId, ref: 'ItemPedido'}, 
        cartaoConsumo: {type: Schema.Types.ObjectId, ref: 'CartaoConsumo'}, 
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Pedido = mongoose.model("pedido", schema);
  return Pedido;
};
