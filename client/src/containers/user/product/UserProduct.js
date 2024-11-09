import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import ROUTES from "../../../navigations/Routes";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function UserProduct() {
  const queryParam = useQuery();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAll();
  }, []);
  function getAll() {
    axios
      .get("http://localhost:8085/product?departmentId=" + queryParam.get("id"))
      .then((d) => {
        setProducts(d.data.prodaata);
      });
  }
  function renderProducts() {
    return products?.map((item) => {
      return (
        <div className="col-4 p-2">
          <div className="card">
            <img
              src={"http://localhost:8085/" + item.images[0]}
              height="225"
              width="362"
            />
            <div className="card-body text-center">
              <h5 className="card-title">{item.name}</h5>
              <h5 className="card-title">{item.description}</h5>
              <h5 className="card-title">{item.price}</h5>
              <button
                className="btn btn-info"
                onClick={() => {
                  navigate(ROUTES.productdetail.name + "?id=" + item._id);
                }}
              >
                Details
              </button>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div
    // style={{
    //   background: "linear-gradient(to right, #3498db, #8e44ad)",
    //   padding: "20px",
    //   borderRadius: "10px",
    // }}
    >
      <Header />
      <div className="container mt-4">
        <h2>Explore Product</h2>
        <div className="row">{renderProducts()}</div>
      </div>
    </div>
  );
}

export default UserProduct;
