export class Electrovalvula {
    constructor(
      private _electrovalvulaId: number,
      private _nombre: string,
      private _estado: number
    ) {}
  
    get electrovalvulaId(): number {
      return this._electrovalvulaId;
    }
    set electrovalvulaId(value: number) {
      this._electrovalvulaId = value;
    }
    get nombre(): string {
      return this._nombre;
    }
    set nombre(value: string) {
      this._nombre = value;
    }
    get estado(): number {
      return this._estado;
    }
    set estado(value: number) {
      this._estado = value;
    }
  }
