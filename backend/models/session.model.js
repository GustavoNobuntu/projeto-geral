var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongooseConnection => {

// Verifica se o modelo já foi criado para a conexão específica (Toda vez que é feito a conexão nova ao banco de dados, é preciso setar os models, porém só pode fazer isso uma vez por conexão, se fizer mais de uma vez dá erro. Por isso é verificado se dentro dos models da conexão existe o model)
  if (mongooseConnection.models.session) {
    return mongooseConnection.models.session;
  }

  var schema = mongoose.Schema(
    {
      userUID: String,
      user: { type: Schema.Types.ObjectId, ref: 'user' },
      tenantUID: String,
      accessToken: String,
      initialDate: Date,
      finishSessionDate: Date,
      stayConnected: Boolean,
      accessTokenExpirationDate : Date,
      hashValidationLogin: String,
      hashValidationLogout: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Session = mongooseConnection.model("session", schema);
  return Session;
};
