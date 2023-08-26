import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActuadorService {

  constructor(private _http: HttpClient) {}

  async getValvStatus(id: string): Promise<number> {
    try {
      const logs: any = await firstValueFrom(this._http.get('http://localhost:8000/logs/' + id));
      if (logs) {
        return logs?.estado;
      } else {
        return 0;
      }
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
}
