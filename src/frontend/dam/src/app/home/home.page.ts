import { Component } from '@angular/core';
import { Dispositivos } from '../interfaces/dispositivos';
import { DispositivoService } from '../services/dispositivo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage {
  listadoDispositivos: Dispositivos[]= []; 
  constructor(public dispositivoService: DispositivoService) {
    this.callService();
  }

  async callService() {
    const listado = await this.dispositivoService.getListadoDispositivos();
    this.listadoDispositivos = listado;
  }
}

