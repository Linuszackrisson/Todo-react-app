// App.jsx
import React, { useState } from 'react';
import TodoItem from './TodoItem';
import './index.css';
import { useLocalStorage } from './useLocalStorage'; 

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []); 
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '' && selectedDate !== '') {
      const newTodo = {
        id: Date.now(),
        task: inputValue,
        date: selectedDate
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      setSelectedDate('');
    }
  };

  const handleDeleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const handleEditTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter todo"
          value={inputValue}
          onChange={handleInputChange}
        />
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => handleDeleteTodo(todo.id)}
            onEdit={(updatedTodo) => handleEditTodo(todo.id, updatedTodo)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
