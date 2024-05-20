var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      numeroCartao: Number,
      clientes: { type: Schema.Types.ObjectId, ref: 'cliente' },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const CartaoConsumo = mongoose.model("cartaoConsumo", schema);
  return CartaoConsumo;
};
