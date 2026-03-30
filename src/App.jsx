import { useState, useEffect, use } from "react";
import './App.css'

export default function TodoList() {
      const [tarea, setTarea] = useState("");
      const [tareas, setTareas] = useState([]);
      const [mensaje, setMensaje] = useState("");
      const [error, setError] = useState(false);

      function AgregarTarea(){
          if (tarea === ""){
          setMensaje("Error al cargar. Nombre de tarea incompleta.")
          setError(true)
        }else{
        setTareas([...tareas,{ id: Date.now(), nombre: tarea }]);
        setTarea("");
        setMensaje("Tarea guardada correctamente.")
        setError(false)
        }
      }

      function EliminarTarea(id){
        setTareas(tareas.filter((t) => t.id !== id));
        setMensaje("Tarea eliminada correctamente.")
        setError(false)
      }
  return (
    <div className="container">
    <h1>LISTA</h1>
      <div className="input-group">
        <input type="text" placeholder="agregar tarea" value={tarea} onChange={(e) => setTarea(e.target.value)}></input>
        <button onClick={AgregarTarea}>Agregar tarea</button>
      </div>
      {mensaje && (
        <p className={error ? "error" : "cargado"}>{mensaje}</p>
      )}
      <ul>{tareas.map((t) => (<li key={t.id}>{t.nombre} <button onClick={() => EliminarTarea(t.id)}>❌</button></li>))}</ul>
    </div>
  );
}