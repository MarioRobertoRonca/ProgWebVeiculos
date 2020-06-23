import { EnderecoService } from './../endereco.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.scss']
})
export class EnderecoFormComponent implements OnInit {

  title: string = 'Novo endereco';

  endereco: any = {} //objeto vazio 
  constructor(
    private enderecoSrv: EnderecoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    //Capturando os parâmetro da rota
    let params = this.actRoute.snapshot.params
    //Exite um parâmetro chamando  : id ?
    if(params['id']) {
      //É caso de atualização. É necessário consultar o back-end
      //para recuperar o registo e colocálo para edição
      try{
        this.endereco = await this.enderecoSrv.obterUM(params['id'])
        this.title = 'Atualizando endereco'
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration:5000})
      }
    }
  }

  async salvar(form: NgForm) {
    //Só vai salvar se o form for valido 
    if (form.valid) {
      try {
        let msg = 'Endereço atualizado com sucesso.'
        //Se existir o campo _id, é caso de atualização
        if (this.endereco._id) {
          await this.enderecoSrv.atualizar(this.endereco)
        }
        //Se não existir o _id é caso de atualização
        else {
          await this.enderecoSrv.novo(this.endereco)
          msg = 'Endereço criado com sucesso. '
        }
        //Dá o feedBack para o usúario 
        this.snackBar.open('Endereço criado com sucesso', 'Entendi', { duration: 50000 })
        //Voltar à listagem 
        this.router.navigate(['/endereco'])
      }
      catch (erro) {
        this.snackBar.open(erro.message, 'Que pena!', { duration: 5000 })
      }
    }
  }


  voltar(x): void {

  }
}
