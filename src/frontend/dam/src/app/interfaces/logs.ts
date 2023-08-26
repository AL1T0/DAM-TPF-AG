export class Logs {
    constructor(
      private _logRiegoId: number,
      private _estado: number,
      private _fecha: Date,
      private _electrovalvulaId: number
    ) {}
  
    get logRiegoId(): number {
      return this._logRiegoId;
    }
    set logRiegoId(value: number) {
      this._logRiegoId = value;
    }
    get fecha(): Date {
      return this._fecha;
    }
    set fecha(value: Date) {
      this._fecha = value;
    }
      get estado(): number {
      return this._estado;
    }
    set estado(value: number) {
      this._estado = value;
    }
    get electrovalvulaId(): number {
      return this._electrovalvulaId;
    }
    set electrovalvulaId(value: number) {
      this._electrovalvulaId = value;
    }
  }