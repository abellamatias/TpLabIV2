import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { inputStyled, inputStyledDate} from './ComponentsStyles';
import { Button, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface InputProps {
  handleSubmit: (fechaString: string, cancha_id: number) => void;
}

export default function Filter({handleSubmit}: InputProps) {

  const [cancha_id, setId] = useState<number>(0);
  const [fecha, setFecha] = useState<Dayjs | null>(null);
  const [fechaString, setFechaString] = useState<string>('');


  const validateSubmit=(fechaStr: string, id: number) => {
    if(id<=0){
      alert('El Id debe ser mayor a 0')
    }
    else if(fechaStr === ''){
      alert('Selecciona una fecha')
    }
    else{
      handleSubmit(fechaString, id)
    }
  }
  
  return (
    <div style={{display:'flex', alignItems:'center', marginTop:'20px'}}>
      <TextField type='number' sx={inputStyled} label="Cancha " value={cancha_id} onChange={(e)=>{ (
        setId(Number(e.target.value))
        
      )
      }}/>
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
        <DemoContainer sx={inputStyledDate} components={['DatePicker']}>
        <DatePicker sx={inputStyledDate} value={fecha} onChange={(newValue) => {
          setFecha(newValue!)
          setFechaString(newValue!.format('YYYY-MM-DD'))
        }} />
        </DemoContainer>
      </LocalizationProvider>  
      <Button sx={{height:'60px', color: 'white', margin:'20px', border: 'solid 1px white'}} variant='outlined'
      onClick={()=>{validateSubmit(fechaString, cancha_id!) 
      }}
      ><SearchIcon/></Button>     
    </div>
  );
}