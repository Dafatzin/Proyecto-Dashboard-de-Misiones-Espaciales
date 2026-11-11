import {useState} from "react";
import "./EstatusNave.css";

function EstatusNave() {
 const [integridad, setIntegridad] = useState(100);
 const [zonas, setZonas] = useState([
    {nombre:"Cubierta", daño: false},
    {nombre: "Motores", daño: false},
    {nombre: "Cabina", daño: false}
 ]);

 function alternarDaño(nombre) {
    const nuevas = zonas.map((z) =>
    z.nombre === nombre ? {...z, daño: !z.daño}: z
 );
 setZonas(nuevas);
 const daño = nuevas.filter((z) => z.daño).length;
 setIntegridad(100 - daño * 25);
 }

function repararTodo(){
    setZonas(zonas.map((z) => ({...z, daño:false})));
    setIntegridad(100);
}

return(
 <div className="Componente">
    <h1>Estatus de la Nave</h1>
    <h2>Integridad estructural: {integridad}%</h2>
    {zonas.map((z) => (
    <div className="Habilidades" key={z.nombre}>
    <span className="Daño">
        {z.nombre}: {z.daño ? "Daño": "Operativa"}
    </span>
    <button className="Reparar" onClick={() => alternarDaño(z.nombre)}>
    {z.daño ? "Reparar" : "Dañar"}
    </button>
    </div>
    ))}
    <div className="Centrar">
    <button className="BtnRepTod" onClick={repararTodo}>Reparar Todo</button>
 </div>
 </div>
);
}
export default EstatusNave;