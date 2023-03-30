import React, { useCallback, useEffect, useState } from "react";
import { generateApiUrl } from "../utils/generateApiUrl.js";
import Button from "./Button";
import Form from "./Form";
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
      <h1>Courses</h1>
      <ul>
        {courses
          .filter((course) => course !== null)
          .map((course) => (
            <li key={course.id}>
              {course.courseId} - {course.title} - {course.units} units -{" "}
              {course.semester}
              {course.description && ` - ${course.description}`}
              {showDeleteButtons && (
                <Button onClick={() => handleDeleteCourse(course.courseId)}>
                  Delete
                </Button>
              )}
            </li>
          ))}
      </ul>

      <Form onSubmit={handleNewCourse}>
        <input type="text" name="courseId" placeholder="Course ID" />
        <input type="text" name="title" placeholder="Course Title" required />
        <input
          type="number"
          name="units"
          placeholder="Units"
          step="0.5"
          min="0.5"
          max="100"
        />
        <select name="semester" defaultValue="Vor">
          <option value="Vor">Vor</option>
          <option value="Sumar">Sumar</option>
          <option value="Haust">Haust</option>
          <option value="Heilsárs">Heilsárs</option>
        </select>
        <Button type="submit">Add Course</Button>
      </Form>
      <Button onClick={toggleDeleteButtons}>Toggle Delete</Button>
      <Button onClick={onBack}>Back</Button>
    </Layout>
  );
}

export default Courses;
