import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";
import Swal from "sweetalert2";
import $ from "jquery";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Department() {
  const queryParam = useQuery();
  const [departmentId, setdepartmentId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const tableref = useRef();
  const [form, setForm] = useState({
    name: "",
    image: null,
    universityId: queryParam.get("id"),
  });

  const [formError, setFormError] = useState({
    name: "",
    image: "",
  });
  const navigate = useNavigate();
  const changehandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole !== "admin") {
      navigate(ROUTES.login.name);
    } else {
      getAll();
    }
  }, []);
  useEffect(() => {
    if (departments.length > 0) {
      $(tableref.current).DataTable();
    }
  }, [departments]);
  console.log(departments);
  function getAll() {
    console.log(queryParam.get("id"));
    axios
      .get(
        "http://localhost:8085/department?universityId=" + queryParam.get("id")
      )
      .then((d) => {
        //  console.log(d.data);
        setDepartments(d.data.depData);
      });
  }
  function resetForm() {
    setForm({ name: "", image: null });
  }
  function renderDepartments() {
    return departments?.map((item) => {
      //  console.log(item);
      return (
        <tr className="text-center">
          <td className="text-center">
            <img
              src={"http://localhost:8085/" + item.image}
              width="100"
              height="100"
              alt={item.name}
              style={{ borderRadius: "50px" }}
            />
          </td>
          <td>{item.name}</td>
          <td>
            <button
              onClick={() => {
                navigate(
                  ROUTES.productAdmin.name +
                    "?id=" +
                    item._id +
                    "&name=" +
                    item.name
                );
              }}
              className="btn btn-primary col-5"
            >
              <FaPlus />
              &nbsp;Add Product
            </button>
          </td>
          <td className="text-center">
            <button
              onClick={() => {
                deleteDepartment(item._id);
              }}
              className="btn btn-danger col-3"
            >
              <FaTrash />
            </button>
          </td>
          <td className="text-center">
            <button
              onClick={() => {
                setdepartmentId(item._id);
                setForm({ ...form, name: item.name });
              }}
              className="btn btn-success col-3"
            >
              <FaEdit />
            </button>
          </td>
        </tr>
      );
    });
  }
  function saveDepartment() {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("uniId", queryParam.get("id"));
      axios
        .post("http://localhost:8085/department", formData, {
          "content-type": "multipart/form-data",
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Data saved successfully",
          });
          getAll();
          resetForm();
        });
    } catch (error) {
      console.log("fail to save department");
    }
  }
  function updateDepartment() {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("id", departmentId);
      formData.append("universityId", queryParam.get("id"));
      axios
        .put("http://localhost:8085/department", formData, {
          "content-type": "multipart/form-data",
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Data updated successfully",
          });
          getAll();
          resetForm();
        });
    } catch (error) {
      console.log("Unable to update data!");
    }
  }
  function deleteDepartment(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:8085/department", { data: { _id: id } })
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            getAll();
          })
          .catch((e) => {
            Swal.fire({
              icon: "error",
              title: "error",
              text: e.response?.data?.message || "An error has occured",
            });
          });
      }
    });
  }
  function onDepartmentSubmit() {
    let errors = false;
    let error = { name: "", image: "" }; //object for error messages
    if (form.name.trim().length === 0) {
      errors = true;
      error = { ...error, name: "Please enter name" };
    }
    if (form.image == null) {
      errors = true;
      error = { ...error, image: "Please enter image" };
    }
    if (errors) setFormError(error);
    else {
      setFormError(error); //set error message  to error message when form is submitted and submitted
      {
        departmentId ? updateDepartment() : saveDepartment();
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="row p-2 m-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">
            <b>{departmentId ? "Edit Department" : "New Department"}</b>
          </div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-lg-4">University Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  disabled
                  value={queryParam.get("name")}
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-lg-4">Department Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="department name"
                  value={form.name}
                  onChange={changehandler}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-lg-4">Department Image</label>
              <div className="col-lg-8">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    setForm({ ...form, image: file });
                  }}
                />
                <p className="text-danger">{formError.image}</p>
              </div>
            </div>
          </div>
          <div className="form-group row"></div>
          <div className="card-footer text-muted">
            {departmentId ? (
              <button
                onClick={() => {
                  onDepartmentSubmit();
                }}
                className="btn btn-info"
              >
                Update
              </button>
            ) : (
              <button
                onClick={() => {
                  onDepartmentSubmit();
                }}
                className="btn btn-info"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      {/* display data */}
      <div className="border p-2 m-2">
        <table
          className="table table-bordered table-striped table-hover"
          ref={tableref}
        >
          <thead>
            <tr className="text-center">
              <th className="text-center">Image</th>
              <th className="text-center">Name</th>
              <th className="text-center">Add Product</th>
              <th className="text-center">Delete</th>
              <th className="text-center">Edit</th>
            </tr>
          </thead>
          <tbody>{renderDepartments()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Department;
