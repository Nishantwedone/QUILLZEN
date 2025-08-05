import React, { useContext, useState } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios"

const Home = () => {
  const { user } = useContext(UserContext);
  const [ isModalOpen , setIsModalOpen ] = useState(false);
  const [ projectName, setProjectName ] = useState(null);

  function createProject(e){
    e.preventDefault();
    console.log(projectName);

    axios.post("/projects/create", {
      name: projectName,
    })
    .then((res) => {
      console.log("Project created successfully:", res.data);
      setIsModalOpen(false);
    })
    .catch((err) => {
      console.log(err)
    });
  }

  return (
    <main className="p-4">
      <div className="projects">
        <button
          onClick={() => setIsModalOpen(true)}
          className="project p-4 border border-slate-300 rounded-md">
            New Project
          <i className="ri-link ml-2"></i>
        </button>
      </div>

    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            onClick={() => setIsModalOpen(false)}
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
          <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
          <form onSubmit={createProject}>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              onChange={(e) => setProjectName(e.target.value)}
              value={projectName}
              type="text"
              name="projectName"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project name"
              required
            />
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-2 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    

    </main>
  );
};

export default Home;
