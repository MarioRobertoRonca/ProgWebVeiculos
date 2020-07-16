import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { PropostaService } from './../proposta.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-proposta-list',
  templateUrl: './proposta-list.component.html',
  styleUrls: ['./proposta-list.component.scss']
})
export class PropostaListComponent implements OnInit {

    public propostas: any = {} //Vetor vazio
  
  displayedColumns: string[] = ['userName','cidade', 'data_proposta',
  'forma_pagamento', 'data_pagamento', 'editar', 'excluir']

  constructor( 
      private propostaSrv: PropostaService,
      private snackBar : MatSnackBar,
      private dialog: MatDialog
    ) {}

  async ngOnInit() {
    this.propostas = await this.propostaSrv.listar()
    console.log(this.propostas);
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
        await this.propostaSrv.excluir(id)
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
