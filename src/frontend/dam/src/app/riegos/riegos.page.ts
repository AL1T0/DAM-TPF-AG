import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { LogsService } from '../services/logs.service';
import { Dispositivos } from '../interfaces/dispositivos';
import { Logs } from '../interfaces/logs';

import { Location } from '@angular/common';


@Component({
  selector: 'app-riegos',
  templateUrl: './riegos.page.html',
  styleUrls: ['./riegos.page.scss'],
})
export class RiegosPage implements OnInit {
  public dispositivos!: Dispositivos;
  public logs!: Array<Logs>;
  public dispositivoId!: string;
  public electrovalvulaId!: string;
  public onError!: boolean;

  constructor(private router: ActivatedRoute, private dServ: DispositivoService, private lServ: LogsService, private location: Location) {}
  ngOnInit() {
    const dispositivoId = this.router.snapshot.paramMap.get('id');
    if (dispositivoId) {
      this.electrovalvulaId = dispositivoId;
      //this.dServ.getDispositivo(this.dispositivoId).then((disp) => {
      //this.dispositivos = disp;
      //});

      this.lServ.getLogsValvula(this.electrovalvulaId).then((log) => {
        this.logs = log;
      });
    }
  }
  return() {
    this.location.back();
  }
}

  /*
  ngOnInit() {
    this.getLogsData();
  }

  return() {
    this.location.back();
  }
  
  async getLogsData() {
    this.electrovalvulaId = this.router.snapshot.paramMap.get('id') || '';
    try {
      let log = await this.lServ.getLogsValvula(this.electrovalvulaId);
      this.logs = log;
      this.onError = false;
    } catch (error) {
      this.onError = true;
    }
  }  
}
*/