
import { useEffect, useState } from "react"
import Todo from "./components/Todo"
import { Construction } from "lucide-react"

type Priority = "Urgente" | "Moyenne" | "Basse"



function App() {
  const [input, setInput] = useState("")
  const [priority, setPriority] = useState <Priority>("Moyenne")

  const savedTodos = localStorage.getItem("todos")
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : []
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const [filter, setFilter] = useState <Priority | "Tous"> ("Tous")
  const [selectedTodos, setSelectedTodos]=useState<Set<number>>(new Set())

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

  function deleteTodos (id:number) : void{
   const newTodos = todos.filter(todo => todo.id != id)
   setTodos(newTodos)
  }

  let filteredTodos: Todo[] = [];

  if (filter === "Tous"){
    filteredTodos = todos
  } else {
    filteredTodos = todos.filter(todo=>todo.priority == filter)
  }

function toggleSelectedTodos(id:number) : void{
const newSelected = new Set(selectedTodos)
if(selectedTodos.has(id)){
  newSelected.delete(id)
}else{
  newSelected.add(id)
}
setSelectedTodos(newSelected)

}
function finishSelected (){
  const newTodos = todos.filter((todo) =>
{if (selectedTodos.has(todo.id)){
  return false;
} else {
  return true;
}}
  )
 setTodos(newTodos)
 setSelectedTodos(new Set())  
  
}

  const urgentCount = todos.filter(t=>t.priority === 'Urgente').length
  const mediumCount = todos.filter(t=>t.priority === 'Moyenne').length
  const lowCount = todos.filter(t=>t.priority === 'Basse').length
  const totalCount = todos.length

 return (
    <>
    
    <div className="flex justify-center ">
      <div className="flex flex-col w-2/3 ">
      <div className="flex gap-4 border-sm bg-base-300 my-10">
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
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col h-fit gap-4">
        <div className="flex gap-2">
          <button 
          className={`btn btn-soft ${filter == "Tous" ? "btn btn-primary" : "" } `}
          onClick={()=>setFilter("Tous")}>
            Tous ({totalCount})
          </button>
          <button 
          className={`btn btn-soft ${filter == "Urgente" ? "btn btn-primary" : "" } `}
          onClick={()=>setFilter("Urgente")}>
          Urgente ({urgentCount})
          </button>
          <button 
          className={`btn btn-soft ${filter == "Moyenne" ? "btn btn-primary" : "" } `}
          onClick={()=>setFilter("Moyenne")}>
            Moyenne ({mediumCount})
          </button>
           <button 
          className={`btn btn-soft ${filter == "Basse" ? "btn btn-primary" : "" } `}
          onClick={()=>setFilter("Basse")}>
            Basse ({lowCount})
          </button>
           </div>
        {filteredTodos.length > 0 ? (
         <ul className="divide-y divide-gray-700">
         {filteredTodos.map(todo=>(
          <Todo 
          onDelete={()=>deleteTodos(todo.id)} 
          todo={todo} 
          isSelected={selectedTodos.has(todo.id)}
          onToggleSelect={toggleSelectedTodos}/>
         ))}

         </ul>
        ):
          <div className="flex flex-col justify-center items-center">
            <Construction className="w-40 h-40" strokeWidth="1" color="gray"/>
            <p className="text-md">Aucune tache trouvée pour cette catégorie</p>
          </div>
        }
      </div>
      <button 
      className="btn btn-primary"
      disabled={selectedTodos.size === 0}
      onClick={finishSelected}>
        Finir la sélection ({selectedTodos.size})
      </button>
      </div>



      
       </div>  
    </div>
    
    </>
  )
}

export default App
