import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    return savedTodos || {};
  });
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  // 로컬 스토리지에 저장하기
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); //스토리지에 저장되게(남게하는 함수)
  }, [todos]);

  const addTodo = () => {
    if (input) {
      setTodos({ 
        ...todos,
        [selectedDate]: [...(todos[selectedDate] || []), { text: input, completed: false }]
      });
      setInput("");
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos[selectedDate].map((todo, todoIndex) =>
      todoIndex === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos({
      ...todos,
      [selectedDate]: updatedTodos
    });
  };

  const deleteTodo = (index) => {
    const newTodos = todos[selectedDate].filter((_, todoIndex) => todoIndex !== index);
    setTodos({
      ...todos,
      [selectedDate]: newTodos
    });
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditInput(todos[selectedDate][index].text);
  };

  const updateTodo = (index) => {
    const updatedTodos = todos[selectedDate].map((todo, todoIndex) =>
      todoIndex === index ? { ...todo, text: editInput } : todo
    );
    setTodos({
      ...todos,
      [selectedDate]: updatedTodos
    });
    setEditingIndex(null);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={addTodo}>추가</button>
      <ul>
        {(todos[selectedDate] || []).map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button onClick={() => updateTodo(index)}>저장하긩</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
                <button onClick={() => startEditing(index)}>수정</button>
                <button onClick={() => deleteTodo(index)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
