import React, { useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ROUTES from "../../navigations/Routes";
import axios from "axios";
import { FaFacebook, FaGoogle } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  function saveUser() {
    try {
      axios
        .post("http://localhost:8085/register", form)
        .then((response) => {
          const { message } = response.data;

          Swal.fire({
            icon: "success",
            title: "Success",
            text: message,
          });
          navigate(ROUTES.login.name);
        })
        .catch((error) => {
          alert(error);
        });
    } catch (err) {
      console.log(err);
    }
  }
  function onUserSubmit() {
    let errors = false;
    let error = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    if (form.firstname.trim().length == 0) {
      errors = true;
      error = { ...error, firstname: "Firstname is required!" };
    }
    if (form.lastname.trim().length == 0) {
      errors = true;
      error = { ...error, lastname: "Lastname is required!" };
    }
    if (form.email.trim().length == 0) {
      errors = true;
      error = { ...error, email: " Email is Required!" };
    }
    if (form.password.trim().length == 0) {
      errors = true;
      error = { ...error, password: "Password is required!" };
    }
    if (form.confirmPassword.trim().length == 0) {
      errors = true;
      error = { ...error, confirmPassword: "Please enter a Password!" };
    }
    if (form.confirmPassword != form.password) {
      errors = true;
      error = {
        ...error,
        password: "Password and Confirm password must be same!",
      };
    }
    if (!(form.password.length >= 6 && form.password.length <= 16)) {
      errors = true;
      error = { ...error, password: "Password length must be 6 to 16" };
    }
    if (errors) {
      setFormError(error);
    } else {
      setFormError(error);
      saveUser();
    }
  }
  return (
    <div>
      <Header />
      <div className="row m-2 p-2">
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">New User</div>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-sm-4">First Name</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  name="firstname"
                  placeholder="firstName"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.firstname}</p>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4">Last Name</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  name="lastname"
                  placeholder="lastname"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.lastname}</p>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4">Email</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.email}</p>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4">Password</label>
              <div className="col-sm-8">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.password}</p>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4">Confirm Password</label>
              <div className="col-sm-8">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.confirmPassword}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            <button onClick={onUserSubmit} className="btn btn-info">
              Register
            </button>
          </div>
          <div
            className=""
            style={{ position: "absolute", top: "40%", left: "115%" }}
          >
            <a
              href="http://localhost:8085/auth/google"
              className="btn btn-primary mr-2"
              style={{ borderRadius: "30px" }}
            >
              <FaGoogle />
            </a>
            &nbsp;
            <a
              href="http://localhost:8085/auth/google"
              className="btn btn-primary mr-2"
              style={{ borderRadius: "30px" }}
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
