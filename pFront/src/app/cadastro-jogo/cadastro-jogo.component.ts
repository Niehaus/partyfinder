import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CadastroJogoService} from '../cadastro-jogo.service';


@Component({
  selector: 'app-cadastro-jogo',
  templateUrl: './cadastro-jogo.component.html',
  styleUrls: ['./cadastro-jogo.component.css']
})
export class CadastroJogoComponent implements OnInit {

  cadastrarJogo = true;
  botaovalido = false;
  activePartida = false;

  selected = new Array<Partida>();

  form: FormGroup;
  novoUsuario = new Usuario();
  novoJogo = new Jogos();
  novoDetalhe = new Detalhes();

  partidas = new Array<Partida>();


  constructor(private formBuilder: FormBuilder, private service: CadastroJogoService) {
    this.form = this.formBuilder.group({
      jogos: this.formBuilder.group({
        nomejogo: [this.novoUsuario.nome, Validators.required],
        dono: [this.novoUsuario.nome, Validators.required],
        horario: [this.novoUsuario.nome, Validators.required]
      }),
      detalhes: this.formBuilder.group({
        data_jogo: [this.novoUsuario.senha, Validators.required],
        conhecimento_necessario: [this.novoUsuario.senha, Validators.required],
        local_encontro: [this.novoUsuario.senha, Validators.required],
        duracao_horas: [this.novoUsuario.senha, Validators.required],
        qtdPlayers: [this.novoUsuario.senha, Validators.required],
      })
    });
  }


  ngOnInit() {
  }

  buscaPartida() {
      this.activePartida = true;
  }

  cadastrarNovoJogo() {
      this.novoJogo = new Jogos();
      this.novoDetalhe = new Detalhes();
      this.botaovalido = false;
  }

  submit() {
    console.log('reactive form submit jogos', this.form.controls.jogos.value);
    console.log('reactive form submit detalhes', this.form.controls.detalhes.value);
    this.service.postDetalhes(this.novoDetalhe).subscribe(res => {
      this.novoJogo.detalhes = res.insertId;
      this.service.postJogo(this.novoJogo).subscribe(resp => { });
    });
    this.botaovalido = true;
  }
}

export class Jogos {
  idjogos: number;
  nomejogo: string;
  horario: string;
  detalhes: number;
  dono: number;

  constructor() {
    this.idjogos = 0;
    this.nomejogo = '';
    this.horario = '';
    this.detalhes = 0;
    this.dono = 0;
  }
}

export class Detalhes {
  iddetalhes: number;
  local_encontro: string;
  conhecimento_necessario: string;
  data_jogo: string;
  duracao_horas: number;
  qtdPlayers: number;

  constructor() {
    this.iddetalhes = 0;
    this.local_encontro = '';
    this.conhecimento_necessario = '';
    this.data_jogo = '';
    this.duracao_horas = 0;
    this.qtdPlayers = 0;
  }
}
export class Usuario {
  idUsuario: number;
  nome: string;
  senha: string;
  avaliacao: number;

  constructor() {
    this.idUsuario = 3;
    this.nome = '';
    this.senha = '';
    this.avaliacao = 0;
  }
}

export class Partida {
  idpartida: number;
  qtdJogadoers: number;
  jogosId: number;
  avaliacaoGeral: string;

  constructor() {
    this.idpartida = 0;
    this.qtdJogadoers = 0;
    this.jogosId = 0;
    this.avaliacaoGeral = '';
  }
}
