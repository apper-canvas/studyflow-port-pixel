import { ToastContainer } from "react-toastify";
import { router } from "@/router/index";
import React from "react";
import Grades from "@/components/pages/Grades";
import Dashboard from "@/components/pages/Dashboard";
import Courses from "@/components/pages/Courses";
import Assignments from "@/components/pages/Assignments";
import Calendar from "@/components/pages/Calendar";
import Layout from "@/components/organisms/Layout";

// Export router for main.jsx
export { router };

// App component for potential future use

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-[9999]"
      />
    </div>
  );
}

export default App;