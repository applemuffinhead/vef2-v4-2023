import React, { useState } from "react";
import Courses from "./components/Courses";
import Departments from "./components/Departments";
import Layout from "./components/Layout";

function App() {
  const [selectedDepartmentSlug, setSelectedDepartmentSlug] = useState(null);

  const handleDepartmentClick = (slug) => {
    setSelectedDepartmentSlug(slug);
  };

  return (
    <Layout>
      {selectedDepartmentSlug ? (
        <Courses
          departmentSlug={selectedDepartmentSlug}
          onBack={() => setSelectedDepartmentSlug(null)}
        />
      ) : (
        <Departments onDepartmentClick={handleDepartmentClick} />
      )}
    </Layout>
  );
}

export default App;
