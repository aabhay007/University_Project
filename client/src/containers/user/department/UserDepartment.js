import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function UserDepartment() {
  const queryParam = useQuery();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    getAll();
  }, []);
  function getAll() {
    axios
      .get(
        "http://localhost:8085/department?universityId=" + queryParam.get("id")
      )
      .then((d) => {
        setDepartments(d.data.depData);
       // console.log(d.data);
      });
  }
  function renderDepartments() {
    return departments?.map((item) => {
      return (
        <div className="col-4 p-2">
          
          <div class="card">
            <img
              class="card-img-top"
              src={"http://localhost:8085/" + item.image}
              height="300"
              width="150"
              alt="Card image cap"
            />
            <div class="card-body">
              <h3 class="card-title">{item.name}</h3>
              <button
                onClick={() => {
                  navigate(ROUTES.product.name + "?id=" + item._id);
                }}
                className="btn btn-primary"
              >
                View Product
              </button>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h2 className="mb-4 text-center text-uppercase font-weight-bold text-white">
          Explore Departments
        </h2>
        <div className="row">{renderDepartments()}</div>
      </div>
    </div>
  );
}

export default UserDepartment;
