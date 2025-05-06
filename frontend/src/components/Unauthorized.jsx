import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Unauthorized = () => {
  return (
    <div className="h-screen grid place-content-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>
        <div className="space-x-4">
          <Button asChild variant="outline">
            <Link to="/">Go Home</Link>
          </Button>
          <Button asChild>
            <Link to="/login">Login with Different Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
