import EstatusNave from "./components/EstatusNave";
import Navegacion from "./components/Navegacion";
import NucleoEnergia from "./components/NucleoEnergia";
import SoporteVital from "./components/SoportVit"; 
import Acceso from "./components/Acceso";
import { useState } from 'react'
import './App.css'

function App(){
  const [velocidad, setVelocidad] = useState(0);
  const [autorizado, setAutorizado] = useState(false);
  const [abierto, setAbierto] = useState(null);

 function alternar(nombre) {
  setAbierto(abierto === nombre ? null : nombre);
 }

 function clase(nombre){
  return abierto === nombre ? `modulo ${nombre} grande` : `modulo ${nombre}`;
 }

 // Para el fondo movible
 const viajando = velocidad > 0 && velocidad < 100;

return (
  <>
  <div className={viajando ? "fondo-movible viajando" : "fondo-movible"}></div>
  <div className="fondo-estatico"></div>
  <div className="Dashboard">
    <div className={clase("navegacion")}>
    <button className="TituloModulo" onClick={() => alternar("navegacion")}>
      NAVEGACIÓN
    </button>
  <div className="contenido">
    <Navegacion onVelocidad={setVelocidad} />
  </div>
  </div>

  <div className={clase("energia")}>
    <button className="TituloModulo" onClick={() => alternar("energia")}>
      NÚCLEO DE <br /> ENERGÍA 
    </button>
    <div className="contenido">
      <NucleoEnergia velocidad={velocidad} />
    </div>
    </div>
  

  <div className={clase("vital")}>
   <button className="TituloModulo" onClick={() => alternar("vital")}>
    SOPORTE <br /> VITAL
   </button>
   <div className="contenido">
    <SoporteVital velocidad={velocidad} />
   </div>
   </div>

   <div className={clase("estatus")}>
    <button className="TituloModulo" onClick={() => alternar("estatus")}>
    ESTATUS DE <br /> LA NAVE
    </button>
  <div className="contenido">
  {autorizado ? (
  <EstatusNave />
  ) : (
    <Acceso onAcceso={() => setAutorizado(true)} />
  )}
  </div>
   </div>
  </div>    
  </>
);
}
export default App;