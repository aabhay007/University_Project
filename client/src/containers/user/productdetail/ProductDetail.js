import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header";
import ROUTES from "../../../navigations/Routes";
//import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function ProductDetail() {
  const queryParam = useQuery();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState(null);
  const [userId, setUserId] = useState("");
  
  useEffect(() => {
    const userIdinLocal = localStorage.getItem("id");
    if (userIdinLocal) {
      setUserId(userIdinLocal);
    } else {
      console.log("User Id not found");
    }
    getAll();
  }, []);
  function getAll() {
    axios
      .get("http://localhost:8085/productdetail?id=" + queryParam.get("id"))
      .then((response) => {
        // console.log(response.data);
        setProductDetails(response.data.proDetails);
      });
  }
  function addTocart() {
    try {
      if (!userId) {
        console.log("Login First!");
        navigate(ROUTES.login.name);
      } else {
        axios
          .post("http://localhost:8085/cart", {
            user: userId,
            product: productDetails._id,
            count: 1,
          })
          .then(() => {
            toast("Item Added To Cart");
          });
        console.log(productDetails._id);
      }
    } catch (e) {
      console.log(e);
    }
  }
  function renderProductDetail() {
    if (!productDetails) {
      return (
        <h2 className="text-center text-danger">
          No product details available.
        </h2>
      );
    }

    const item = productDetails; // Assuming productDetails is a single item, not an array
    //console.log(item);
    return (
      <div className="container backgroundWhite">
        <div className="card">
          <div className="card-header bg-light text-black ml-0 row container">
            <div className="row pl-2">
              <h3 className="text-primary pb-2">
                <b>Department Name:</b> {item.departmentId.name}
              </h3>
            </div>
          </div>
          <div className="card-body">
            <div className="container rounded p-2">
              <div className="row">
                <div className="col-8 col-lg-8">
                  <div className="row pl-2">
                    <h3 className="text-black pb-2">
                      <b>Product Name:</b> {item.name}
                    </h3>
                  </div>
                  <br />
                  <br />
                  <br />

                  <div className="row pl-2">
                    <h3 className="text-black pb-2">
                      <b>Product Price:</b> $ {item.price}
                    </h3>
                  </div>
                  <br />
                  <br />
                  <br />

                  <div className="row pl-2">
                    <h3 className="text-black">
                      <b>Description: </b> {item.description}
                    </h3>
                  </div>
                  <br />
                </div>
                <div className="col-12 col-lg-3 offset-lg-1 text-center">
                  <div className="image-container">
                    <img
                      src={"http://localhost:8085/" + item.images[0]}
                      className="rounded"
                      // alt={item.description}
                      width="250"
                      height="300"
                    />
                    <div className="arrow-buttons">

                    </div>
                    {/* <div className="arrow-buttons">
                      <button
                      // onClick={handlePrevImage}
                      // disabled={currentImageIndex === 0}
                      >
                        {"<"}
                      </button>
                      &nbsp; &nbsp;
                      <button
                      // onClick={handleNextImage}
                      // disabled={currentImageIndex === item.images.length - 1}
                      >
                        {">"}
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div class="col-12 col-md-6 pb-1">
                <button class="btn btn-success form-control  btn-square btn-lg"
                onClick={(()=>{navigate(ROUTES.home.name)})}>
                  Back to home
                </button>
              </div>
              <div className="col-12 col-md-6 pb-1">
                <button
                  onClick={() => {
                    addTocart();
                  }}
                  type="submit"
                  value="Add to Cart"
                  className="btn btn-primary btn-square btn-lg form-control"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <ToastContainer/>
      <h2 className="text-center mt-2">Product details</h2>
      <div className="row">{renderProductDetail()}</div>
    </div>
  );
}

export default ProductDetail;
