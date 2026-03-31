import { useState } from "react";
import './App.css'

export default function TodoList() {
  const [tarea, setTarea] = useState("");
  const [listas, setListas] = useState({
    General: [],
    Cocina: [],
    Gym: [],
    Supermercado: []
  });
  const [listaActual, setListaActual] = useState("General");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);
  const [prioridad, setPrioridad] = useState("Baja");
  const [contadorId, setContadorId] = useState(1);
  const tareas = listas[listaActual];
  const cantTareas = tareas.length;


  function AgregarTarea() {
    if (tarea.trim() === "") {
      setMensaje("Error al cargar. Nombre de tarea incompleta.");
      setError(true);
    } else if (tareas.length === 15) {
      setMensaje("Error al cargar. Llegaste al maximo de tareas.");
      setError(true);
    } else if (tarea.length > 70) {
      setMensaje("Error al cargar. Nombre de tarea muy largo.");
      setError(true);
    } else {
      const nuevasListas = { ...listas };
      nuevasListas[listaActual] = [
        ...nuevasListas[listaActual],
        { id: contadorId, nombre: tarea, prioridad: prioridad }
      ];
      setListas(nuevasListas);
      setContadorId(contadorId + 1);
      setTarea("");
      setMensaje("Tarea guardada correctamente.");
      setError(false);
    }
  }

  function EliminarTarea(id) {
    const nuevasListas = { ...listas };
    nuevasListas[listaActual] =
    nuevasListas[listaActual].filter((t) => t.id !== id);
    setListas(nuevasListas);
    setMensaje("Tarea eliminada correctamente.");
    setError(false);
  }
  return (
    <div className="layout">
      <div className="container-izq">
        <h2>Listas</h2>
        {Object.keys(listas).map((nombre) => (
        <button key={nombre} onClick={() => setListaActual(nombre)} className={listaActual === nombre ? "activa" : ""}>{nombre}</button>
        ))}
      </div>
      <div className="container-list">
        <h1>TO DO LIST: BY CHOCLO</h1>
        <h1>{listaActual}</h1>
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