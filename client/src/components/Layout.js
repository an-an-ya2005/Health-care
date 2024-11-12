import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // Doctor-specific menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  // Decide which menu to render based on user role
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6 className="text-light">SMART APPOINTMENT</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={menu.path}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className="menu-item logout" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Left - Notification */}
                <Badge
                  count={user?.notifcation?.length || 0}
                  onClick={() => {
                    navigate("/notification");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa-solid fa-bell" style={{ fontSize: "1.2rem" }}></i>
                </Badge>

                {/* Center - Slogan */}
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                    textTransform: "uppercase",
                  }}
                >
                  "Your Health, Our Priority-Book with Ease"
                </div>

                {/* Right - User Info */}
                <div>
                  <Link to="/profile" style={{ fontSize: "16px" }}>
                    {user?.name || "User"}
                  </Link>
                </div>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
