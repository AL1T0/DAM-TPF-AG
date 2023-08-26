export class Mediciones {
    constructor(
      private _medicionId: number,
      private _fecha: Date = new Date(),
      private _valor: number,
      private _dispositivoId: number
    ) {}
  
    get medicionId(): number {
      return this._medicionId;
    }
    set medicionId(value: number) {
      this._medicionId = value;
    }
    get fecha(): Date {
      return this._fecha;
    }
    set fecha(value: Date) {
      this._fecha = value;
    }
    get valor(): number {
      return this._valor;
    }
    set valor(value: number) {
      this._valor = value;
    }
    get dispositivoId(): number {
      return this._dispositivoId;
    }
    set dispositivoId(value: number) {
      this._dispositivoId = value;
    }
  }