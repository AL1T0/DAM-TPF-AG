import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Mediciones } from '../interfaces/mediciones';

@Injectable({
  providedIn: 'root'
})

export class MedicionesService {
  constructor(private _http: HttpClient) { }

  addMediciones(mediciones: Mediciones){
    return this._http.post('http://localhost:8000/mediciones/add',{
      fecha:mediciones.fecha.toISOString().slice(0, 19).replace('T', ' '),
      valor:mediciones.valor,
      dispositivoId:mediciones.dispositivoId}).toPromise().then((result)=>result);
   };

  async getMediciones(id: string): Promise<Mediciones[]> {
    try {
      const mediciones = await firstValueFrom(this._http.get<Mediciones[]>('http://localhost:8000/mediciones/' + id + '/all'));
      if (mediciones === undefined) {
        throw new Error('No se pudo obtener las mediciones');
      }
      return mediciones;
    } catch (error: any) {
      throw new Error('Error al obtener las mediciones: ' + error.message);
    }
  }
}
