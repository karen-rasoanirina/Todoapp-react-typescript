type Priority = "Urgente" | "Moyenne" | "Basse"

type Todo = {
  id: number,
  text: string,
  priority: Priority
}
type Props = {
    todo: Todo
}


function Todo({todo}:Props) {
  return (
    <li className="my-2 p-3" key={todo.id}>
        {todo.text}
    </li>
  )
}

export default Todo