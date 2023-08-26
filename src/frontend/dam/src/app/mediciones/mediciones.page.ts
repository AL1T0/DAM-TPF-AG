import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { MedicionesService } from '../services/mediciones.service';
import { Dispositivos } from '../interfaces/dispositivos';
import { Mediciones } from '../interfaces/mediciones';

import { Location } from '@angular/common';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {
  public dispositivos!: Dispositivos;
  public dispositivoId!: string;
  public med!: Array<Mediciones>;

  constructor(private router: ActivatedRoute, private dServ: DispositivoService, private medServ: MedicionesService, private location: Location) { }

  ngOnInit() {
    const dispositivoId = this.router.snapshot.paramMap.get('id');
    if (dispositivoId) {
      this.dispositivoId = dispositivoId;
      this.dServ.getDispositivo(this.dispositivoId).then((disp) => {
      this.dispositivos = disp;
      });

      this.medServ.getMediciones(this.dispositivoId).then((med) => {
        this.med = med;
      });
    }
  }
  return() {
    this.location.back();
  }
  
}
