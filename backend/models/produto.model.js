var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nomeProduto: String,
      codigo: Number,
      descricaoProduto: String,
      precoProduto: Number,
      imagem: String,
        categoria: {type: Schema.Types.ObjectId, ref: 'Categoria'}, 
        opcional: {type: Schema.Types.ObjectId, ref: 'Opcional'}, 
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Produto = mongoose.model("produto", schema);
  return Produto;
};
