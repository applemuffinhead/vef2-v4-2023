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
        setCourses([...courses, data]);
        e.target.reset();
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

  return (
    <div className="App">
      <h1>Courses</h1>
      <ul>
        {courses
          .filter((course) => course !== null)
          .map((course) => (
            <li key={course.id}>
              {course.courseId} - {course.title}
              {course.description && ` - ${course.description}`}
            </li>
          ))}
      </ul>

      <form onSubmit={handleNewCourse}>
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
        <button type="submit">Add Course</button>
      </form>

      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default Courses;
