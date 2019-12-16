import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CadastroJogoService} from '../cadastro-jogo.service';

@Component({
  selector: 'app-cadastro-jogo',
  templateUrl: './cadastro-jogo.component.html',
  styleUrls: ['./cadastro-jogo.component.css']
})
export class CadastroJogoComponent implements OnInit {
  form: FormGroup;
  novoUsuario = new Usuario();
  cadastrarJogo = true;

  constructor(private formBuilder: FormBuilder, private service: CadastroJogoService) {
    this.form = this.formBuilder.group({
      nameDate: this.formBuilder.group({
        nome_jogo: [this.novoUsuario.nome, Validators.required],
        nome_mestre: [this.novoUsuario.nome, Validators.required],
        horario_jogo: [this.novoUsuario.nome, Validators.required]
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

  envia() {
    this.service.postUsuario(this.novoUsuario).subscribe(res => {    });
  }

  submit() {
    console.log('reactive form submit', this.form.value);
    console.log('reactive form submit', this.form.controls.detalhes.value);
    // TODO:PEGAR VALOR DE CADA OBJETO
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
