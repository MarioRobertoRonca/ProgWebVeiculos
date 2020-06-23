const Anuncio = require('../models/Anuncio')

const controller = {} // Objeto vazio

controller.novo = async (req, res) => {
   try {
      await Anuncio.create(req.body)
      // HTTP Status 201: Created
      res.status(201).end()
   }
   catch (erro) {
      console.log(erro)
      // HTTP 500: Internal Server Error
      res.status(500).send(erro)
   }
}

controller.listar = async (req, res) => {
   
   if(Object.keys(req.query).length > 0) { // Se houver query string
      busca(req, res)
   }
   else { // sem query string
      try {
         // find(), sem parâmetros, retorna todos
         const lista = await Anuncio.find().populate(
             //path:  1º nível
            {path: 'codVeiculo', select:'tipo_veiculo marca modelo ano_fabri cor codUsuario', populate:{
                  // 2º nível
                  path: 'codUsuario', select: 'userName email telefone endereco', populate:{
                     //3º nível
                     path:'endereco', select: 'cidade'
                  }
               }
            }
         )
         res.send(lista) // HTTP 200 implícito
      }
      catch {
         console.log(erro)
         res.status(500).send(erro)
      }
   }

}

controller.obterUm = async (req, res) => {

   try {
      const id = req.params.id
      const obj = await Anuncio.findById(id)
      if (obj) { // obj foi encontrado
         res.send(obj) // HTTP 200 implícito
      }
      else {
         // HTTP 404: Not found
         res.status(404).end()
      }
   }
   catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

controller.atualizar = async (req, res) => {
   try {
      const id = req.body._id
      const obj = await Anuncio.findByIdAndUpdate(id, req.body)
      if (obj) { // obj encontrado e atualizado
         // HTTP 204: No content
         res.status(204).end()
      }
      else {
         res.status(404).end()
      }
   }
   catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

controller.excluir = async (req, res) => {
   try {
      const id = req.body._id
      const obj = await Anuncio.findByIdAndDelete(id)
      if (obj) {
         res.status(204).end()
      }
      else {
         res.status(404).end()
      }
   }
   catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

async function busca(req, res) {
   let criterio = {}
  
   const atrib = Object.keys(req.query)[0]
   const valor = Object.values(req.query)[0]
   
   // $options: 'i' => case insensitive
   criterio[atrib] = { $regex: valor, $options: 'i'}

   console.log('Critério:')
   console.log(criterio)

   try {
      const lista = await Anuncio.find(criterio)
      res.send(lista)
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

module.exports = controller