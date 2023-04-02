import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/Department.css";
import { generateApiUrl } from "../utils/generateApiUrl.js";
import Courses from "./Courses";
import Layout from "./Layout.js";

function Department() {
  const [department, setDepartment] = useState(null);
  const [showCourses, setShowCourses] = useState(false);
  const { departmentSlug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDepartment() {
      try {
        const response = await fetch(
          generateApiUrl(`/departments/${departmentSlug}`)
        );
        const data = await response.json();
        setDepartment(data);
      } catch (error) {
        console.error("Error fetching department:", error);
      }
    }

    fetchDepartment();
  }, [departmentSlug]);

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
        navigate("/");
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

  if (!department) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="layout-container">
        {showCourses ? (
          <Courses
            departmentSlug={department.slug}
            onBack={handleHideCourses}
          />
        ) : (
          <div className="department-container">
            <div className="department-details">
              <h1 className="department-title">{department.title}</h1>
              <p className="department-description">{department.description}</p>
            </div>
            <div className="department-buttons">
              <button onClick={handleShowCourses} className="sharedButton">
                Sýna Áfanga
              </button>
              <button onClick={deleteDepartment} className="sharedButton">
                Eyða deild
              </button>
              <Link to="/" className="sharedButton backButton">
                Til baka
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Department;
