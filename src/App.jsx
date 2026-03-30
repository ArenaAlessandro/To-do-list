import { useState, useEffect, use } from "react";

function Boton() {
  const [cantveces, setCantveces] = useState(0);
  function Contar(){
    setCantveces(cantveces +1)
  }
  return (
    <div>
      <button onClick={Contar}>hola</button>
      <h2>me tocaste {cantveces} veces</h2>
    </div>
  )
}

export default function TodoList() {
      const [tarea, setTarea] = useState("");
      const [tareas, setTareas] = useState([]);

      function AgregarTarea(){
          if (tarea === ""){
          alert("pone algo dale")
        }else{
        setTareas([...tareas,{ id: Date.now(), nombre: tarea }]);
        setTarea("");
        }
      }

      function EliminarTarea(id){
        setTareas(tareas.filter((t) => t.id !== id));
      }
  return (
    <div>
      <h1>LISTA</h1>
      <input type="text" placeholder="agregar tarea" value={tarea} onChange={(e) => setTarea(e.target.value)}></input>
      <button onClick={AgregarTarea}>Agregar tarea</button>
      <ul>{tareas.map((t) => (<li key={t.id}>{t.nombre} <button onClick={() => EliminarTarea(t.id)}>❌</button></li>))}</ul>
    </div>
  );
}