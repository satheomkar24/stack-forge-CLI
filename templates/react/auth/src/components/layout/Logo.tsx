import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <div className="d-flex gap-2 align-items-center">
        <img src="/images/company.png" alt="" height={30} />
        <h3 className="primary-orange mb-0">StackBoot</h3>
      </div>
    </Link>
  );
};

export default Logo;
