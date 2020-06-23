import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  
  /*
    *INGEÇÃO  DE DEPENDÊNCIA: em vez de criarmos
    * manualmente as DEDÊNCIA  necessárias, o 
    * próprio Angular as cria a INJETA o objeto
    * Já instancia com parâmetros do construtor
  */
  constructor(private http: HttpClient) { }
  
  private apiUri : string = env.apiBaseUri + 'endereco/'

  listar(){
    return this.http.get(this.apiUri).toPromise();
  }
  
  excluir(id: string){
    return this.http.request('DELETE', this.apiUri,
    {body: { _id: id}}).toPromise()
  }

  novo(body: any){
    return this.http.post(this.apiUri, body).toPromise()
  }

  atualizar( body: any){
    return this.http.put(this.apiUri, body).toPromise()
  }

  obterUM(id: string){
    return this.http.get(this.apiUri + id).toPromise()
  }

}
