import React, { useState, useRef, useEffect } from 'react';
import TodoList from "./TodoList"
import {v4 as uuid} from 'uuid';
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function TodoForm() {
    const [todos, setTodos] = useState([]);    
    const todoNameRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])
    // anytime anything changes in this array
    // we want to run useEffect();
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id){
        const newTodos =[...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function handleAddTodo(e) {
        const name = todoNameRef.current.value
        let createId = uuid();
        if (name === '') return
        setTodos(prevTodos => {
          return [...prevTodos, { id: createId, name: name, complete: false}]
        })
        todoNameRef.current.value = null
      }
    function handleClearTodos(e){
        const newTodos = todos.filter(todo => !todo.complete);
        setTodos(newTodos)
    }

  return (
    <div className='container '>
        <div className="block">
            <h1 className="is-size-1">You have {todos.filter(todo => !todo.complete).length} left</h1>
            <input className="input" placeholder="todo" ref={todoNameRef} type="text" />
            
            <div className="buttons is-right">    
                <button className="button" onClick={handleAddTodo}>Add +</button>
                <button className="button" onClick={handleClearTodos}>Clear Completed</button>    
            </div>
        </div>

        <TodoList todos={todos} toggleTodo={toggleTodo}/>
    </div>
  )
}

export default TodoForm