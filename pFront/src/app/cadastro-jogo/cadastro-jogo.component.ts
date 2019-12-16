import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CadastroJogoService} from '../cadastro-jogo.service';


@Component({
  selector: 'app-cadastro-jogo',
  templateUrl: './cadastro-jogo.component.html',
  styleUrls: ['./cadastro-jogo.component.css']
})
export class CadastroJogoComponent implements OnInit {

  botaovalido = false;
  activePartida = false;
  activeData = false;

  selected = new Array<Detalhes>();

  form: FormGroup;
  novoUsuario = new Usuario();
  novoJogo = new Jogos();
  novoDetalhe = new Detalhes();

  partidas = new Array<Detalhes>();
  pesquisaNome: string;
  setnome: string;
  pesquisaData: string;


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

  join() {
    console.log(this.selected);
    this.selected.forEach(id => {
      this.service.entraJogo(1, id.iddetalhes).subscribe(res => {
          console.log('ok');
      });
    });
  }
  buscaPartida() {
    if (this.activeData) {
      this.activeData = false;
      // todo: limpar vetor de buscas pela data
    }
    this.setnome = this.pesquisaNome;
    this.partidas = new Array<Detalhes>();
    this.service.pesquisaNomePartida(this.pesquisaNome).subscribe( jogosBuscados => {
        jogosBuscados.forEach(partida => {
          this.partidas.push(partida);
        });
      });
    this.activePartida = true;
  }

  buscaData() {

    if (this.activePartida) {
      this.activePartida = false;
    }
    this.partidas = new Array<Detalhes>();
    this.service.pesquisaIdDetalhes(this.pesquisaData).subscribe(iddata => {
      iddata.forEach(idjogo => {
        this.partidas.push(idjogo);
        this.service.pesquisaIdDetalhes2(idjogo.iddetalhes).subscribe(res => {
            res.forEach(resBusca => {
              this.setnome = resBusca;
            });
          });
      });
    });
    console.log(this.partidas);
    this.activeData = true;
  }
  cadastrarNovoJogo() {
      this.novoJogo = new Jogos();
      this.novoDetalhe = new Detalhes();
      this.botaovalido = false;
  }

  submit() {
    console.log('reactive form submit jogos', this.form.controls.jogos.value);
    console.log('reactive form submit detalhes', this.form.controls.detalhes.value);
    const re = /\//ig;
    this.novoDetalhe.data_jogo = this.novoDetalhe.data_jogo.replace(re, '-');
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

