var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nomePedido: String,
      dataHora: Number,
      statusPedido: String,
        itemPedido: {type: Schema.Types.ObjectId, ref: 'ItemPedido'}, 
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Cozinha = mongoose.model("cozinha", schema);
  return Cozinha;
};
