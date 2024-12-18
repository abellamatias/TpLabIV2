import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { FormikValues, useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { btnStyled, errorStyled, inputStyled, inputStyledDate, modalStyled } from "./stylesForm";
import { ModalConfirmacion } from "../../../../common/modal/ModalConfirmacion";
import { IReserva } from "../../../consultas/reservasfechas/interfaces/interfazTabla";


interface InputProps {
    open: boolean;
    data:IReserva;
    handleClose: () => void;
    handleSubmit:(values:IReserva)=>void

}



export const ModalUpdate = ({open, data, handleClose, handleSubmit}:InputProps) => {

    const [openModalConfirmar, setOpenModalConfirmar] = useState(false);

    const initialValuesFormik={
        fecha: '',
        hora: 1,
        duracion: data.duracion,
        telefono: data.telefono,
        nombre_contacto: data.nombre_contacto,
        cancha_id: data.cancha_id,
      }
    
      const validationSchema = yup.object({
        fecha: yup.string()
        .required('Este campo es requerido'),
        hora: yup.string(),
        duracion: yup.number()
        .required('Este campo es requerido')
        .max(3, '*La duracion no puede ser mayor a 3')
        .min(1, '*La duracion no puede ser menor a 1'),
        telefono: yup.string()
        .required('Este campo es requerido'),
        nombre_contacto: yup.string()
        .required('Este campo es requerido'),
        cancha_id: yup.number()
        .required('Este campo es requerido')
        .max(3, '*Hay solo 3 canchas')
        .min(1, '*No hay canchas menores a 1'),        
    });
    
    
    
          const [fecha, setFecha] = useState<Dayjs | null>(null);
          const [hora, setHora] = useState<number>(0);
          const [tempValores, setTempValores] = useState<IReserva>({fecha:'', hora:'', duracion:0, telefono:'', nombre_contacto:'', cancha_id:0, id:data.id});

          const handleSendForm = async () => {
            setOpenModalConfirmar(false);
            await handleSubmit(tempValores);
            setTempValores({...tempValores, fecha:'', hora:'', duracion:0, telefono:'', nombre_contacto:'', cancha_id:0});

        }
        

          const onSubmitFormik =
          async(values:FormikValues) => 
              {
                const body:IReserva={
                    fecha: values.fecha,
                    hora: values.hora,
                    duracion: values.duracion,
                    telefono: values.telefono,
                    nombre_contacto: values.nombre_contacto,
                    cancha_id: values.cancha_id,
                    id:data.id

                }
                setTempValores(body);
                setOpenModalConfirmar(true);
              }
    
            const formik = useFormik(
            {
                initialValues: initialValuesFormik,
                validationSchema: validationSchema,
                onSubmit:onSubmitFormik ,
            });

    
        const defHora=(hora:number | string | null)=>{
        return Number(hora)<10 ? `0${hora}:00:00` : `${hora}:00:00` 
        }

    return (<>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={modalStyled}>
            <form
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
            >
                
                <FormControl style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', maxWidth:'300px', margin:'50px', color:'white'}}>
                    <LocalizationProvider  dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={fecha}
                    name="fecha"
                    onChange={(newValue) => {
                        setFecha(newValue)
                        formik.setFieldValue("fecha", newValue!.format('YYYY-MM-DD'))
                    }}
                    
                    sx={inputStyledDate}
                    />
                    {formik.touched.fecha && formik.errors.fecha ? ( <div style={errorStyled}>{formik.errors.fecha}</div> ) : null}   
                    </LocalizationProvider>
                        <InputLabel sx={{color : 'white', marginTop:'70px'}} id="demo-simple-select-label">Hora</InputLabel>
                        <Select
                        fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="hora"
                            value={hora}
                            label="Age"
                            onChange={
                                (e) => {
                                    setHora(Number(e.target.value))
                                    formik.setFieldValue("hora", defHora(e.target.value))
                                }
                            }
                            sx={{...inputStyled, color:'white'}}
                        >
                            <MenuItem value={8}>8hs</MenuItem>
                            <MenuItem value={9}>9hs</MenuItem>
                            <MenuItem value={10}>10hs</MenuItem>
                            <MenuItem value={11}>11hs</MenuItem>    
                            <MenuItem value={12}>12hs</MenuItem>
                            <MenuItem value={13}>13hs</MenuItem>
                            <MenuItem value={14}>14hs</MenuItem>
                            <MenuItem value={15}>15hs</MenuItem>
                            <MenuItem value={16}>16hs</MenuItem>
                            <MenuItem value={17}>17hs</MenuItem>
                            <MenuItem value={18}>18hs</MenuItem>
                            <MenuItem value={19}>19hs</MenuItem>
                            <MenuItem value={20}>20hs</MenuItem>
                        </Select>                        
                    {formik.touched.hora && formik.errors.hora ? ( <div style={errorStyled}>{formik.errors.hora}</div> ) : null}  
                    <TextField 
                        sx={inputStyled} 
                        label="Duración " 
                        name="duracion" 
                        value={formik.values.duracion} 
                        onChange={formik.handleChange}
                        error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                        helperText={formik.touched.duracion && formik.errors.duracion}
                        />
                    <TextField 
                        sx={inputStyled} 
                        label="Teléfono " 
                        name="tel" 
                        value={formik.values.telefono} 
                        onChange={formik.handleChange}
                        error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                        helperText={formik.touched.telefono && formik.errors.telefono}/>
                    <TextField 
                        sx={inputStyled} 
                        label="Contacto " 
                        name="contacto" 
                        value={formik.values.nombre_contacto} 
                        onChange={formik.handleChange}
                        error={formik.touched.nombre_contacto && Boolean(formik.errors.nombre_contacto)}
                        helperText={formik.touched.nombre_contacto && formik.errors.nombre_contacto}/>
                    <TextField 
                        sx={inputStyled} 
                        label="Cancha ID " 
                        name="cancha_id" 
                        value={formik.values.cancha_id} 
                        onChange={formik.handleChange}
                        error={formik.touched.cancha_id && Boolean(formik.errors.cancha_id)}
                        helperText={formik.touched.cancha_id && formik.errors.cancha_id}/>
                <div style={{display:'flex', justifyContent:'center', gap:'20px'}}>
                    <Button sx={btnStyled} variant="outlined" type="submit">Agregar</Button>                
                    <Button sx={btnStyled} variant="outlined" onClick={handleClose}>Cancelar</Button>
                </div>
                </FormControl>
                
            </form>
        <ModalConfirmacion open={openModalConfirmar} mensaje="Actualizar reserva" handleClose={()=>{setOpenModalConfirmar(false)}} handleSubmit={handleSendForm}/>
        </Box>
        </Modal>

        </>
    )
}