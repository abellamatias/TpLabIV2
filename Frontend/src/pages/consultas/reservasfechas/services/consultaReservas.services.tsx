
import { instance } from "../../../../api/Instance";
import { IEditarReserva, IReservasResponse } from "../interfaces/interfazTabla";


export const consultaFechaYCancha = async (fecha:string, cancha_id:number):Promise<IReservasResponse> => {
    try{
        const response = await instance.get(`/reservas/${cancha_id}/${fecha}`);
        return response.data;
    }catch(error:any){
        return { message: error.message};
    }
}

export const agregarReserva = async (reserva:IEditarReserva):Promise<IReservasResponse> => {
    try{
        const response = await instance.post(`/reservas`, reserva);
        return response.data;
    }catch(error:any){
        return {message: error.message};
    }
}

export const eliminarReserva = async (id:number):Promise<IReservasResponse> => {
    try{
        const response = await instance.delete(`/reservas/${id}`);
        return response;
    }catch(error:any){
        return { message: error.message};
    }
}

export const editarReserva = async (cambios:IEditarReserva, id:number):Promise<IReservasResponse> => {
    try{
        const response = await instance.put(`/reservas/${id}`, cambios);
        return response;
    }catch(error:any){
        return { message: error.message};
    }
}