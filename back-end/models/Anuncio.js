const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   codVeiculo: {
       type: mongoose.ObjectId,
       ref: 'Veiculo', 
       required: true,
       index: {unique: true}
   },
   foto: {
       type: String,
       required: true
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
       type: String,
       required: true
   },
   vendido: {
       type: Boolean,
       default: false,
       required: true
   },
   createdAt: {
       type: Date,
       required:true
   },
   validade: {
       type: Date,
       required: true
   }
})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('Anuncio', esquema, 'anuncios')