import React, { useState } from "react";
import { generateApiUrl } from "../utils/generateApiUrl.js";
import Courses from "./Courses";

function Department({ department, setCurrentDepartment, onDelete }) {
  const [showCourses, setShowCourses] = useState(false);

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
        onDelete(department.slug);
      } else {
        alert("Error deleting department.");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handleShowCourses = () => {
    setShowCourses(true);
  };

  const handleHideCourses = () => {
    setShowCourses(false);
  };

  return (
    <div>
      {showCourses ? (
        <Courses departmentSlug={department.slug} onBack={handleHideCourses} />
      ) : (
        <>
          <h1>{department.title}</h1>
          <p>{department.description}</p>
          <button onClick={handleShowCourses}>Show Courses</button>
          <button onClick={deleteDepartment}>Delete Department</button>
          <button onClick={() => setCurrentDepartment(null)}>Go Back</button>
        </>
      )}
    </div>
  );
}

export default Department;
