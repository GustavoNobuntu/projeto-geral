var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nomeCategoria: String,
      usaopcoesTamanho: String,
      usaopcoesBorda: String,
      setor: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Categoria = mongoose.model("categoria", schema);
  return Categoria;
};
