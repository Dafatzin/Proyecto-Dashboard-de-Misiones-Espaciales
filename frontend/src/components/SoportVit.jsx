import { useState } from 'react';
import { useEffect } from 'react';
import "./SoportVit.css";

function SoporteVital({velocidad}){
 const [oxigeno, setOxigeno] = useState(100);
useEffect(() =>{    
if (velocidad === 0 ) return;
if (velocidad % 6 === 0){
  setOxigeno((o) => Math.max(0, o - 1));
}
}, [velocidad]);

const presion = oxigeno < 20 ? 20 : oxigeno < 50 ? 60 : 100;
const estadoTrip = oxigeno < 20 ? "Crítico" : oxigeno < 50 ? "Alerta" : "Normal";
// Poner que salga una graficca circular color amarillo
// Poner que salga una grafica circular color rojo
let mensaje = "";
if (oxigeno < 20) {
  mensaje = "Oxígeno crítico, recargar inmediatamente";
} else if (oxigeno < 50) {
  mensaje = "Oxígeno bajo, recargar pronto";
}

// Recuperación de oxígeno
function recuperarOxigeno(){
    setOxigeno((o) => Math.min(100, o + 20));

}
return(
<div className='Componente'>
 <h1 className='Titulos'> Nivel de Oxígeno</h1>
 <div className='Centrado'>
 <p className='DatoSoport'>Oxígeno: {oxigeno}%</p>
 <p className='DatoSoport'>Presión: {presion}</p>
 <p className='DatoSoport'>Estado de la Tripulación: {estadoTrip}</p>
 </div>
 <div className='Centrado'>
 <button className='BtnOxigeno' onClick={recuperarOxigeno}>Recuperar Oxígeno</button>
 </div>
 {mensaje && <div className= 'Alerta'>{mensaje}</div>}
</div>    
);
}

export default SoporteVital;
