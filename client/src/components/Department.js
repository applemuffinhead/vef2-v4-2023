import React, { useState } from "react";
import { generateApiUrl } from "../utils/generateApiUrl.js";
import Button from "./Button.js";
import Courses from "./Courses";
import Layout from "./Layout.js";

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
    <Layout>
      {showCourses ? (
        <Courses departmentSlug={department.slug} onBack={handleHideCourses} />
      ) : (
        <>
          <h1>{department.title}</h1>
          <p>{department.description}</p>
          <Button onClick={handleShowCourses}>Show Courses</Button>
          <Button onClick={deleteDepartment}>Delete Department</Button>
          <Button onClick={() => setCurrentDepartment(null)}>Go Back</Button>
        </>
      )}
    </Layout>
  );
}

export default Department;
