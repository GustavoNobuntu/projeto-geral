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

  schema.set('toJSON', {
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  });

  const CartaoConsumo = mongoose.model("cartaoConsumo", schema);
  return CartaoConsumo;
};
