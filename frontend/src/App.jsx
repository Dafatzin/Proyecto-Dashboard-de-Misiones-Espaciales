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
  return abierto === nombre ? "modulo grande" : "modulo";
 }
return (
  <div className="Dashboard">
    <div className={clase("navegacion")}>
    <button className="TituloModulo" onClick={() => alternar("navegacion")}>
      N A V E G A C I Ó N
    </button>
  <div className="contenido">
    <Navegacion onVelocidad={setVelocidad} />
  </div>
  </div>

  <div className={clase("energia")}>
    <button className="TituloModulo" onClick={() => alternar("energia")}>
      N Ú C L E O  D E  E N E R G Í A
    </button>
    <div className="contenido">
      <NucleoEnergia velocidad={velocidad} />
    </div>
    </div>
  

  <div className={clase("vital")}>
   <button className="TituloModulo" onClick={() => alternar("vital")}>
    S O P O R T E  V I T A L
   </button>
   <div className="contenido">
    <SoporteVital velocidad={velocidad} />
   </div>
   </div>

   <div className={clase("estatus")}>
    <button className="TituloModulo" onClick={() => alternar("estatus")}>
    E S T A T U S  D E  L A  N A V E
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
);
}
export default App;