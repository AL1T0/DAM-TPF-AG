import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { MedicionesService } from '../services/mediciones.service';
import { ActuadorService } from '../services/actuador.service';
import { LogsService } from '../services/logs.service';
import { Dispositivos } from '../interfaces/dispositivos';
import { Mediciones } from '../interfaces/mediciones';
import { Logs } from '../interfaces/logs';
import * as Highcharts from 'highcharts';

declare let require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.page.html',
  styleUrls: ['./dispositivos.page.scss'],
})

export class DispositivosPage implements OnInit {
  public dispositivoId: string = '';
  public dispositivos: Dispositivos = new Dispositivos(0, '', '', 0);
  public myChart: any;
  public mediciones!: Mediciones[];
  public valvStatus = false;
  private chartOptions: any;
  private chartValue = 0;
  private chartName = '';
  public onError: boolean = false;
  public onErrorEV: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dispService: DispositivoService,
    private medSer: MedicionesService,
    private EVServ: ActuadorService,
    private logServ: LogsService
  ) {}

  ionViewWillEnter() {
    this.generateChart();
    this.getDispositivosData();
  }

  ionViewOnLeave() {
    this.myChart.destroy();
    this.chartOptions = null;
    this.chartValue = 0;
    this.chartName = '';
  }

  ngOnInit() {}

  async getDispositivosData() {
    const dispositivoId = this.route.snapshot.paramMap.get('id');

    if (dispositivoId !== null) {
      try {
        this.onError = false;

          const [dispositivos, mediciones] = await Promise.all([
          this.dispService.getDispositivo(dispositivoId),
          this.medSer.getMediciones(dispositivoId)
        ]);

        this.dispositivos = dispositivos;

        if (mediciones) {
          this.mediciones = mediciones;
          const lastMedicionIndex = mediciones.length - 1;
          this.chartName = String(dispositivos.nombre);
          this.chartValue = mediciones[lastMedicionIndex].valor;
          this.updateChart();
        } else {
          this.updateChart();
        }
      } catch (error) {
        this.onError = true;
      }

      try {
        this.onErrorEV = false;
       
        this.valvStatus = Boolean(
          await this.EVServ.getValvStatus(
            this.dispositivos.electrovalvulaId.toString()
          )
        );
      } catch (error) {
        this.onErrorEV = true;
      }
    }
  }

  changeValvStatus() {
    this.valvStatus = !this.valvStatus;

    const now = new Date();
    const log: Logs = new Logs(0,Number(this.valvStatus),now,this.dispositivos.dispositivoId);
    this.logServ.addLog(log);

    if (!this.valvStatus) {
      const newMeas = this.getAleatorio(0, 100);

      const med: Mediciones = new Mediciones(0,now,newMeas,this.dispositivos.dispositivoId);

      this.medSer.addMediciones(med).then(() => {
        this.chartValue = Number(newMeas);
        this.updateChart();
      });
    }
  }

  getAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  updateChart() {
    this.myChart.update({
      title: {
        text: [this.chartName],
      },
      series: [
        {
          name: 'Medicion',
          data: [Number(this.chartValue)],
          tooltip: {
            valueSuffix: ' kPA',
          },
        },
      ],
    });
  }
// Medidor
generateChart() {
  this.chartOptions = {
    chart: {
      type: 'gauge',
      backgroundColor: 'black', 
      plotBackgroundColor: "black",
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    title: {
      text: [this.chartName],
      style: {
        color: 'black'
      },
    },
    credits: { enabled: false },
    pane: {
      startAngle: -150,
      endAngle: 150,

      center: ['50%', '50%'],
      size: '100%',
    },
    // the value axis
    yAxis: {
      min: 0,
      max: 100,

      minorTickInterval: 'auto',
      minorTickWidth: 1,
      minorTickLength: 10,
      minorTickPosition: 'inside',
      minorTickColor: '#666',

      tickPixelInterval: 30,
      tickWidth: 2,
      tickPosition: 'inside',
      tickLength: 10,
      tickColor: '#666',
      labels: {
        step: 2,
        rotation: 'auto',
      },
      title: {
        text: 'Presión',
      },
      plotBands: [
        {
          from: 0,
          to: 10,
          color: 'black', // black
          thickness: '10%',
        },
        {
          from: 10,
          to: 30,
          color: '#55BF3B', // green
          thickness: '15%',
        },
        {
          from: 30,
          to: 60,
          color: '#DDDF0D', // yellow
          thickness: '20%',
        },
        {
          from: 60,
          to: 100,
          color: '#DF5353', // red
          thickness: '25%',
        },
      ],
    },
    series: [
      {
        name: 'Cb',
        data: [Number(this.chartValue || 0)],
        tooltip: {
          valueSuffix: ' kPa',
        },
        dataLabels: {
          borderWidth: 0, // Oculta la línea del indicador
          format: '<div style="text-align:center">' +
            '<span style="font-size:16px;color:gray;">' +
            '{y}</span><br/>' +
            '<span style="font-size:12px;color:silver;">kPa</span>' +
            '</div>'
        },
      },
    ],
  };
this.myChart = Highcharts.chart('highcharts', this.chartOptions, async (t) => {
   await this.getDispositivosData();
   this.updateChart();
  }); 
}
}