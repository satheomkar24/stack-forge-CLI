import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-primary-main d-flex align-items-center justify-content-center min-vh-100  p-2">
      <div className="text-center">
        <h1 className="primary-orange display-1 fw-bold">404</h1>
        <p className=" fs-2 fw-medium mt-4">Oops! Page not found</p>
        <p className="mt-4 mb-5">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          replace={true}
          className="btn btn-primary fw-semibold rounded-pill px-4 py-2 "
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
