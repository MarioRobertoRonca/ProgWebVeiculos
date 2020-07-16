import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  public usuarios: any =[] //Vetor vazio
  
  displayedColumns: string[] = ['nome','cpf', 'fone', 'userName',
  'cidade', 'editar', 'excluir']

  constructor( 
      private usuarioSrv: UsuarioService,
      private snackBar : MatSnackBar,
      private dialog: MatDialog
    ) {}

  async ngOnInit() {
    this.usuarios = await this.usuarioSrv.listar()
    console.log(this.usuarios);
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este usuario?'}
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
        this.snackBar.open('Erro: não foi possivel excluir este usuario', 'Que pena!', {
          duration: 3000
        })
      }
    }
  }
}
