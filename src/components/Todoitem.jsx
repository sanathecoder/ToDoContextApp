import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function Todoitem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updatedTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    if (!todoMsg.trim()) return; // Khali input save hone se rokne ke liye
    updatedTodo(todo.id, { ...todo, todo: todoMsg.trim() });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center gap-x-3 px-4 py-3 rounded-2xl border transition-all duration-300 shadow-sm ${
        todo.completed
          ? "bg-emerald-50/70 border-emerald-100 opacity-75"
          : "bg-white border-slate-100 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50"
      }`}
      style={{ fontFamily: "'Quicksand', 'Nunito', sans-serif" }}
    >
      {/* Custom Styled Checkbox */}
      <input
        type="checkbox"
        className="w-4 h-4 rounded-md accent-emerald-500 cursor-pointer text-emerald-600 focus:ring-emerald-400 transition-all duration-200"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {/* Todo Text Input */}
      <input
        type="text"
        className={`w-full bg-transparent outline-none text-sm font-medium transition-all duration-200 ${
          isTodoEditable 
            ? "text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:border-emerald-300" 
            : "text-slate-600 border-transparent"
        } ${todo.completed ? "line-through text-slate-400 font-normal" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
        onKeyDown={(e) => e.key === 'Enter' && editTodo()} // Enter dabane par bhi save ho jaye
      />

      {/* Actions Container */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Edit / Save Button */}
        <button
          className={`inline-flex w-8 h-8 rounded-xl text-sm font-medium justify-center items-center transition-all duration-200 border transform active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${
            isTodoEditable
              ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-100 hover:bg-emerald-600"
              : "bg-slate-50 border-slate-200/60 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100"
          }`}
          onClick={() => {
            if (todo.completed) return;
            if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.completed}
          title={isTodoEditable ? "Save" : "Edit"}
        >
          {isTodoEditable ? "✓" : "✎"}
        </button>

        {/* Delete Button */}
        <button
          className="inline-flex w-8 h-8 rounded-xl text-sm justify-center items-center bg-slate-50 border border-slate-200/60 text-slate-400 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all duration-200 transform active:scale-95"
          onClick={() => deleteTodo(todo.id)}
          title="Delete"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Todoitem;