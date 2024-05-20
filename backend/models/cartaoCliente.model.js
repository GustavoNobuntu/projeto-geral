var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      numeroCartao: Number,
      nomeImpresso: String,
      anoValidade: Number,
      mesValidade: Number,
      diaValidade: Number,
      cvv: Number,
      pedidoCartao: String,
      cpfcnpj: Number,
        tipoPagamento: {type: Schema.Types.ObjectId, ref: 'TipoPagamento'}, 
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const CartaoCliente = mongoose.model("cartaoCliente", schema);
  return CartaoCliente;
};
