import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from './cadastro-jogo/cadastro-jogo.component';

@Injectable({
  providedIn: 'root'
})
export class CadastroJogoService {

  constructor(private http: HttpClient) { }

  postUsuario(usuario: Usuario): Observable<any> {
    return this.http.post('http://localhost:3000/usuario', usuario);
  }
}
