'use client';

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";



export default function TaskCard({ task, onDelete, onUpdate }) {

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    date: task.date || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(task.id, form);
    setEditMode(false);
  };
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 max-w-2xl mx-auto mt-4 cursor-pointer hover:bg-gray-50">

      {editMode ? (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-black">Edit Task</h2>
            <form onSubmit={handleUpdate} className="space-y-2">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
                placeholder="Title"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
                placeholder="Description"
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
                placeholder="Status"
              >
                <option>In Progress</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              />
              
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:scale-105 transition "
              >
                Save
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:scale-105 transition m-2"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start ">
          <div>
            <h3 className="text-xl font-semibold text-black">{task.title}</h3>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-sm rounded mt-1 inline-block">
              {task.status}
            </span>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <p className="text-gray-600 mt-2">{task.date}</p>
          </div>
          <div className="flex gap-3 mt-1">
            <Pencil
              className="text-blue-500 cursor-pointer hover:scale-110 transition"
              onClick={() => setEditMode(true)}
            />
            <Trash2
              className="text-red-500 cursor-pointer hover:scale-110 transition"
              onClick={() => onDelete(task.id)}
            />
          </div>
        </div>

      )}
    </div>
  
  );
}
