const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    idComprador: {
        type: mongoose.ObjectId,
        ref: 'Usuario',
        required: true
    },
    idAnuncio: {
        type: mongoose.ObjectId,
        ref: 'Anuncio',
        required: true
    },
    descricao: {
        type: String,
        required:true
    },
    aceita: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
    },
    forma_pagamento: {
        type: String,
        required: true,
        enum: ['DI','CH','CC','CD']
        /*
            DI = Dinheiro
            CH = cheque
            CC = Cartão de Crédito
            CA = Débito
        */
    },
    valor_proposta:{
        type: String,
        required: true
    }
}, {timestamps:true})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('Proposta', esquema, 'propostas')