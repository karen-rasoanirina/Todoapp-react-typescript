import { Trash } from "lucide-react"
type Priority = "Urgente" | "Moyenne" | "Basse"

type Todo = {
  id: number,
  text: string,
  priority: Priority
}
type Props = {
    todo: Todo
    onDelete : () => void
    isSelected : boolean
    onToggleSelect: (id: number) => void
}



function Todo({todo, onDelete, isSelected, onToggleSelect}:Props) {
  return (
    <div className="flex justify-between">
        <div className="flex gap-2 p-3">
            <input 
            type="checkbox"  
            className="checkbox checkbox-primary checkbox-sm " 
             checked={isSelected}
             onChange={()=>onToggleSelect(todo.id)}
             />
            <li  key={todo.id}>
            {todo.text}
            </li>
            <span 
        className={`badge badge-soft badge-sm ${todo.priority === 'Urgente' 
        ? 'badge-error' 
        : todo.priority === 'Moyenne' ? 'badge-warning'
        : 'badge-success'}`}>
            {todo.priority}
            </span>
        </div>
        <button
        className="btn btn-error btn-soft"
        onClick={onDelete}
       
        >
            <Trash className="w-4 h-4"/>
        </button>
    </div>
  )
}

export default Todo