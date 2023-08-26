import { TestBed } from '@angular/core/testing';

import { ActuadorService } from './actuador.service';

describe('ActuadorService', () => {
  let service: ActuadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActuadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
