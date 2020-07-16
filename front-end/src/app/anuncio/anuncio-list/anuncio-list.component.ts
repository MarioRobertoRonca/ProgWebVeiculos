
import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { AnuncioService } from './../anuncio.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-anuncio-list',
  templateUrl: './anuncio-list.component.html',
  styleUrls: ['./anuncio-list.component.scss']
})
export class AnuncioListComponent implements OnInit {

  public anuncios: any =[] //Vetor vazio
  
  displayedColumns: string[] = ['marca','modelo', 'cor', 'userName', 'email',
   'fone', 'preco', 'createdAt', 'cidade', 'editar', 'excluir']

  constructor( 
      private anuncioSrv: AnuncioService,
      private snackBar : MatSnackBar,
      private dialog: MatDialog
    ) {}

  async ngOnInit() {
    this.anuncios = await this.anuncioSrv.listar()
    console.log(this.anuncios);
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este anuncio?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    //if(confirm('Deseja realmente excluir este item?')) {
    if(result) {
      try{
        await this.anuncioSrv.excluir(id)
        this.ngOnInit() //Atualizar os dados da tabela
        this.snackBar.open('Exclusão efetuado com sucesso', 'Entendi', {
          duration: 3000
        })
      }
      catch(erro){
        this.snackBar.open('Erro: não foi possivel excluir este anuncio', 'Que pena!', {
          duration: 3000
        })
      }
    }
  }
}
