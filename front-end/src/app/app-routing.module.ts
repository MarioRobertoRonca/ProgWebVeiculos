import { PropostaFormComponent } from './proposta/proposta-form/proposta-form.component';
import { PropostaListComponent } from './proposta/proposta-list/proposta-list.component';
import { VeiculoFormComponent } from './veiculo/veiculo-form/veiculo-form.component';
import { VeiculoListComponent } from './veiculo/veiculo-list/veiculo-list.component';
import { UsuarioPerfilComponent } from './usuario/usuario-perfil/usuario-perfil.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { UsuarioService } from './usuario/usuario.service';
import { AnuncioListComponent } from './anuncio/anuncio-list/anuncio-list.component';
import { AnuncioFormComponent } from './anuncio/anuncio-form/anuncio-form.component';
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
  },
  {
    path: 'anuncio',
    component: AnuncioListComponent
  },
  {
    path: 'anuncio/novo',
    component: AnuncioFormComponent
  },
  {
    path: 'anuncio/:id',
    component: AnuncioFormComponent
  },
  {
    path: 'usuario',
    component: UsuarioListComponent
  },
  {
    path: 'usuario/novo',
    component: UsuarioFormComponent
  },
  {
    path: 'usuario/:id',
    component: UsuarioFormComponent
  },
  {
    path: 'usuario/perfil/:id',
    component: UsuarioPerfilComponent
  },
  {
    path: 'veiculo',
    component: VeiculoListComponent
  },
  {
    path: 'veiculo/novo',
    component: VeiculoFormComponent
  },
  {
    path: 'veiculo/:id',
    component: VeiculoFormComponent
  },
  {
    path: 'proposta',
    component: PropostaListComponent
  },
  {
    path: 'proposta/novo',
    component: PropostaFormComponent
  },
  {
    path: 'veiculo/:id',
    component: PropostaFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
