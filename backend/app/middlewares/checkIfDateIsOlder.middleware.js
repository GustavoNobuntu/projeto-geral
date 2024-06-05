/**
 * Verifica se o item que está sendo alterado é de uma versão mais recente ou está sendo alterado algo que já foi alterado.
 * Quando se é alterado algum registro no banco, é preciso que seja enviado pelo corpo da requisição o campo "updatedAt". 
 * Essa variável informa a data da ultima atualização do registro que foi alterado no backEnd 
 * @param {*} objectId ID do objeto que será alterado
 * @param {*} updatedAt Data da alteração do item que vai ser alterado
 * @param {*} mongooseModel Modelo da Classe no mongoDb
 * @returns 
 */
async function hasUpdateConflict(objectId, updatedAt, mongooseModel) {

  if (!objectId) {
    return Error("Don't contains objectID");
  }

  try {
    const documentId = objectId;
    //Procura o objeto que será alterado no banco de dados
    const storedDocument = await mongooseModel.findById(documentId);

    //Verifica se encontra o item que vai ser alterado no banco de dados
    if (!storedDocument) {
      return Error("Document not found");
    }

    //Se item não contem data de atualização, permita a alteração
    if (storedDocument.updatedAt == null) {
      return false;
    }
    const storedDateUpdateDate = new Date(storedDocument.updatedAt);

    if (!storedDateUpdateDate) {
      return false;
    }

    //Se não obtiver dados da data de atualização do item que está sendo alterado pelo usuário, não permitir alteração
    if (updatedAt == null) {
      return false;
    }

    const updatedItemUpdateDate = new Date(updatedAt);
    if (updatedItemUpdateDate.toISOString() === storedDateUpdateDate.toISOString()) {
      return false;
    } else {
      return true;
    }

  } catch (error) {
    return Error('Internal Server Error', error);
  }
}

//Declaração das funções que serão exportadas
const checkIfDateIsOlderFunctions = {
  hasUpdateConflict
};

module.exports = checkIfDateIsOlderFunctions;