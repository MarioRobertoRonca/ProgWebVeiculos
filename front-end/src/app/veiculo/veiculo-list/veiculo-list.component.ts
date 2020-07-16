import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { VeiculoService } from './../veiculo.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.scss']
})
export class VeiculoListComponent implements OnInit {

    public veiculos: any = {} //Vetor vazio
  
  displayedColumns: string[] = ['dono', 'marca',
  'modelo', 'anoFabri', 'anoModelo', 'renavam', 'placa', 'cor', 'cidade', 'editar', 'excluir']

  constructor( 
      private veiculoSrv: VeiculoService,
      private snackBar : MatSnackBar,
      private dialog: MatDialog
    ) {}

  async ngOnInit() {
    this.veiculos = await this.veiculoSrv.listar()
    console.log(this.veiculos);
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este veiculo?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    //if(confirm('Deseja realmente excluir este item?')) {
    if(result) {
      try{
        await this.veiculoSrv.excluir(id)
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
