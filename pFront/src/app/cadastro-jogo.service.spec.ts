import { TestBed } from '@angular/core/testing';

import { CadastroJogoService } from './cadastro-jogo.service';

describe('CadastroJogoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastroJogoService = TestBed.get(CadastroJogoService);
    expect(service).toBeTruthy();
  });
});
