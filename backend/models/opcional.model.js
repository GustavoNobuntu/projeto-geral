var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nomeOpcional: String,
      tipoOpcional: String,
      maximaOpcionais: Number,
      produto: {type: Schema.Types.ObjectId, ref: 'Produto'} ,
        categoria: {type: Schema.Types.ObjectId, ref: 'Categoria'}, 
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Opcional = mongoose.model("opcional", schema);
  return Opcional;
};
