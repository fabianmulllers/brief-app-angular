import { empresa } from './empresa.interface'

export interface Cliente {
    id?: number,
    nombre: string,
    empresa: empresa
}