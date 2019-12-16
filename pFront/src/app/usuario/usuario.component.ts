import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  usuarioLogado = new User();
  partidas = new Array<Partidas>();
  jogos = new Array<Jogos>();



  constructor(private service: UsuarioService) { }

  ngOnInit() {
    this.pegaPartidas();
    this.pegaJogos();
  }

  pegaJogos() {
    this.service.getJogosCadastradosUsuario(this.usuarioLogado.idUsuario).subscribe(jogos => {
      console.log(jogos);
      jogos.forEach(jogo => {
        this.jogos.push(jogo);
      });
      console.log(this.partidas);
    });
  }

  pegaPartidas() {
    this.service.getPartidasUsuario(this.usuarioLogado.idUsuario).subscribe(partidas => {
      console.log(partidas);
      partidas.forEach(partida => {
        this.partidas.push(partida);
      });
      console.log(this.partidas);
    });
  }
}

export class Jogos {

  nomejogo: string;
  data_jogo: string;
  horario: string;

  constructor() {
    this.nomejogo = '';
    this.data_jogo = '';
    this.horario = '';
  }
}

export class Partidas {
  nomejogo: string;
  data_jogo: string;

  constructor() {
    this.nomejogo = '';
    this.data_jogo = '';
  }

}
export class User {
  idUsuario: number;
  nome: string;
  senha: string;
  avaliacao: number;

  constructor() {
    this.idUsuario = 1;
    this.nome = '';
    this.senha = '';
    this.avaliacao = 0;
  }
}
