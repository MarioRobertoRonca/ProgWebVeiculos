import { Component, OnInit } from '@angular/core';
import { EnderecoService } from '../endereco.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-endereco-list',
  templateUrl: './endereco-list.component.html',
  styleUrls: ['./endereco-list.component.scss']
})
export class EnderecoListComponent implements OnInit {
  public enderecos: any = [] //vetor vazio

  displayedColumns : string[] = ['cep', 'logradouro', 'bairro', 'numero',
   'cidade', 'complemento', 'editar', 'excluir']

  constructor(
      private enderecoSrv: EnderecoService,
      private snackBar: MatSnackBar,
      private dialog: MatDialog
    ) { }

  async ngOnInit() {
    this.enderecos = await this.enderecoSrv.listar();
    console.log(this.enderecos);
  }
  async excluirItem(id: string){
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este item?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    //if(confirm('Deseja realmente excluir este item?')) {
    if(result) {
      try{
        await this.enderecoSrv.excluir(id)
        //Recarregar a tabela novamente
        this.ngOnInit() //Atualizar os dados da tabela
        //alert('Exclusão efetuada com sucesso')
        this.snackBar.open('Exclusão efetuada com sucesso', 'Entendi', {
          duration: 5000
        });
      }
      catch(erro){
        //alert('ERRO: não foi possivel excluir este item ')
        this.snackBar.open('ERRO: não foi possivel excluir este item', 'Que pena', {
          duration: 5000
        });
      }
    }
  }

}
