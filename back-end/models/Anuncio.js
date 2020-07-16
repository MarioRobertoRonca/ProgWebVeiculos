const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   codVeiculo: {
       type: mongoose.ObjectId,
       ref: 'Veiculo', 
       required: true,
       index: {unique: true}
   },
   foto: {
       type: String
   },
   preco_tabela: {
       type: String
   },
   preco_kbb:{
       type: String  
   },
   preco_mercado: {
       type: String
   },
   preco_anuncio:{
       type: Number
   },
   vendido: {
       type: Boolean,
       default: false,
       required: true
   },
   createdAt: {
       type: Date
   },
   validade: {
       type: Date
   }
}, {timestamps:true})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('Anuncio', esquema, 'anuncios')