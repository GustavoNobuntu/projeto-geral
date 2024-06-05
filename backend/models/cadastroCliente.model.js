var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongooseConnection => {

  // Verifica se o modelo já foi criado para a conexão específica (Toda vez que é feito a conexão nova ao banco de dados, é preciso setar os models, porém só pode fazer isso uma vez por conexão, se fizer mais de uma vez dá erro. Por isso é verificado se dentro dos models da conexão existe o model)
  if (mongooseConnection.models.cadastroCliente) {
    return mongooseConnection.models.cadastroCliente;
  }

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

  schema.set('toJSON', {
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  });

  const CadastroCliente = mongooseConnection.model("cadastroCliente", schema);
  return CadastroCliente;
};
