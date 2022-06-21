import React from 'react'

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
  return (

    <div className='box'>
        <label className='checkoxes'>
            <input 
            type="checkbox"
            className='checkbox'
            checked={todo.complete} 
            onChange={handleTodoClick}
            />
             {todo.name}  
        </label>
  
    </div>
    
  )
}
