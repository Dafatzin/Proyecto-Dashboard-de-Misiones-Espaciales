import { useState } from "react";

function Acceso({onAcceso}){
const [clave, setClave] = useState("");
const [autorizado, setAutorizado] = useState(false);
const [error, setError] = useState("");

function verificar(){
    setError("");
    fetch(`${API}/verificar/${clave}`)
    .then((r) => r.json())
    .then((datos) => {
    setAutorizado(datos.autorizado);
    if(datos.autorizado){ onAcceso();       
    } else {
      setError("Clave incorrecta");
    }
    })
    .catch(() => setError("No se pudo conectar con el servidor"));
    }

  return(
  <div className="Acceso">
  <h2 className='TituloAcces'>ACCESO RESTRINGIDO</h2>  
  <input type='password' value={clave} onChange={(e) => setClave(e.target.value)} placeholder="Escriba la clave" />
  <button onClick={verificar}>Aceptar</button>
  {error && <p className="Error">{error}</p>}
  {autorizado && <p>Acceso concedido</p>}
  </div>
  );
}

export default Acceso;

