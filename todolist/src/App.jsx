import { useState, useEffect } from "react";

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState("");

  // cargar del localStorage al inicio
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tareas")) || [];
    setTareas(data);
  }, []);

  // guardar cada vez que cambian las tareas
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const agregar = () => {
    if (input.trim() === "") return;

    setTareas([...tareas, { texto: input, hecha: false }]);
    setInput("");
  };

  const borrar = (i) => {
    const nuevas = tareas.filter((_, index) => index !== i);
    setTareas(nuevas);
  };

  const toggle = (i) => {
    const nuevas = [...tareas];
    nuevas[i].hecha = !nuevas[i].hecha;
    setTareas(nuevas);
  };

  return (
    <div>
      <h2>To-Do List</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={agregar}>Agregar</button>

      <ul>
        {tareas.map((t, i) => (
          <li
            key={i}
            onClick={() => toggle(i)}
            style={{
              textDecoration: t.hecha ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {t.texto}
            <button
              onClick={(e) => {
                e.stopPropagation(); // evita que active el toggle
                borrar(i);
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}