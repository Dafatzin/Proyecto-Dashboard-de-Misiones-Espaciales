import { useState } from 'react';
import { useEffect } from 'react';
import "./NucleoEnergia.css";

function NucleoEnergia({velocidad}){
const [combustible, setCombustible] = useState(100);
const [potencia, setPotencia] = useState(0);

useEffect(() =>{
if (velocidad > 0 && velocidad < 100){
    setCombustible((c) => Math.max(0, c - 1));
    setPotencia((p) => Math.min (p + 3, 100));
} else if (velocidad === 0){
    setPotencia(0);
}
}, [velocidad]);

function recargar(){
 setCombustible(100)
}

return (
    <div className='Componente'>
    <div className='Combustible'>  
     <h1>Combustible</h1>
     <p className='DatosComb'>{combustible}%</p>
     <button className= 'BtnRec' onClick={recargar}>Recargar</button>
     </div> 
     <div className='Potencia'>
     <h1>Potencia</h1>
     <p className='DatosPot'>{potencia}</p>   
     </div>
    </div>
)
}
export default NucleoEnergia;