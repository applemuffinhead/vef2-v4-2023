import React, { useEffect, useState } from "react";
import { generateApiUrl } from "../utils/generateApiUrl.js";

function MainPage({ onDepartmentClick }) {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({
    title: "",
    description: "",
  });

  async function fetchDepartments() {
    try {
      const url = generateApiUrl("/departments");
      const response = await fetch(url);
      const data = await response.json();
      console.log("All Departments:", data);
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  }

  useEffect(() => {
    fetchDepartments();
  }, []);

  async function handleNewDepartment(e) {
    e.preventDefault();
    try {
      const apiUrl = generateApiUrl("/departments");
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newDepartment.title,
          description: newDepartment.description,
        }),
      };

      console.log("API Request Info:", {
        url: apiUrl,
        requestOptions,
      });

      const response = await fetch(apiUrl, requestOptions);

      const data = await response.json();
      console.log("New department:", data);
      setDepartments([...departments, data]);
      setNewDepartment({ title: "", description: "" });
    } catch (error) {
      console.error("Error creating new department:", error);
    }
  }

  return (
    <div className="App">
      <h1>Departments</h1>
      <ul>
        {departments.map((department) => (
          <li key={department.id}>
            <button onClick={() => onDepartmentClick(department.slug)}>
              {department.title}
            </button>{" "}
            - {department.description}
          </li>
        ))}
      </ul>
      <form onSubmit={handleNewDepartment}>
        <input
          type="text"
          value={newDepartment.title}
          onChange={(e) =>
            setNewDepartment({ ...newDepartment, title: e.target.value })
          }
          placeholder="New department name"
        />
        <input
          type="text"
          value={newDepartment.description}
          onChange={(e) =>
            setNewDepartment({
              ...newDepartment,
              description: e.target.value,
            })
          }
          placeholder="New department description"
        />
        <button type="submit">Add Department</button>
      </form>
    </div>
  );
}

export default MainPage;
