import React, { useState } from "react";
import Courses from "./components/Courses";
import MainPage from "./components/MainPage";

function App() {
  const [selectedDepartmentSlug, setSelectedDepartmentSlug] = useState(null);

  const handleDepartmentClick = (slug) => {
    setSelectedDepartmentSlug(slug);
  };

  return (
    <div className="App">
      {selectedDepartmentSlug ? (
        <Courses
          departmentSlug={selectedDepartmentSlug}
          onBack={() => setSelectedDepartmentSlug(null)}
        />
      ) : (
        <MainPage onDepartmentClick={handleDepartmentClick} />
      )}
    </div>
  );
}

export default App;
