import { useState } from "react";
import "./CreateTodo.css";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todoAdded, setTodoAdded] = useState(""); // State for success message

    const handleChange = async () => {
        try {
            const response = await fetch("http://localhost:3005/todo/add", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "authorization":"Bearer" + " " + localStorage.getItem("token")
                },
            });

            if (response.ok) {
                setTodoAdded("Todo Added"); // Set success message
                setTitle(""); // Clear input fields
                setDescription("");
            } else {
                setTodoAdded("Failed to add todo[Empty Input]");
            }
        } catch (error) {
            console.error("Error adding todo:", error);
            setTodoAdded("An error occurred");
        }
    };

    // Clear the success message when input changes
    const handleInputChange = (e, setter) => {
        setter(e.target.value);
        setTodoAdded(""); // Clear the message when typing
    };

    return (
        <div className="Main">
            <h1 className="header">Todo List</h1>
            <input
                className="create-title"
                id="title"
                type="text"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => handleInputChange(e, setTitle)}
            />
            <br />
            <br />
            <input
                className="create-description"
                id="description"
                type="text"
                placeholder="Enter the Description"
                value={description}
                onChange={(e) => handleInputChange(e, setDescription)}
            />
            <br />
            <br />
            <button className="button" onClick={handleChange}>
                Add todo
            </button>
            {todoAdded && <h3 style={{ textAlign: "center" }}>{todoAdded}</h3>}
        </div>
    );
}
