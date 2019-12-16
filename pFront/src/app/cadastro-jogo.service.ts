import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Detalhes, Jogos, Partida, Usuario} from './cadastro-jogo/cadastro-jogo.component';

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

  pesquisaNomePartida(nomejogo: string): Observable<Partida[]> {
    return this.http.get<Partida[]>();
  }
}
