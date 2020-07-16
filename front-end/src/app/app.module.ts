import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MainToolbarComponent } from './ui/main-toolbar/main-toolbar.component';
import { MainMenuComponent } from './ui/main-menu/main-menu.component';
import { MainFooterComponent } from './ui/main-footer/main-footer.component';
import { HttpClientModule } from '@angular/common/http';
import { EnderecoListComponent } from './endereco/endereco-list/endereco-list.component';
import { ConfirmDlgComponent } from './ui/confirm-dlg/confirm-dlg.component';
import { EnderecoFormComponent } from './endereco/endereco-form/endereco-form.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule} from 'ngx-mask';
import { AnuncioListComponent } from './anuncio/anuncio-list/anuncio-list.component';
import { AnuncioFormComponent } from './anuncio/anuncio-form/anuncio-form.component';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioPerfilComponent } from './usuario/usuario-perfil/usuario-perfil.component';
import { VeiculoListComponent } from './veiculo/veiculo-list/veiculo-list.component';
import { VeiculoFormComponent } from './veiculo/veiculo-form/veiculo-form.component';
import { PropostaListComponent } from './proposta/proposta-list/proposta-list.component';
import { PropostaFormComponent } from './proposta/proposta-form/proposta-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    MainMenuComponent,
    MainFooterComponent,
    EnderecoListComponent,
    ConfirmDlgComponent,
    EnderecoFormComponent,
    AnuncioListComponent,
    AnuncioFormComponent,
    UsuarioListComponent,
    UsuarioFormComponent,
    UsuarioPerfilComponent,
    VeiculoListComponent,
    VeiculoFormComponent,
    PropostaListComponent,
    PropostaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
