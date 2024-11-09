import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
import axios from "axios";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import Header from "../../../components/Header";
import Swal from "sweetalert2";
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Cart() {
  const navigate = useNavigate();
  const [cartItems, setcartItems] = useState([]);
  const [userId, setUserId] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    const userinlocal = localStorage.getItem("id");
    if (userinlocal) {
      setUserId(userinlocal);
      getAll(userinlocal);
    } else {
      navigate(ROUTES.login.name);
    }
  }, []);
  function removeCartItems(id) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((check) => {
        if (check.isConfirmed) {
          axios
            .delete("http://localhost:8085/cart", { data: { id: id } })
            .then(() => {
              window.location.reload();
            });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  function getAll(userId) {
    //console.log(userId);
    try {
      axios
        .get(`http://localhost:8085/cart?userId=${userId}`)
        .then((response) => {
          // console.log(response.data.cartItems);
          setcartItems(response.data.cartItems);
        });
    } catch (e) {
      console.log(e);
    }
  }
  function toggleSelectItem(itemId) {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId);
      } else {
        return [...prevSelected, itemId];
      }
    });
  }

  function renderCartItems() {
    let grandTotal = 0;

    return (
      <div className="backgroundWhiteBorder">
        <div className="container">
          <div className="card">
            <div className="card-header bg-dark text-light ml-0 row container">
              <div className="col-6">
                {/* <FontAwesomeIcon icon={faShoppingCart} /> &nbsp; Shopping Cart */}
                Shopping Cart <FaShoppingCart />
              </div>
              <div className="col-6 text-right">
                <a href="/" className="btn btn-outline-info btn-sm">
                  Continue Shopping
                </a>
              </div>
            </div>
            <div className="card-body">
              {cartItems.map((item, index) => {
                // Calculate the total for each item
                const itemTotal = item.product.price * item.count;
                // Add the item total to the grand total
                grandTotal += itemTotal;
                return (
                  <div className="row" key={index}>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => toggleSelectItem(item._id)}
                    />
                    <div className="d-none d-lg-block col-lg-1 text-center py-2">
                      <img
                        src={"http://localhost:8085/" + item.product.images[0]}
                        className="rounded"
                        width="70"
                        height="70"
                        alt="card-image cap"
                      />
                    </div>
                    <div className="col-10 text-sm-center col-lg-6 text-lg-left">
                      <h5>
                        <strong>{item.product.name}</strong>
                      </h5>
                      <p>
                        <small>{item.product.description}</small>
                      </p>
                    </div>
                    <div className="col-12 text-sm-center col-lg-5 text-lg-right row">
                      <div className="col-8 text-md-right">
                        <h6>
                          <strong>
                            {item.product.price} x {item.count} = {itemTotal}
                          </strong>
                        </h6>
                        <button
                          className="btn btn-outline-danger col-3"
                          onClick={() => {
                            removeCartItems(item._id);
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="row">
                <div className="col-12 col-md-6 offset-md-6 col-lg-4 offset-lg-8 pr-4">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between bg-light">
                      <span className="text-info"> Grand Total (USD)</span>
                      <strong className="text-info">$ {grandTotal}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="card-footer row">
                <div className="col-sm-12 col-lg-4 col-md-6 offset-lg-8 offset-md-6 ">
                  <button
                    onClick={() =>
                      navigate(`/Summary?items=${selectedItems.join(",")}`)
                    }
                  >
                    Summary
                  </button>
                </div>
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
      <div>{renderCartItems()}</div>
    </div>
  );
}

export default Cart;
