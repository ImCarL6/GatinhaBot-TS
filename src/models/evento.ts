import { Unidade } from './unidade.js';

export interface Evento {
    codigo?: string;
    descricao?: string;
    dtHrCriado?: Date;
    tipo?: string;
    unidade?: Unidade;
    unidadeDestino?: Unidade;
    urlIcone?: string;
    detalhe?: string;
}
