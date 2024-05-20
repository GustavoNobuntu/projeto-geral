var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      valorPagamento: Number,
      datahoraPagamento: Number,
        tipoPagamento: {type: Schema.Types.ObjectId, ref: 'TipoPagamento'}, 
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Pagamento = mongoose.model("pagamento", schema);
  return Pagamento;
};
