import React from "react";
import { generateApiUrl } from "../utils/generateApiUrl.js";

function Department({ department, setCurrentDepartment }) {
  const deleteDepartment = async () => {
    try {
      const response = await fetch(
        generateApiUrl(`/departments/${department.slug}`),
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Department deleted successfully.");
        setCurrentDepartment(null);
      } else {
        alert("Error deleting department.");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <div>
      <h1>{department.title}</h1>
      <p>{department.description}</p>
      <button onClick={deleteDepartment}>Delete Department</button>
      <button onClick={() => setCurrentDepartment(null)}>Go Back</button>
    </div>
  );
}

export default Department;
