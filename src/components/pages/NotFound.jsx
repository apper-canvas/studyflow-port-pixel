import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-2">
          <ApperIcon name="AlertTriangle" size={64} className="text-warning-500 mx-auto" />
          <h1 className="text-4xl font-bold text-gray-900">404</h1>
          <h2 className="text-xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full">
              <ApperIcon name="Home" size={16} className="mr-2" />
              Go to Dashboard
            </Button>
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/courses" className="flex-1">
              <Button variant="outline" className="w-full">
                <ApperIcon name="BookOpen" size={16} className="mr-2" />
                Courses
              </Button>
            </Link>
            <Link to="/assignments" className="flex-1">
              <Button variant="outline" className="w-full">
                <ApperIcon name="FileText" size={16} className="mr-2" />
                Assignments
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;