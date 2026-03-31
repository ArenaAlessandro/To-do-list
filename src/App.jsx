import { useState } from "react";
import './App.css'

export default function TodoList() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);
  const [prioridad, setPrioridad] = useState("Baja");
  const [cantTareas, setCantTareas] = useState(0);
  const [contadorId, setContadorId] = useState(1);

  function AgregarTarea() {
    if (tarea === "") {
      setMensaje("Error al cargar. Nombre de tarea incompleta.")
      setError(true)
    } else if (cantTareas === 15) {
      setMensaje("Error al cargar. Llegaste al maximo de tareas.")
      setError(true)
    } else if (tarea.length > 70) {
      setMensaje("Error al cargar. Nombre de tarea muy largo.")
      setError(true)
    } else {
      setTareas([...tareas, { id: contadorId, nombre: tarea, prioridad: prioridad }]);
      setTarea("");
      setContadorId(contadorId + 1)
      setCantTareas(cantTareas + 1)
      setMensaje("Tarea guardada correctamente.")
      setError(false)
    }
  }

  function EliminarTarea(id) {
    setTareas(tareas.filter((t) => t.id !== id));
    setCantTareas(cantTareas - 1)
    setMensaje("Tarea eliminada correctamente.")
    setError(false)
  }
  return (
    <div className="layout">
      <div className="container-izq">
        <h1>hola</h1>
      </div>
      <div className="container-list">
        <h1>TO DO LIST: BY CHOCLO</h1>
        <div className="input-group">
          <input type="text" placeholder="Agregar una tarea a la lista..." value={tarea} onChange={(e) => setTarea(e.target.value)}></input>
          <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
            <option value={"Baja"}>Baja</option>
            <option value={"Media"}>Media</option>
            <option value={"Alta"}>Alta</option>
          </select>

          <button onClick={AgregarTarea}>Agregar tarea</button>
        </div>
        <div className="mensaje">
          {mensaje && (<p className={error ? "error" : "cargado"}>{mensaje}</p>)}
          <h3>Cantidad de tareas actuales: {cantTareas}/15</h3>
        </div>
        <div className="lista">
          <div className="header">
            <span>ID</span>
            <span>TAREA</span>
            <span>PRIORIDAD</span>
            <span>ELIMINAR</span>
          </div>
          {tareas.map((t) => (
            <div key={t.id} className={`fila ${t.prioridad}`}>
              <span className="id">{t.id}</span>
              <span className="nombre">{t.nombre}</span>
              <span className="prioridad">{t.prioridad}</span>
              <button onClick={() => EliminarTarea(t.id)}>❌</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}