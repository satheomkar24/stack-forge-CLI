import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-primary-main">
      <div className="container py-4 d-flex flex-column justify-content-center align-items-center gap-3 ">
        <Logo />
        <p className="mb-0">
          &copy; {new Date().getFullYear()} StackBoot CLI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
