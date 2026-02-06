import { useState } from "react";
import { FiAlignJustify, FiLogOut, FiUser } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import Logo from "../Logo";
import { CustomSwal } from "../../../utils/CustomSwal";
import { authService } from "../../../services/authService";
import useUserResolver from "../../../resolvers/userResolver";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

const navItems = [
  {
    url: "/about",
    label: "About",
  },
  {
    url: "/contact",
    label: "Contact",
  },
];

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { userData } = useUserResolver();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  authService.init(navigate, dispatch);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggleMobileNav = () => setMobileNav((prevState) => !prevState);

  const handleLogout = async () => {
    const result = await CustomSwal.fire({
      icon: "warning",
      title: "Are you sure you want to logout?",
      confirmButtonText: "Logout",
    });
    if (result.isConfirmed) {
      authService.logout();
    }
  };

  const navLinks = navItems.map((item, index) => (
    <NavItem className="me-4" key={index}>
      <NavLink to={item.url}>{item.label}</NavLink>
    </NavItem>
  ));

  return (
    <>
      <header className="container-fluid shadow py-2 position-sticky top-0 z-1 bg-white">
        <Navbar>
          <Logo />
          <Nav className="me-auto ms-5 d-none d-md-flex">{navLinks}</Nav>
          <Nav className="align-items-center gap-2">
            {user?.id ? (
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle
                  caret={false}
                  color="light"
                  tag="span"
                  className="cursor-pointer"
                >
                  <img
                    src={userData?.image || "/images/avatar.png"}
                    width={40}
                    height={40}
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.onerror = null;
                      img.src = "/images/avatar.png";
                    }}
                    className="rounded-circle bg-warning object-fit-cover"
                  />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className="d-flex align-items-center border-bottom"
                    tag={Link}
                    to="/profile"
                  >
                    <FiUser className="primary-orange me-2 fs-5" /> My Profile
                  </DropdownItem>
                  <DropdownItem
                    className="d-flex align-items-center"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="primary-orange me-2 fs-5" /> Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link to="/auth/login" className="btn btn-primary">
                Login
              </Link>
            )}
            <FiAlignJustify
              size={30}
              className="cursor-pointer d-block d-md-none"
              onClick={toggleMobileNav}
            />
          </Nav>
        </Navbar>
      </header>
      <div>
        <Offcanvas toggle={toggleMobileNav} isOpen={mobileNav}>
          <OffcanvasHeader toggle={toggleMobileNav}>
            <Logo />
          </OffcanvasHeader>
          <OffcanvasBody className="border-top">
            <Navbar>
              <Nav className="flex-column gap-3">{navLinks}</Nav>
            </Navbar>
          </OffcanvasBody>
        </Offcanvas>
      </div>
    </>
  );
};

export default Header;
