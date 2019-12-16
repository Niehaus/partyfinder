import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Detalhes, Jogos} from './cadastro-jogo/cadastro-jogo.component';

@Injectable({
  providedIn: 'root'
})
export class CadastroJogoService {

  constructor(private http: HttpClient) { }

  postDetalhes(detalhe: Detalhes): Observable<any> {
    return this.http.post('http://localhost:3000/detalhe', detalhe);
  }

  postJogo(jogo: Jogos): Observable<any> {
    return  this.http.post('http://localhost:3000/jogos', jogo);
  }

  pesquisaNomePartida(nomejogo: string): Observable<Detalhes[]> {
    return this.http.get<Detalhes[]>('http://localhost:3000/buscaporjogo/' + nomejogo);
  }
  pesquisaIdDetalhes(data: string): Observable<Detalhes[]> {
    return this.http.get<Detalhes[]>('http://localhost:3000/buscapordata1/' + data);
  }

  pesquisaIdDetalhes2(iddetalhe: number): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/buscapordata2/' + iddetalhe);
  }
}
