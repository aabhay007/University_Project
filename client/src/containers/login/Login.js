import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
//import Header from "../../components/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8085/login", {
        email,
        password,
   });
   if (response.data) {
    localStorage.setItem("id", response.data.id);
    localStorage.setItem("role", response.data.role);
  } else {
    console.error("Response data is undefined:", response);
  }
      

      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

    //  console.log(response);
      const authorization = "Bearer " + response.data.token;
sessionStorage.setItem("token", authorization);

axios.post("http://localhost:8085/verify", {}, {
  headers: {
    Authorization: authorization
  }
  
})
.then(response => {
 
  console.log(response);

  
})
.catch(error => {
 console.log(error);
});

      toast("Successfully logged in!")
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome To The Home Page",
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <ToastContainer/>
      {/* <Header /> */}
      <div className="myContainer">
        <h2 className="text-center text-success mt-3">Login Form</h2>

        <form onSubmit={handleLogin}>
          <div className="imgcontainer">
            <img src="img_avatar2.png" alt="Avatar" className="avatar" />
          </div>

          <div className="container">
            <div className="text-center">
              <label htmlFor="uname">
                <b>Username</b>
              </label>
              <br />
              <input
                type="text"
                className="form-control mb-2"
                style={{ width: "380px" }}
                placeholder="Enter Username"
                value={email}
                onChange={handleUsernameChange}
                name="uname"
                required
              />
              <br />

              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <br />
              <input
                type="password"
                className="form-control mb-2"
                style={{ width: "380px" }}
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                name="psw"
                required
              />
              {errorMessage && (
                <div className="text-danger">{errorMessage}</div>
              )}
            </div>
            <div style={{ marginLeft: "289px" }}>
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  name="remember"
                />
                &nbsp; Remember me
              </label>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success col-2 mr-2">
                Login
              </button>
              <Link to="/" className="btn btn-danger col-2">
                Back to Home
              </Link>
            </div>
            <div
              className="container"
              style={{ backgroundColor: "#f1f1f1", marginTop: "20px" }}
            >
              <span className="psw">
                Forgot <Link to="/register">password?</Link>
              </span>
            </div>
            <div className="text-center mt-3">
              {/* Login with Google */}
              <a
                href="http://localhost:8085/auth/google"
                className="btn btn-primary mr-2"
              >
                <FaGoogle /> Login with Google
              </a>
              {/* Login with Facebook */}
              <a
                href="http://localhost:8085/auth/facebook"
                className="btn btn-primary"
              >
                <FaFacebook /> Login with Facebook
              </a>
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
