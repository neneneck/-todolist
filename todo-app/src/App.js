import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]); // 할 일 목록을 저장할 상태
  const [input, setInput] = useState(""); // 입력창의 상태

  // 할 일 추가 함수
  const addTodo = () => {
    if (input) {
      setTodos([...todos, input]); // 입력값을 할 일 목록에 추가
      setInput(""); // 입력창 초기화
    }
  };

  // 할 일 삭제 함수
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index); // 해당 인덱스를 제외한 할 일 목록
    setTodos(newTodos); // 새로운 할 일 목록으로 업데이트
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)} // 입력값을 상태로 저장
        placeholder="할 일을 입력하세요"
      />
      <button onClick={addTodo}>추가</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo} <button onClick={() => deleteTodo(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
