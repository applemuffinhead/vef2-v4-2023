import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Button.css";
import "../styles/Courses.css";
import "../styles/Form.css";
import { generateApiUrl } from "../utils/generateApiUrl.js";
import Button from "./Button.js";
import Form from "./Form.js";
import Layout from "./Layout.js";

function Courses({ departmentSlug, onBack }) {
  const [courses, setCourses] = useState([]);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const fetchCourses = useCallback(async () => {
    try {
      const url = generateApiUrl(`/departments/${departmentSlug}/courses`);
      const response = await fetch(url);
      const data = await response.json();
      console.log("Courses:", data);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, [departmentSlug]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleDeleteCourse = async (courseId) => {
    try {
      const apiUrl = generateApiUrl(
        `/departments/${departmentSlug}/courses/${courseId}`
      );
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(apiUrl, requestOptions);

      if (response.ok) {
        console.log("Course deleted:", courseId);
        setCourses(courses.filter((course) => course.courseId !== courseId));
      } else {
        const data = await response.json();
        console.error("Error deleting course:", data.errors);
        alert(
          "Error deleting course: " +
            data.errors.map((error) => error.msg).join(", ")
        );
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Error deleting course: " + error.message);
    }
  };

  const handleNewCourse = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = generateApiUrl(`/departments/${departmentSlug}/courses`);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: e.target.elements.courseId.value || "0000",
          title: e.target.elements.title.value,
          units: parseFloat(e.target.elements.units.value) || 0.5,
          semester: e.target.elements.semester.value || "Vor",
          level: e.target.elements.level.value || null,
          url:
            e.target.elements.url.value.trim().replace(/^https?:\/\//, "") ||
            null,
        }),
      };

      const response = await fetch(apiUrl, requestOptions);

      const data = await response.json();

      if (response.ok) {
        console.log("New course:", data);
        e.target.reset();
        fetchCourses(); // Refetch courses after adding a new course
      } else {
        console.error("Error creating new course:", data.errors);
        alert(
          "Error creating new course: " +
            data.errors.map((error) => error.msg).join(", ")
        );
      }
    } catch (error) {
      console.error("Error creating new course:", error);
      alert("Error creating new course: " + error.message);
    }
  };

  const toggleDeleteButtons = () => {
    setShowDeleteButtons(!showDeleteButtons);
  };

  return (
    <Layout className="App">
      <div className="layout-container">
        <h1 className="coursesTitle">Áfangar</h1>
        <div className="course-list-container">
          <ul className="course-list">
            {courses
              .filter((course) => course !== null)
              .map((course) => (
                <li key={course.id} className="course-item">
                  <div className="course-title">{course.title}</div>
                  <div className="course-code">{course.courseId}</div>
                  <div className="course-details">
                    <div className="course-units">{course.units} units</div>
                    <div className="course-semester">{course.semester}</div>
                    <div className="course-level">{course.level}</div>
                    <div className="course-url">
                      {course.url && (
                        <a href={course.url} target="_blank" rel="noreferrer">
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                  {showDeleteButtons && (
                    <Button
                      onClick={() => handleDeleteCourse(course.courseId)}
                      className="deleteBtn"
                    >
                      Delete
                    </Button>
                  )}
                </li>
              ))}
          </ul>
        </div>
        <div className="form-wrapper">
          <Form onSubmit={handleNewCourse}>
            <div className="form-row">
              <input type="text" name="courseId" placeholder="Númer" />
              <input type="text" name="title" placeholder="Heiti" required />
              <input
                type="number"
                name="units"
                placeholder="Einingar"
                step="0.5"
                min="0.5"
                max="100"
                className="course-input"
              />
              <select
                name="semester"
                defaultValue="Vor"
                className="course-input"
              >
                <option value="" disabled selected hidden>
                  Kennslumisseri
                </option>
                <option value="Vor">Vor</option>
                <option value="Sumar">Sumar</option>
                <option value="Haust">Haust</option>
                <option value="Heilsárs">Heilsárs</option>
              </select>
              <input type="text" name="level" placeholder="Stig" />
              <input
                type="text"
                name="url"
                placeholder="Hlekkur"
                className="url-input-courses"
              />
            </div>
            <Button className="sharedButton" type="submit">
              Bæta við áfanga
            </Button>
          </Form>
        </div>
        <Button onClick={toggleDeleteButtons} className="sharedButton">
          Toggle Delete
        </Button>
        <Link to="/" className="sharedButton backButton">
          Til baka
        </Link>
      </div>
    </Layout>
  );
}

export default Courses;
