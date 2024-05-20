var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      rua: String,
      bairro: String,
      cidade: String,
      numeroMoradia: Number,
      cep: Number,
      complemento: String,
        cadastroCliente: {type: Schema.Types.ObjectId, ref: 'CadastroCliente'}, 
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Endereco = mongoose.model("endereco", schema);
  return Endereco;
};
