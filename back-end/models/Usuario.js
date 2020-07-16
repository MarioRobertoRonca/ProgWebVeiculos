const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    avatar:{
        type: String
        
    },
    telefone:{
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        index: {unique: true}
    },
    createdAt: {
        type: Date
    },
    avaliacoes: {
        type: Object
    },
    endereco: {
        type: mongoose.ObjectId,
        ref:'Endereco',//nome do modo referênciado
        require:true
    }
}, {timestamps:true})



/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('Usuario', esquema, 'usuarios')
//