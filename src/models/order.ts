import { Evento } from './evento.js';

export interface Order {
    codObjeto: string;
    eventos: Array<Evento>;
    mensagem?: string;
}
