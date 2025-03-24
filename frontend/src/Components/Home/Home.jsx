//import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
 
import "./Home.css"

export function Home()
{
    //const navigate = useNavigate();
    return (
        <>
          <div className="container">
            <nav >
                <ul style={
                    {display:"flex",
                    flexDirection:"row",
                    marginLeft:"120vh",marginRight:"10vh",justifyContent:"space-between",
                    marginTop:"5vh",fontFamily:"sans-serif",
                    listStyle:"none",
                    paddingLeft:"8vh"

                    }}>
                    <li >
                         <Link to="/" className="nav-link"  style={{textDecoration:"none",color:"black"}}>Home</Link>
                    </li>
                    <li><Link to="/createTodo" className="nav-link" style={{textDecoration:"none",color:"black"}}>CreateTodo </Link></li>
                    <li><Link to="/todos" className="nav-link" style={{textDecoration:"none",color:"black"}}>Todos</Link></li>
                    <li><Link to="/register" className="nav-link" style={{textDecoration:"none",color:"black"}}>Register</Link></li>
                    <li><Link to="/login" className="nav-link" style={{textDecoration:"none",color:"black"  }}>Login</Link></li>
                </ul>
            </nav>

            <main>
                <h1>Welcome to Todo App </h1>
            </main>
          </div>
        </>
    )
}