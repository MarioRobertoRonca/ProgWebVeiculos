const mongoose = require('mongoose')

const esquema = mongoose.Schema({
  tipo_veiculo: {
      type: String,
      required: true,
      enum: ['CA', 'MO','BUS', 'CAM']
      /*
        CA = Carro
        MO = Moto
        BUS = Onibus
        CAM = Caminhão
      */
  },
   codUsuario: {
       type: mongoose.ObjectId,
       ref: 'Usuario', // referência
       required: true
   },
   marca: {
        type: String,
        required: true
   },
   modelo: {
       type: String,
       required: true
   },
   anoFabri: {
       type: String,
       required: true
   },
   anoModelo:{
       type: String,
       required: true
   },
   renavam: {
       type: String,
       required: true
   },
   placa: {
       type: String,
       required: true,
       index: {unique: true}
   },
   cor: {
       type: String,
       required: true 
   },
   cidade:{
       type: String,
       required:true,
   }

})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('Veiculo', esquema, 'veiculos');