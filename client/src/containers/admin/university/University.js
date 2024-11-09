// Import necessary modules/components
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";
import Swal from "sweetalert2";
import $ from "jquery";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

function University() {
  // State variables
  const [form, setForm] = useState({ name: "", image: null });
  const [universityId, setUniversityId] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [formError, setFormError] = useState({ name: "", image: "" });
  const navigate = useNavigate();
  const tableref = useRef();

  useEffect(() => {
    // Fetch data
    const userRole = localStorage.getItem("role");
    if (userRole !== "admin") {
      navigate(ROUTES.login.name);
    } else {
      getAll();
    }
  }, []);
  useEffect(() => {
    if (universities.length > 0) {
      $(tableref.current).DataTable();
    }
  }, [universities]);

  // Function to fetch all universities
  function getAll() {
    axios
      .get("http://localhost:8085/university")
      .then((response) => {
        setUniversities(response.data.univData);
        console.log(universities);
      })
      .catch((error) => {
        console.error("Error fetching universities:", error);
      });
  }

  // Handle input change
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to render university
  function renderUniversity() {
    return universities.map((item) => (
      <tr key={item._id}>
        <td className="text-center">
          <img
            src={"http://localhost:8085/" + item.image}
            width="100"
            height="100"
            alt={item.name}
            style={{ borderRadius: "50px" }}
          />
        </td>
        <td className="text-center">{item.name}</td>
        <td className="text-center">
          <button
            className="btn btn-primary col-5"
            onClick={() =>
              navigate(
                `${ROUTES.departmentAdmin.name}?id=${item._id}&name=${item.name}`
              )
            }
          >
            <FaPlus /> Department
          </button>
        </td>
        <td className="text-center">
          <button
            className="btn btn-danger col-3"
            onClick={() => deleteUniversity(item._id)}
          >
            <FaTrash />
          </button>
        </td>
        <td className="text-center">
          <button
            className="btn btn-info col-3"
            onClick={() => {
              setForm({ ...form, name: item.name, image: item.image });
              setUniversityId(item._id);
            }}
          >
            <FaEdit />
          </button>
        </td>
      </tr>
    ));
  }
  function resetForm() {
    setForm({ name: "", image: null });
  }

  // Function to save university
  function saveUniversity() {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      axios
        .post("http://localhost:8085/university", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "University saved successfully!",
          });
          getAll();
          resetForm();
        });
    } catch (error) {
      console.log("Fail to Save University");
    }
  }

  // Function to update university
  function updateUniversity() {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("_id", universityId);

      axios
        .put("http://localhost:8085/university", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "University updated successfully!",
          });

          getAll();
          resetForm();
        })
        .catch((error) => {
          console.error("Failed to update university:", error);
        });
    } catch (error) {
      console.error("Failed to update university:", error);
    }
  }
  // Function to delete university
  function deleteUniversity(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete University!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:8085/university", { data: { _id: id } })
          .then((d) => {
            getAll();
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "University deleted successfully!",
            });
          })
          .catch((e) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "An error occurred",
            });
          });
      }
    });
  }

  // Function to handle form submission
  function onUniversitySubmit() {
    let errors = false;
    let error = { name: "", image: "" };
    if (form.name.trim().length === 0) {
      errors = true;
      error = { ...error, name: "Please enter name" };
    }
    if (form.image == null) {
      errors = true;
      error = { ...error, image: "Please enter image" };
    }
    if (errors) {
      setFormError(error);
    } else {
      setFormError(error);
      {
        universityId ? updateUniversity() : saveUniversity();
      }
    }
  }

  return (
    <div className="">
      <Header />
      <div className="row p-2 m-2">
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            {universityId ? " Edit University" : "New University"}
          </div>

          <div className="card-body">
            <div className="form-group row">
              <label htmlFor="txtname" className="col-lg-4">
                University Name
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  onChange={changeHandler}
                  value={form.name}
                  className="form-control"
                  id="txtname"
                  name="name"
                  placeholder="Name of the University"
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-lg-4">University Image</label>
              <div className="col-lg-8">
                <input
                  type="file"
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.files[0] })
                  }
                  className="form-control"
                />
                <p className="text-danger">{formError.image}</p>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="footer" style={{ marginLeft: "82%" }}>
              <button onClick={onUniversitySubmit} className="btn btn-success">
                {universityId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border p-2 m-2">
        <table
          ref={tableref}
          className="table table-striped table-hover table-bordered"
        >
          <thead className="text-center">
            <tr>
              <th className="text-center">Image</th>
              <th className="text-center">Name</th>
              <th className="text-center">Add Department</th>
              <th className="text-center">Delete</th>
              <th className="text-center">Edit</th>
            </tr>
          </thead>
          <tbody>{renderUniversity()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default University;
