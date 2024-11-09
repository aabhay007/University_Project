import React, { useEffect, useState } from "react";
import ROUTES from "../navigations/Routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { FontAwesomeIcon } from "react-fontawesome";
import 'primeicons/primeicons.css';
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Header() {
  const [user, setUser] = useState({ id: null, role: null });
  const navigate = useNavigate();
  
  useEffect(() => {
    let id = localStorage.getItem("id");
    let role = localStorage.getItem("role");
    if (id) setUser({ id: id, role: role });
  }, []);

  const queryParam = useQuery();
  const [userData, setUserData] = useState({
    name: queryParam.get("username"),
    image: queryParam.get("picture"),
  });

  const token = sessionStorage.getItem("token");

  function renderMenu() {
    if (user?.role === "admin") {
      return (
        
        <ul className="navbar-nav mr-auto">
           <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.home.name}>
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.universityAdmin.name}>
              University Management
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to={ROUTES.home.name}>
              User Management
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.about.name}>
              order Management
            </Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.cart.name}>
              {/* <FaShoppingCart/>&nbsp; */}
              {/* <FontAwesomeIcon icon={FaShoppingCart} /> */}
<i className="pi pi-shopping-cart " style={{ fontSize: '2rem' }}></i>
            
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.home.name}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.register.name}>
              Register
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to={ROUTES.about.name}>
              About
            </Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.cart.name}>
              {/* <FontAwesomeIcon icon={FaShoppingCart} /> cart */}
              <FaShoppingCart/>
            </Link>
          </li>
        </ul>
      );
    }
  }

  const handleLogout = async () => {
    setUserData({}); // Clear user data
    sessionStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    try {
      await axios.get("http://localhost:8085/logout"); // Logout on the server
      window.location.href = "http://localhost:8085/logout";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {renderMenu()}
        {userData.name || (user.role) ? (
          <button className="btn btn-danger col-2" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link className="nav-link ml-auto" to="/login">
            <button className="btn btn-success">Login</button>
          </Link>
        )}
        {userData.name && (
          <>
            <span className="ml-2">{userData.name}</span>
            <span>
              <img
                src={userData.image}
                alt="User"
                style={{ borderRadius: "50%", marginLeft: "10px", width: "40px", height: "40px" }}
              />
            </span>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
