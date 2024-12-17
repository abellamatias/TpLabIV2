export interface IReserva {
    fecha:string,
    hora: string,
    duracion: number,
    telefono: string,
    nombre_contacto: string,
    cancha_id: number,
    id: number,
}

export interface IReservasResponse{
    data?: IReserva[];
    status?: number;
    message?: string;
}

export interface IAgregarReservaResponse{
    data?: IReserva;
    status?: number;
    message?: string;
}

export interface IParamsConsulta{
    fecha?: string;
    cancha_id?: number; 
}

export interface IEditarReserva{
    fecha: string;
    hora: string;
    duracion: number;
    telefono: string;
    nombre_contacto: string;
    cancha_id: number;
}

export interface IEndpointEliminarEditarReserva{
    fecha: string;
    hora: string;
    cancha_id: number;
}