import "./Navegacion.css";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback }  from "react";
import { z } from "zod";
import destinos from "./Posicion.json";

const terminos = {
  Luna: "moon",
  Marte: "mars planet",
  Júpiter: "jupiter planet",
};

//Para Zod
const ReglasDestino = z.object({
  nombre: z.string().min(2,"Mínimo debe haber 2 caracteres"),
  km: z.number("Solo números").positive("Solo números mayor a 0"),
  descripcion: z.string().min(10, "Mínimo 10 caracteres")
});

function Navegacion({ onVelocidad }) {
 const [destino, setDestino] = useState(destinos[0])
 const [velocidad, setVelocidad] = useState(0);
 const [nombre, setNombre] = useState("");
 const [km, setKm] = useState("");
 const [descripcion, setDescripcion] = useState("");
 const [form, setForm] = useState(false);
 const [seleccionado, setSeleccionado] = useState(false);
 //Se va a leer la imagen
 const [imagen, setImagen] = useState("");
 // Para la API
 const [datosNasa, setDatosNasa] = useState(null);
 const [errorApi, setErrorApi] = useState ("");
//Para el Zod Error
const [error, setError] = useState([]);

 const [lista, setLista] = useState (() => {
    const guardado = localStorage.getItem("destinos");
    return guardado ? JSON.parse(guardado) : destinos;
 });    
 
// Para el useMemo
const totalkm = useMemo (() => {
  return lista.reduce((suma, d) => suma + Number(d.km), 0);
}, [lista]);

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

// Para que funcione con velocidad
useEffect(() => {
 onVelocidad(velocidad); 
  }, [velocidad]);

//Se va a agregar un formulario

const GuardarForm = useCallback(() => {
  const nuevoDestino = {
    nombre:nombre,
    imagen: imagen,
    km: Number(km),
    descripcion: descripcion,  
  };
  //Para Zod
  const resultado = ReglasDestino.safeParse(nuevoDestino);
  if(!resultado.success){
    setError(resultado.error.issues.map((i) => i.message));
    return;
  }
  setLista([...lista, nuevoDestino]);
  setNombre("");
  setImagen("");
  setKm("");
  setDescripcion("");
  setError([]);
}, [nombre, imagen, km, descripcion, lista]);

// Función para leer la imagen
const leerImagen = useCallback((e) => {
  const archivo = e.target.files[0];
  if (!archivo) return;

const lector = new FileReader();
lector.onload = () => setImagen(lector.result);
lector.readAsDataURL(archivo);
}, []);

// Para la API
useEffect(() => {
  if (destino.nombre === "Inicio")return;
  setDatosNasa(null);
  setErrorApi("");

const busqueda = terminos[destino.nombre] || destino.nombre;
fetch(`http://localhost:3000/imagen/${busqueda}`)
 .then((r) => r.json())
 .then((datos) => {
  if(datos.error) {
  setErrorApi("Error en los datos");
 return;
}
setDatosNasa(datos);
})
.catch(() => setErrorApi("No se pudo conectar con el servidor"));
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
    <p className="Dist">Distancia total de la ruta: {totalkm} km</p>
    <div className="ListaDestinos">
    {lista.map((d) =>(
    <div key={d.nombre} className="punto-contenedor"> 
    <button className="PuntoDest" onClick={() => {setDestino(d);setSeleccionado(true);
    }}></button>
    </div>
  ))}
    </div>
  {seleccionado && (
  <div className="InfoDestino">
    <h2>{destino.nombre}</h2>
    {destino.imagen && <img src={destino.imagen} alt={destino.nombre}/>}
    <p>{destino.km} km</p>
    <p>{destino.descripcion}</p>

     {datosNasa && datosNasa.imagen && (
    <div className="InfoNasa">
    <img src={datosNasa.imagen} alt={datosNasa.titulo} />
    <p>{datosNasa.descripcion}</p>
    </div>
  )}
  {errorApi && <p className="Error">{errorApi}</p>}
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
     <input value={km} onChange={(e) =>setKm(e.target.value)} placeholder="18"/>
     <p className="Titulos">Descripción</p>
     <input value={descripcion} onChange={(e) =>setDescripcion(e.target.value)} placeholder="Añade la descricpión"/>
     <p className="Titulos">Imagen</p>
     <input type="file" accept="image/*" onChange={leerImagen} />
     {/*Para Zod*/}
     {error.map((e) => (<p key={e} className="Error">{e}</p>))}
      <button className="BtnGuardar" onClick={GuardarForm}> Guardar </button>
      </div> 
    )}
    </div>
    </div>
);
}

export default Navegacion;
