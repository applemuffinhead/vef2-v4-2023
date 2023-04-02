import { BrowserRouter, Route, Routes } from "react-router-dom";
import Courses from "./components/Courses";
import Department from "./components/Department";
import Departments from "./components/Departments";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route
              path="/departments/:departmentSlug"
              element={<Department />}
            />
            <Route path="/" element={<Departments />} />
            <Route path="/departments/:slug/courses" element={<Courses />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
