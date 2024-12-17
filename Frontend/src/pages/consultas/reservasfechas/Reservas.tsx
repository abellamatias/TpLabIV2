
import Tabla from "./components/Tabla"
import Filter from "./components/Filtro";
import { useConsulta } from "./hooks/consultarReservas";
import { ModalAlta } from "../../ABMReservas/altaReserva/components/modal/ModalAlta";
import { useEffect, useState } from "react";
import { FormikValues } from "formik";
import { IReserva } from "./interfaces/interfazTabla";
import { ModalConfirmacion } from "../../../common/modal/ModalConfirmacion";
import { ModalUpdate } from "../../ABMReservas/updateReservas/components/ModalUpdate";

interface IEditar {
  valores:IReserva;
  open:boolean;
}

const Reservas = () => {

  const { rows, ConsultaReserva, AgregarReserva, EliminarReserva, EditarReserva} = useConsulta();
  const [open, setOpen] = useState(false);
  const [openModalConfirmar, setOpenModalConfirmar] = useState(false);
  const [tempValor, setTempValor] = useState<IReserva>({fecha:'', hora:'', duracion:0, telefono:'', nombre_contacto:'', cancha_id:0, id:0});
  const [tempValorEditar, setTempValorEditar] = useState<IEditar>({
                  valores:{fecha:'', hora:'', duracion:0, telefono:'', nombre_contacto:'', cancha_id:0, id:0}, 
                  open:false});


  const handleSubmitConsulta = async (fecha: string, cancha_id: number) => {
    await ConsultaReserva({fecha, cancha_id});
  }
    
    
    const handleSubmitAdd = async (values:FormikValues) => {
        await AgregarReserva(values);
        setOpen(false);
    }

    const handleUpdate = async (row:IReserva) => {
      setTempValorEditar({...tempValorEditar, valores:row, open:true});
    }
    const handleUpdateAccept = async (row:FormikValues) => {
      const body:IReserva={
        fecha: row.dia,
        hora: row.hora,
        cancha_id: row.cancha_id,
        telefono: row.tel,
        nombre_contacto: row.contacto,
        duracion: row.duracion,
        id:row.id
      }
      setTempValorEditar({...tempValorEditar, open:false});
      await EditarReserva(body);
    }

    const handleDeleteOpenModal = async (row:IReserva) => {
        setOpenModalConfirmar(true);
        setTempValor(row);
    }
    const handleDelete = async () => {
      setOpenModalConfirmar(false);
      await EliminarReserva(tempValor.id);
      setTempValor({fecha:'', hora:'', duracion:0, telefono:'', nombre_contacto:'', cancha_id:0, id:0});
    }

    useEffect(()=>{
      console.log(tempValorEditar.valores)
    }, [rows])

  return (
    <div style={{width: '100%', height:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Filter handleSubmit={handleSubmitConsulta} /> 
      {rows && <Tabla rows={rows} handleAdd={()=>{setOpen(true)}} handleDelete={(handleDeleteOpenModal)} handleUpdate={handleUpdate}/>}
      { open && (<ModalAlta open={open} handleClose={()=>{setOpen(false)}} handleSubmit={handleSubmitAdd}/>)}
      { tempValorEditar.open && (<ModalUpdate open={tempValorEditar.open} data={tempValorEditar.valores} handleClose={()=>{setTempValorEditar({...tempValorEditar, valores:{fecha:'', hora:'', duracion:0, telefono:'', nombre_contacto:'', cancha_id:0, id:0}, open:false});}} handleSubmit={handleUpdateAccept}/>)}
      { openModalConfirmar && (<ModalConfirmacion open={openModalConfirmar} mensaje="Eliminar reserva" handleClose={()=>{setOpenModalConfirmar(false); setTempValor({fecha:'', hora:'', duracion:0, telefono:'', nombre_contacto:'', cancha_id:0, id:0});}} handleSubmit={handleDelete}/>)}
      
    </div>
  )
  
}

export default Reservas