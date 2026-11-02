import EstatusNave from "./components/EstatusNave";
import Navegacion from "./components/Navegacion";
//import NucleoEnergia from "./components/NucleoEnergia";
import SoporteVital from "./components/SoportVit"; 
import { useState } from 'react'
import './App.css'

function App(){
  const [velocidad, setVelocidad] = useState(0);
return (
  <div>
    <Navegacion onVelocidad={setVelocidad}/>
    <EstatusNave/>
    <SoporteVital velocidad={velocidad} />
 </div>
);
}
export default App;