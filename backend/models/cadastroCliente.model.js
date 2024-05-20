var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nomeCliente: String,
      sobrenomeCliente: String,
      emailCliente: String,
      emailclienteConfirma: String,
      senhaCliente: String,
      senhaclienteConfirma: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const CadastroCliente = mongoose.model("cadastroCliente", schema);
  return CadastroCliente;
};
