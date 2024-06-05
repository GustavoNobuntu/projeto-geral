var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongooseConnection => {

  // Verifica se o modelo já foi criado para a conexão específica (Toda vez que é feito a conexão nova ao banco de dados, é preciso setar os models, porém só pode fazer isso uma vez por conexão, se fizer mais de uma vez dá erro. Por isso é verificado se dentro dos models da conexão existe o model)
  if (mongooseConnection.models.cartaoConsumo) {
    return mongooseConnection.models.cartaoConsumo;
  }

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
  
  const CartaoConsumo = mongooseConnection.model("cartaoConsumo", schema);
  return CartaoConsumo;
};
