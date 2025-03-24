/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
import "./Todos.css"
export function Todos({ todos }) {

  const handleCompleteClick = async (id) => {
    console.log(id);
    try {
      const response = await fetch("http://localhost:3000/completed", {
        method: "PUT",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          "Content-Type": "application/json",
          "authorization":"Bearer" + " "+localStorage.getItem("token")
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data.msg);
      
    } catch (err) {
      console.log(err);
    }
  };
  //const [todoss,setTodo] =useState([])
  return (
    <div>
      <h2 className="title"> Todos</h2>
      {todos.map((todo, index) => (
        <div key={todo._id || index}>
          <h2  className="h2"  >{todo.title}</h2>
          <h3 className="h3"  >{todo.description}</h3>
          <button className="btn"    onClick={() => handleCompleteClick(todo._id)}>
            {todo.completed ? "Completed" : "Mark as completed"}
          </button>
        </div>
      ))}
    </div>
  );
}
