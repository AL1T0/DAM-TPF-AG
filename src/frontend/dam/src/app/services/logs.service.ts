import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Logs } from '../interfaces/logs';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LogsService {
  logs: Array<Logs> = new Array<Logs>();

  constructor(private _http: HttpClient) {
  }

  addLog(log: Logs) {
    return this._http.post('http://localhost:8000/logs/add',{
      estado:log.estado, 
      fecha:log.fecha.toISOString().slice(0, 19).replace('T', ' '), 
      electrovalvulaId:log.electrovalvulaId}).toPromise().then((result)=>result);
  }

  async getLogsValvula(id: string): Promise<Logs[]> {
  try { 
    const logResponse = await firstValueFrom(this._http.get<Logs[]> ('http://localhost:8000/logs/' + id + '/all'));
    if (logResponse === undefined) {
      throw new Error('No se pudo obtener el log');
    }
      const logs: Logs[] = logResponse as Logs[];
      return logs;
    } catch (error: any) {
      throw new Error('Error al obtener el log: ' + error.message);
    }
  }
}