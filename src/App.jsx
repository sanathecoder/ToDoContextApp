import { useEffect, useState } from 'react';
import { TodoProvider } from './contexts';
import TodoForm from './components/TodoForm';
import Todoitem from './components/Todoitem';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    // Note: Form me humne id generate ki thi, yahan fallback rakha h taaki duplicate na ho
    setTodos((prev) => [{ id: todo.id || Date.now(), ...todo }, ...prev]);
  };

  const updatedTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? todo : prevTodo));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    );
  };

  // LocalStorage check for items
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

 return (
    <TodoProvider value={{ todos, addTodo, updatedTodo, deleteTodo, toggleComplete }}>
      {/* 🌿 Light, Soothing & Premium Mint-Sage Background Gradient */}
      <div 
        className="bg-gradient-to-tr from-[#f2f9f5] via-[#eef7f2] to-[#e6f4ed] min-h-screen py-12 px-4 flex items-start justify-center"
        style={{ fontFamily: "'Quicksand', 'Nunito', sans-serif" }}
      >
        {/* Main Card Container */}
        <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl border border-emerald-100/80 shadow-xl shadow-emerald-900/5 rounded-3xl p-6 md:p-8 transition-all duration-300">
          
          {/* Header Section */}
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent flex items-center justify-center gap-2 tracking-tight">
              🌱 Todo List
            </h1>
            <p className="text-slate-400 text-xs mt-1 font-medium tracking-wide uppercase">
              Manage your daily tasks Here
            </p>
          </header>

          {/* Form Input Container */}
          <div className="mb-6">
            <TodoForm />
          </div>

          {/* Todo List Area */}
          <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1 scrollbar-thin">
            {todos.length === 0 ? (
              // Empty State (Jab koi task na ho)
              <div className="text-center py-10 border border-dashed border-emerald-100 rounded-2xl bg-white/50">
                <span className="text-2xl">✨</span>
                <p className="text-sm text-slate-400 font-medium mt-1">All caught up! Add a task to start.</p>
              </div>
            ) : (
              // Loop and render tasks
              todos.map((todo) => (
                <div key={todo.id} className="w-full transform hover:scale-[1.005] transition-transform duration-200">
                  <Todoitem todo={todo} />
                </div>
              ))
            )}
          </div>

          {/* Footer Stats Counter */}
          {todos.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-slate-400">
              <span>Total: {todos.length} {todos.length === 1 ? 'task' : 'tasks'}</span>
              <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Done: {todos.filter(t => t.completed).length}
              </span>
            </div>
          )}

        </div>
      </div>
    </TodoProvider>
  );
}

export default App;