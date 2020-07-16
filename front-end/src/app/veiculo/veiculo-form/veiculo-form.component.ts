import { UsuarioService } from './../../usuario/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { VeiculoService } from '../veiculo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-veiculo-form',
  templateUrl: './veiculo-form.component.html',
  styleUrls: ['./veiculo-form.component.scss']
})
export class VeiculoFormComponent implements OnInit {

  title: string = 'Novo veiculo'

  veiculo : any = {}   // Objeto vazio

  // Entidades relacionadas
  usuarios : any = []   // Vetor vazio

  formasVeiculos : any = [
    /*
        CA = Carro
        MO = Moto
        BUS = Onibus
        CAM = Caminhão
      */
    {
      codigo: 'CA',
      nome: 'CA - Carro'
    },
    {
      codigo: 'MO',
      nome: 'MO - Moto'
    },
    {
      codigo: 'BUS',
      nome: 'BUS - Onibus'
    },
    {
      codigo: 'CAM',
      nome: 'CAM - Caminhão'
    }
  ]

  constructor(
    private veiculoSrv : VeiculoService,
    private usuarioSrv : UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    // Capturando os parâmetros da rota
    let params = this.actRoute.snapshot.params

    // Existe um parâmetro chamado :id?
    if(params['id']) {
      // É caso de atualização. É necesário consultar o back-end
      // para recuperar o registro e colocá-lo para edição
      try {
        this.veiculo = await this.veiculoSrv.obterUM(params['id'])
        this.title = 'Atualizando veiculo'
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }


    // Entidades relacionadas
    try {
      this.usuarios = await this.usuarioSrv.listar()
    }
    catch(erro) {
      this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})  
    }
  
  }

  async voltar(form: NgForm) {
    
    let result = true;
    console.log(form);
    // form.dirty = formulário "sujo", não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)
    if(form.dirty && form.touched) {
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
      });

      result = await dialogRef.afterClosed().toPromise();

    }

    if(result) {
      this.router.navigate(['/veiculo']); // Retorna à listagem
    }

  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      try {
        let msg = 'Veiculo atualizado com sucesso.'
        // Se existir o campo _id, é caso de atualização
        if(this.veiculo._id) {
          await this.veiculoSrv.atualizar(this.veiculo)
        }
        // Senão, é caso de criar um nova veiculo
        else {
          await this.veiculoSrv.novo(this.veiculo)
          msg = 'Veiculo criado com sucesso.'
        }
        // Dá o feedback para o usuário
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        // Voltar à listagem
        this.router.navigate(['/veiculo'])
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }
}