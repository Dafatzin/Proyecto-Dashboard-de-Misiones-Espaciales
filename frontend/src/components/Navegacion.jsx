import "./Navegacion.css";
import { useState } from "react";
import { useEffect } from "react";
import destinos from "./Posicion.json";

function Navegacion() {
 const [destino, setDestino] = useState(destinos[0])
 const [velocidad, setVelocidad] = useState(0);
 const [nombre, setNombre] = useState("");
 const [km, setKm] = useState("");
 const [descripcion, setDescripcion] = useState("");

 const [lista, setLista] = useState (() => {
    const guardado = localStorage.getItem("destinos");
    return guardado ? JSON.parse(guardado) : destinos;
 });    
 
useEffect(() => {
    localStorage.setItem("destinos", JSON.stringify(lista));    
}, [lista]);

useEffect(() => {
setVelocidad(0);

if (destino.nombre === "Inicio"){
  return;
}
const intervalo = setInterval(() => {
setVelocidad((v) => {
    if(v >= 100){
clearInterval(intervalo);
return v;
}
return v + 1;
});
}, 300);
return () => clearInterval(intervalo);
}, [destino]);

//Se va a dibujar una linea hasta que se llegue al planeta
return (
    <div>
     <div className="ComponenteVelocidad">   
    <div className="Velodatos">   
     <h1> V E L O C I D A D</h1>
     <p>{velocidad}</p>
     {/*Grafica circulo pero no se hacerlo*/}
    </div>
    </div>
    <div className="ComponentePosicion">
      <h1>Posición</h1>
    {/* Se va a trazar una linea azul hasta el destino pero no se hacerlo*/}
    <h1>Destino:{destino.nombre}</h1>  
    <div className="ListaDestinos">
    {lista.map((d) =>(
    <div key={d.nombre} className="punto-contenedor"> 
    <button className="PuntoDest" onClick={() => setDestino(d)}></button>
    {destino.nombre === d.nombre && <p>{d.nombre}</p>}
    </div>
  ))}
    </div>
    </div>
    </div>
);
}

export default Navegacion;
