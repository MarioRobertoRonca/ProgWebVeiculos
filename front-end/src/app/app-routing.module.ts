import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnderecoListComponent } from './endereco/endereco-list/endereco-list.component';
import { EnderecoFormComponent } from './endereco/endereco-form/endereco-form.component';



const routes: Routes = [
  {
    path: 'endereco',  //No Angular, não se usa barra no começo da rota
    component: EnderecoListComponent
  },
  {
    path: 'endereco/novo', //Cadastrar novo fornecedor
    component: EnderecoFormComponent
  },
  {
    path: 'endereco/:id', //Editar fornecedor já existente
    component: EnderecoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
