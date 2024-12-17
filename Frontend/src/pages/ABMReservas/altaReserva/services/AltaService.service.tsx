import { instance } from "../../../../api/Instance";

interface Reserva {
    fecha: string,
    hora: string,           
    duracion: number,           
    telefono: string,          
    nombre_contacto: string,           
    cancha_id: number,                      
}

export const AltaReservaService = async(reserva:Reserva):Promise<Reserva | any> => {

    try {
        const response = await instance.post('/reservas/', reserva);
        return response;
    } catch (error:any) {
        return {message: error.response.data.message};
    }
}