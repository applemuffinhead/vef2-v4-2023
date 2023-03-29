import React, { useEffect, useState } from 'react';
import { generateApiUrl } from './utils/generateApiUrl.js';


function App() {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({
    title: '',
    description: '',
  });
  console.log(process.env);
  async function fetchDepartments() {
    try {
      const url = generateApiUrl('/departments');
      const response = await fetch(url);
      const data = await response.json();
      console.log('All Departments:', data); 
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  }

  useEffect(() => {
    fetchDepartments();
  }, []);

  async function handleNewDepartment(e) {
    e.preventDefault();
    try {
      const response = await fetch(generateApiUrl('/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newDepartment.title,
          description: newDepartment.description,
        }),
      }));
  
      const data = await response.json();
      setDepartments([...departments, data]);
      setNewDepartment({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating new department:', error);
    }
  }
  

  return (
    <div className="App">
      <h1>Departments</h1>
      <ul>
        {departments.map((department) => (
          <li key={department.id}>
            {department.title} - {department.description}
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

export default App;
