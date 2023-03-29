import React, { useCallback, useEffect, useState } from "react";
import { generateApiUrl } from "../utils/generateApiUrl.js";

function Courses({ departmentSlug, onBack }) {
  const [courses, setCourses] = useState([]);

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
          title: e.target.elements.title.value,
        }),
      };

      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      console.log("New course:", data);
      setCourses([...courses, data]);
      e.target.reset();
    } catch (error) {
      console.error("Error creating new course:", error);
    }
  };

  return (
    <div className="App">
      <h1>Courses</h1>
      <ul>
        {courses.map((course, index) => (
          <li key={course.id}>
            {course.title}
            {course.description && ` - ${course.description}`}
            {index < courses.length - 1 && " - "}
          </li>
        ))}
      </ul>
      <form onSubmit={handleNewCourse}>
        <input type="text" name="title" placeholder="Course Title" />
        <button type="submit">Add Course</button>
      </form>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default Courses;
