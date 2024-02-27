import React, { useState, useEffect } from "react";
import "./App.css";
const App = () => {
    const [todos, setTodos] = useState([]);
    const [todoEditing, setTodoEditing] = useState(null);

    //Use Effects
    useEffect(() => {
        const loadedTodos = JSON.parse(localStorage.getItem("todos"));
        if (loadedTodos) {
            setTodos(loadedTodos);
        }
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            const json = JSON.stringify(todos);
            localStorage.setItem("todos", json);
        }
    }, [todos]);

    // Add the handlesubmit code here
    const handleSubmit = (e) => {
        e.preventDefault();

        const todo = document.getElementById('todoAdd').value;
        const newTodo = {
            id: new Date().getTime(),
            text: todo.trim(),
            completed: false
        };
        if (newTodo.text.length > 0) {
            setTodos([...todos].concat(newTodo));
        } else {
            alert("Enter a valid Task")
        }
        document.getElementById('todoAdd').value = '';
    }


    // Add the deleteToDo code here
    function deleteTodo(id) {
        const updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    // Add the toggleComplete code here
    function toggleComplete(id) {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        })
        setTodos(updatedTodos)
    }

    // Add the submitEdits code here
    function submitEdits(newtodo) {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === newtodo.id) {
                todo.text = document.getElementById(newtodo.id).value;
            }
            return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
    }
    // Delete Completed Tasks
    function deleteCompleted() {
        const uncompletedTodos = [...todos].filter((todo) => !todo.completed)
        setTodos(uncompletedTodos);
    }

    return (<div id="todo-list">
        <h1>Zeraf</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id='todoAdd'
            />
            <button type="submit">Add Todo</button>
        </form>
        {[...todos].map((todo) => (

            <div key={todo.id} className="todo">
                <div className="todo-text">
                    {/* Add checkbox for toggle comp~~~~lete */}
                    <input
                        type="checkbox"
                        id="completed"
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                    />
                    {/* if it is edit mode, display input box, else display text */}
                    {todo.id === todoEditing ?
                        (<input
                            type="text"
                            id={todo.id}
                            defaultValue={todo.text}
                        />) :
                        (<div>{todo.text}</div>)
                    }
                </div>
                <div className="todo-actions">
                    {/* if it is edit mode, allow submit edit, else allow edit */}
                    {todo.id === todoEditing ?
                        (
                            <button onClick={() => submitEdits(todo)}>Submit Edits</button>
                        ) :
                        (
                            <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                        )}

                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
            </div>
        ))}

        <div className="competed-btn-div">
            <button className="completedBtn" onClick={() => deleteCompleted()}>Delete Completed Tasks</button>
        </div>
    </div>);
};
export default App;
