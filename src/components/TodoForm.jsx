import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!todo.trim()) return;

        // Unique ID ke sath context me data bhejna professional approach hai
        addTodo({ id: Date.now(), todo: todo.trim(), completed: false });
        setTodo("");
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex items-center gap-2 p-2 bg-emerald-50/40 rounded-2xl backdrop-blur-md shadow-sm border border-emerald-100/80"
            style={{ fontFamily: "'Quicksand', 'Nunito', sans-serif" }} // Cute & clean font
        >
            <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="🌿 Add a new task..."
                className="w-full bg-white/90 text-slate-700 placeholder-emerald-300/90 rounded-xl px-4 py-2.5 outline-none border border-emerald-100 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-sm font-medium"
            />
            
            <button 
                type="submit" 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-100 hover:shadow-xl hover:shadow-emerald-200/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm cursor-pointer whitespace-nowrap"
            >
                ✨ Add Task
            </button>
        </form>
    );
}

export default TodoForm;