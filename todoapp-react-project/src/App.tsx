import { useEffect, useState } from "react"

type Priority = "Urgente" | "Moyenne" | "Basse"

type Todo = {
  id: number,
  text: string,
  priority: Priority
}

function App() {
  const [input, setInput] = useState("")
  const [priority, setPriority] = useState <Priority>("Moyenne")

  const savedTodos = localStorage.getItem("todos")
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : []
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const [filter, setFilter] = useState <Priority | "Tous"> ("Tous")

  useEffect(()=>{
  localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  function addTodo(){
    if(input.trim() == ""){
      return;
    }

    const newTodo:Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority
    }
    const newTodos = [newTodo ,...todos]
    setTodos(newTodos)
    setInput("")
    setPriority("Moyenne")
    console.log(newTodos)


  }

  let filteredTodos: Todo[] = [];

  if (filter === "Tous"){
    filteredTodos = todos
  } else {
    filteredTodos = todos.filter(todo=>todo.priority == filter)
  }

 return (
    <>
    <div className="flex justify-center">
      <div className="flex gap-4 w-2/3 border-sm bg-base-300 my-10">
      <input 
      className="input w-full" 
      placeholder="Ajouter une tache"
      value={input}
      onChange={(e)=>setInput(e.target.value)}
      />

      <select 
      className="select w-full"
      value={priority}
      onChange={(e)=>setPriority(e.target.value as Priority)}
      >
        <option value="Urgente">Urgente</option>
        <option value="Moyenne">Moyenne</option>
        <option value="Basse">Basse</option>
      </select>

      <button 
      className="btn btn-primary"
      onClick={addTodo}>
      Ajouter
      </button>
      <div className="flex flex-wrap h-fit">
        <div>
          <button 
          className={`btn btn-soft ${filter == "Tous" ? "btn btn-primary" : "" } `}
          onClick={()=>setFilter("Tous")}>
            Tous
          </button>
        </div>
        {filteredTodos.length ? (
          <div>
            filteredTodos
          </div>
        ):(
          <div>
            test
          </div>
        )}
      </div>



      </div>

    </div>
    
    </>
  )
}

export default App
