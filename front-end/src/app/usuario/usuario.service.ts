import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  /* 
   * INJEÇÃO DE DEDÊNCIAS:  em vez de criarmos
   * Manualmente as DEPENDÊNCIAS nessárias, o 
   * Próprio Angular as cria e INJETA o objeto
   * já instanciado com parâmetro do construtor
  */  
  constructor(private http: HttpClient) { }

  private apiUri : string = env.apiBaseUri + 'usuario/'

  listar(){
    return this.http.get(this.apiUri).toPromise()
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

