import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import ROUTES from "../../../navigations/Routes";
import Swal from "sweetalert2";
import "primeicons/primeicons.css";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Product() {
  const queryParam = useQuery();
  const [productId, setproductId] = useState(null);
  const [product, setProducts] = useState([]);
  const tableref = useRef();
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    images: null,
    departmentId: queryParam.get("id"),
    description: "",
    qty: 10,
    price: 0,
  });
  const [formError, setFormError] = useState({
    name: "",
    images: null,
    description: "",
    qty: "",
    price: "",
  });
  const changeHandler = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
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
    if (product.length > 0) {
      $(tableref.current).DataTable();
    }
  }, []);
  function getAll() {
    axios
      .get("http://localhost:8085/product?departmentId=" + queryParam.get("id"))
      .then((d) => {
        setProducts(d.data.prodaata);
      });
  }
  function resetForm() {
    setform({
      ...form,
      name: "",
      images: null,
      description: "",
      qty: 10,
      price: 0,
      departmentId: queryParam.get("id"),
    });
  }
  function saveProduct() {
    try {
      const formData = new FormData();
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("qty", form.qty);
      formData.append("price", form.price);
      formData.append("departmentId", form.departmentId);
      axios
        .post("http://localhost:8085/product", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert(d.data.message);
          getAll();
          resetForm();
        })
        .catch((e) => {
          console.log("Faiiiillleedddd");
        });
    } catch (error) {
      console.log("Fail to Save Product!");
      console.log(error);
    }
  }

  function updateProduct() {
    try {
      const formData = new FormData();
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("qty", form.qty);
      formData.append("price", form.price);
      formData.append("id", productId);
      formData.append("departmentId", form.departmentId);
      axios
        .put("http://localhost:8085/product", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert(d.data.message);
          getAll();
          resetForm();
        })
        .catch((e) => {
          console.log("Faaiilleedd");
        });
    } catch (error) {
      console.log("Error in line 105");
    }
  }
  function onProductSubmit() {
    let errors = false;
    let error = {
      name: "",
      images: null,
      description: "",
      qty: "",
      price: "",
    };

    if (form.name.trim().length == 0) {
      errors = true;
      error = { ...error, name: "Please enter name" };
    }
    if (form.description.trim().length == 0) {
      errors = true;
      error = { ...error, description: "Please enter description" };
    }
    if (form.qty == "" || form.qty == 0) {
      errors = true;
      error = { ...error, qty: "Please enter quantity" };
    }
    if (form.price == "" || form.price == 0) {
      errors = true;
      error = { ...error, price: "Please enter price" };
    }
    if (form.images == null) {
      errors = true;
      error = { ...error, images: "Please select images" };
    }
    if (errors) {
      setFormError(error);
    } else {
      setFormError(error);
      {
        productId ? updateProduct() : saveProduct();
      }
    }
  }
  function renderProduct() {
    return product?.map((item) => {
      // console.log(item.name);
      return (
        <tr>
          <td className="text-center">
            <img
              style={{ borderRadius: "50px" }}
              src={"http://localhost:8085/" + item.images[0]}
              height={100}
              width={100}
            />
          </td>
          <td className="text-center">{item.name}</td>
          <td className="text-center">{item.description}</td>
          <td className="text-center">{item.price}</td>
          <td className="text-center">{item.qty}</td>
          <td className="text-center">
            <button
              onClick={() => {
                deleteProduct(item._id);
              }}
              className="btn btn-danger col-4"
            >
              {/* <FaTrash /> */}
              <i className="pi pi-trash"></i>
            </button>
          </td>
          <td className="text-center">
            <button
              onClick={() => {
                setproductId(item._id);
                setform({
                  ...form,
                  name: item.name,
                  description: item.description,
                  qty: item.qty,
                  price: item.price,
                  images: item.images,
                });
              }}
              className="btn btn-info col-4"
            >
              {/* <FaEdit /> */}
              <i className="pi pi-file-edit"></i>
            </button>
          </td>
        </tr>
      );
    });
  }
  function deleteProduct(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete Product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:8085/product", { data: { id: id } })
          .then((d) => {
            alert(d.data.message);
            getAll();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  }
  return (
    <div>
      <Header />
      <div className="row m-2 p-2">
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            <b>{productId ? "Edit Product" : "Create Product"}</b>
          </div>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-lg-4">Department Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={queryParam.get("name")}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Product Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  value={form.name}
                  onChange={changeHandler}
                  className="form-control"
                  name="name"
                  required
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Description</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  value={form.description}
                  onChange={changeHandler}
                  className="form-control"
                  name="description"
                />
                <p className="text-danger">{formError.description}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Quantity</label>
              <div className="col-lg-8">
                <input
                  type="number"
                  value={form.qty}
                  onChange={changeHandler}
                  className="form-control"
                  name="qty"
                  min={1}
                />
                <p className="text-danger">{formError.qty}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Price</label>
              <div className="col-lg-8">
                <input
                  type="number"
                  value={form.price}
                  onChange={changeHandler}
                  className="form-control"
                  name="price"
                  min={0}
                />
                <p className="text-danger">{formError.price}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Images</label>
              <div className="col-lg-8">
                <input
                  type="file"
                  onChange={(e) => {
                    //console.log(e.target.files);
                    let files = e.target.files;
                    setform({ ...form, images: files });
                  }}
                  multiple
                  className="form-control"
                  name="images"
                />
                <p className="text-danger">{formError.images}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            {productId ? (
              <button
                onClick={() => {
                  onProductSubmit();
                }}
                className="btn btn-info"
              >
                Update
              </button>
            ) : (
              <button
                onClick={() => {
                  onProductSubmit();
                }}
                className="btn btn-info"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="border p-2 m-2">
        <table
          ref={tableref}
          className="table table-bordered table-striped table-hover table-active"
        >
          <thead>
            <tr>
              <th className="text-center">Image</th>
              <th className="text-center">Name</th>
              <th className="text-center">Description</th>
              <th className="text-center">Qty</th>
              <th className="text-center">Price</th>
              <th className="text-center">Delete</th>
              <th className="text-center">Edit</th>
            </tr>
          </thead>
          <tbody>{renderProduct()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
