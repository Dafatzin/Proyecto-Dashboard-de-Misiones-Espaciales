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
 const [form, setForm] = useState(false);
 const [seleccionado, setSeleccionado] = useState(false);
 //Se va a leer la imagen
 const [imagen, setImagen] = useState("");

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

//Se va a agregar un formulario

function GuardarForm(){
  const nuevoDestino = {
    nombre:nombre,
    imagen: imagen,
    km: Number(km),
    descripcion: descripcion,  
  };
  setLista([...lista, nuevoDestino]);
  setNombre("");
  setImagen("");
  setKm("");
  setDescripcion("");
}

// Función para leer la imagen
function leerImagen(e){
  const archivo = e.target.files[0];
  if (!archivo) return;

  const lector= new FileReader();
  lector.onload = () => setImagen(lector.result);
  lector.readAsDataURL(archivo);
}


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
    <button className="PuntoDest" onClick={() => {setDestino(d);setSeleccionado(true)}}></button>
    </div>
  ))}
    </div>
  {seleccionado && (
  <div className="InfoDestino">
    <h2>{destino.nombre}</h2>
    <img src={destino.imagen} alt={destino.nombre}/>
    <p>{destino.km}</p>
    <p>{destino.descripcion}</p>
    </div>
  )}

    </div>
      
    <div className="Formulario">
    <button className="BtnForm" onClick={() => setForm(!form)}> Formulario</button>
    { form && (
     <div className="DatosForm">
      <p className="Titulos">Nombre del Planeta</p>
      <input value={nombre} onChange={(e) =>setNombre(e.target.value)} placeholder="Agrega nombre"/>
     <p className="Titulos"> Distancia en km</p>
     <input value={km} onChange={(e) =>setKm(e.target.value)} placeholder="18km"/>
     <p className="Titulos">Descripción</p>
     <input value={descripcion} onChange={(e) =>setDescripcion(e.target.value)} placeholder="Añade la descricpión"/>
     <p className="Titulos">Imagen</p>
     <input type="file" accept="imagen/*" onChange={leerImagen} />
      <button className="BtnGuardar" onClick={GuardarForm}> Guardar </button>
      </div> 
    )}
    </div>
    </div>
);
}

export default Navegacion;
