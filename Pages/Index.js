'use client';


import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import client from "../lib/client";
import { GET_TASKS } from "../app/query";
import { ADD_TASK, DELETE_TASK, UPDATE_TASK } from "../app/mutaion";
import TaskCard from "../componenets/Task";
import Tabs from "../componenets/Tabs";
import Header from "../componenets/Header";

export default function Home() {
  const [activeTab, setActiveTab] = useState("All")
  const { data, loading, error, refetch } = useQuery(GET_TASKS, { client });
  const [addTask] = useMutation(ADD_TASK, { client });
  const [deleteTask] = useMutation(DELETE_TASK, { client });
  const [updateTask] = useMutation(UPDATE_TASK, { client });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", status: "In Progress", date: "" });

  const handleCreate = async () => {
    await addTask({ variables: formData });
    refetch();
    setFormData({ title: "", description: "", status: "In Progress", date: "" });
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    await deleteTask({ variables: { id } });
    refetch();
    console.log(id);

  };

  const handleUpdate = async (id, updatedData) => {
    await updateTask({ variables: { id, ...updatedData } });
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching tasks.</p>;
  const tasks = data?.getTask || [];
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-black">Task Manager</h1>
      
      <div className="flex justify-between mb-4">
        <Header activeTab={activeTab} />
         <div className="flex mb-4">
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + New Task
        </button>
        </div>
      </div>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      {tasks
        .filter((task) => activeTab === "All" || task.status === activeTab)
        .map((task) => (
          <TaskCard key={task.id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-black">Create Task</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full border px-3 py-2 rounded mb-3 text-black"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="w-full border px-3 py-2 rounded mb-3 text-black"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <select
              className="w-full border px-3 py-2 rounded mb-4 text-black"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option>In Progress</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded mb-3 text-black"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:scale-105 transition">Cancel</button>
              <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:scale-105 transition">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
