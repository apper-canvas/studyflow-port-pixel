import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "@/layouts/Root";
import Button from "@/components/atoms/Button";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

const LogoutButton = () => {
  const { logout } = useAuth();
  
  return (
    <Button
      variant="outline"
      size="sm"
      icon="LogOut"
      onClick={logout}
    >
      Logout
    </Button>
  );
};
const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // App-level state and methods that can be shared via outlet context
  const outletContext = {
    sidebarOpen,
    setSidebarOpen,
    // Add other app-level state and methods here as needed
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main content */}
      <div className="lg:pl-64">
<Header 
          title="StudyFlow"
          onMenuClick={() => setSidebarOpen(true)}
        >
          <LogoutButton />
        </Header>
        
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <Outlet context={outletContext} />
        </main>
      </div>

      {/* Toast notifications */}
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
};

export default Layout;