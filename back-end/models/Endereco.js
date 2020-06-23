const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   logradouro:{
       type: String,
       required: true
   },
   cep:{
       type: String,
       required: true
   },
   cidade:{
       type: String,
       required: true
   },
   bairro:{
       type: String,
       required: true
   },
   numero:{
        type: String,
        required: true
   },
   complemento:{
       type: String,
   }
})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('Endereco', esquema, 'enderecos')