import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Jogos, Partidas} from './usuario/usuario.component';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getPartidasUsuario(idusuario: number): Observable<Partidas[]> {
    return this.http.get<Partidas[]>('http://localhost:3000/partidas/' + idusuario);
  }

  getJogosCadastradosUsuario(idusuario: number): Observable<Jogos[]> {
    return this.http.get<Jogos[]>('http://localhost:3000/meusjogos/' + idusuario);
  }
}
