import { EnderecoService } from './../../endereco/endereco.service';
import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent implements OnInit {

  title: string = 'Perfil Usuário'

  endereco : any = {}   // Objeto vazio

  public usuarios: any =[] //Vetor vazio
  
  displayedColumns: string[] = ['nome','cpf', 'fone',
  'cidade', 'datecreat', 'editar', 'excluir']

  constructor( 
      private usuarioSrv: UsuarioService,
      private snackBar : MatSnackBar,
      private dialog: MatDialog,
      private enderecoSrv : EnderecoService,
      private router: Router,
      private actRoute: ActivatedRoute,
    ) {}

    async ngOnInit() {
      // Capturando os parâmetros da rota
      let params = this.actRoute.snapshot.params
  
      // Existe um parâmetro chamado :id?
      if(params['id']) {
        // É caso de atualização. É necesário consultar o back-end
        // para recuperar o registro e colocá-lo para edição
        try {
          this.usuarios = await this.usuarioSrv.obterUM(params['id'])
          this.title = 'Atualizando usuario'
          console.log(this.usuarios)
        }
        catch(erro) {
          this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
        }
      }
      // Entidades relacionadas
      try {
        this.usuarios = await this.enderecoSrv.listar()
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})  
      }
    }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este item?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    //if(confirm('Deseja realmente excluir este item?')) {
    if(result) {
      try{
        await this.usuarioSrv.excluir(id)
        this.ngOnInit() //Atualizar os dados da tabela
        this.snackBar.open('Exclusão efetuado com sucesso', 'Entendi', {
          duration: 3000
        })
      }
      catch(erro){
        this.snackBar.open('Erro: não foi possivel excluir este item', 'Que pena!', {
          duration: 3000
        })
      }
    }
  }
}
