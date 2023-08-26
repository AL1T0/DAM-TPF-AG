import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Dispositivos } from '../interfaces/dispositivos';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private _http: HttpClient) { }

  getListadoDispositivos (): Promise<any> {
    return firstValueFrom(this._http.get('http://localhost:8000/dispositivos'))
  }
  
  async getDispositivo(id: any): Promise<Dispositivos> {
    const dispositivo = await firstValueFrom(this._http.get('http://localhost:8000/dispositivos/' + id)) as Dispositivos;
    return dispositivo;
  }; 
}
