import { useState } from "react";
import { agregarReserva, consultaFechaYCancha, editarReserva, eliminarReserva } from "../services/consultaReservas.services";
import { IEditarReserva, IParamsConsulta, IReserva } from "../interfaces/interfazTabla";
import { FormikValues } from "formik";


export const useConsulta = ()  => {
    const [rows, setRows] = useState<IReserva[]>([]);
    const [ultimaBusqueda, setUltimaBusqueda] = useState<IParamsConsulta>({fecha:'', cancha_id:-1});

    const ConsultaReserva = async ({fecha, cancha_id}:IParamsConsulta) => {
            
            await consultaFechaYCancha(fecha!, cancha_id!).then((res)=>{
            if(res.data){ 
                setRows(res.data) 
                if(res.data.length===0) {
                    setRows([])
                    alert('No se encontraron reservas')
                }
                setUltimaBusqueda({fecha:fecha, cancha_id:cancha_id})
            }
            else{
                res.status==422? alert('Error en la entrada de datos'): res.status==500? alert('Error en el servidor'): alert('No se pudo consultar la reserva');
            }
            })
            .catch((err)=>{
                alert(err.message);
            });
    }

    const AgregarReserva = async (values:FormikValues) => {
            const body:IEditarReserva={
                fecha: values.fecha,
                hora: values.hora,
                duracion: values.duracion,
                telefono: values.telefono,
                nombre_contacto: values.nombre_contacto,
                cancha_id: values.cancha_id,
            }
            await agregarReserva(body).then((res)=>{
                if(res.status==200){ 
                    consultaFechaYCancha(ultimaBusqueda.fecha!, ultimaBusqueda.cancha_id!).then((res)=>{
                        setRows(res.data!)
                    })
                    alert('Reserva Agregada exitosamente')
                }
                else{
                    alert('No se pudo agregar la reserva');
                }
            })
        }

        const EditarReserva = async (row:IReserva) => {
            const body:IEditarReserva={
                fecha: row.fecha,
                hora: row.hora,
                duracion: row.duracion,
                telefono: row.telefono,
                nombre_contacto: row.nombre_contacto,
                cancha_id: Number(row.cancha_id)
            }
            await editarReserva(body, row.id).then((res)=>{
                if(res.status==200){ 
                    consultaFechaYCancha(ultimaBusqueda.fecha!, ultimaBusqueda.cancha_id!).then((res)=>{
                        setRows(res.data!)
                    })
                    alert('Reserva editada exitosamente')
                }
                else{
                    alert('No se pudo editar la reserva');
                }
            })
        }

        const EliminarReserva = async (id:number) => {
            await eliminarReserva(id).then((res)=>{
                if(res.status==200){ 
                    consultaFechaYCancha(ultimaBusqueda.fecha!, ultimaBusqueda.cancha_id!).then((resp)=>{
                        setRows(resp.data!)
                    })
                    alert('Reserva eliminada exitosamente')
                }
                else{
                    alert('No se pudo eliminar la reserva');
                }
            })
        }
    
return {rows, ConsultaReserva, AgregarReserva, EliminarReserva, EditarReserva};
};